/**
 * Sinh ADMIN_PASSWORD_HASH (scrypt) để lưu trong .env thay cho mật khẩu plaintext.
 *
 * Cách dùng:
 *   npx tsx scripts/hash-password.ts "matkhau-cua-ban"
 *
 * Sau đó copy dòng in ra vào .env và XÓA biến ADMIN_PASSWORD cũ.
 */
import { randomBytes, scryptSync } from 'crypto'

const password = process.argv[2]
if (!password) {
  console.error('Thiếu mật khẩu.\nVí dụ: npx tsx scripts/hash-password.ts "MatKhauManh123"')
  process.exit(1)
}

const salt = randomBytes(16)
const key = scryptSync(password, salt, 32)
const hash = `scrypt$${salt.toString('hex')}$${key.toString('hex')}`

console.log('\nThêm dòng sau vào .env (và xóa ADMIN_PASSWORD):\n')
console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`)
