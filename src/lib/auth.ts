import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { timingSafeEqual, scryptSync } from 'crypto'

if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET env variable is required')
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET)
const COOKIE_NAME = 'admin_session'

export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false

  try {
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/** So sánh hằng thời gian (constant-time) để tránh timing attack. */
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

/**
 * Xác thực thông tin đăng nhập admin.
 * - Email: so sánh hằng thời gian với ADMIN_EMAIL.
 * - Mật khẩu: ưu tiên ADMIN_PASSWORD_HASH (định dạng `scrypt$<saltHex>$<keyHex>`).
 *   Nếu không có hash thì fallback so sánh hằng thời gian với ADMIN_PASSWORD (tương thích ngược).
 */
export function validateCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL ?? ''
  const hash = process.env.ADMIN_PASSWORD_HASH
  const plainPassword = process.env.ADMIN_PASSWORD ?? ''

  // Không cấu hình credentials → từ chối, tránh đăng nhập bằng chuỗi rỗng.
  if (!expectedEmail || (!hash && !plainPassword)) return false

  const emailOk = safeEqual(email, expectedEmail)

  let passOk = false
  if (hash) {
    const [scheme, saltHex, keyHex] = hash.split('$')
    if (scheme === 'scrypt' && saltHex && keyHex) {
      try {
        const salt = Buffer.from(saltHex, 'hex')
        const expected = Buffer.from(keyHex, 'hex')
        const derived = scryptSync(password, salt, expected.length)
        passOk = derived.length === expected.length && timingSafeEqual(derived, expected)
      } catch {
        passOk = false
      }
    }
  } else {
    passOk = safeEqual(password, plainPassword)
  }

  return emailOk && passOk
}
