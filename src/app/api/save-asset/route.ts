import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { verifySession } from '@/lib/auth';

const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  // Admin-only: ghi file vào public/ là thao tác nhạy cảm
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Chặn path traversal: chỉ lấy phần tên file, không cho đường dẫn
    const safeName = basename(String(body.name ?? '')).replace(/[^a-zA-Z0-9._-]/g, '');
    if (!safeName || safeName.startsWith('.')) {
      return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
    }
    if (!ALLOWED_EXT.has(extname(safeName).toLowerCase())) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    let buffer: Buffer;

    if (body.url) {
      // Chỉ cho phép tải ảnh qua http(s) (giảm rủi ro SSRF tới scheme nội bộ như file://)
      let parsed: URL;
      try {
        parsed = new URL(String(body.url));
      } catch {
        return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
      }
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return NextResponse.json({ error: 'Only http(s) urls allowed' }, { status: 400 });
      }
      const res = await fetch(parsed.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          Accept: 'image/png,image/*,*/*',
        },
      });
      if (!res.ok) {
        return NextResponse.json({ error: `Fetch failed (${res.status})` }, { status: 400 });
      }
      const ab = await res.arrayBuffer();
      buffer = Buffer.from(ab);
    } else if (body.data) {
      const base64 = (body.data as string).replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64, 'base64');
    } else {
      return NextResponse.json({ error: 'no data' }, { status: 400 });
    }

    if (buffer.length === 0 || buffer.length > MAX_BYTES) {
      return NextResponse.json({ error: 'File empty or too large' }, { status: 400 });
    }

    const dir = join(process.cwd(), 'public/images/shapes');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, safeName), buffer);

    return NextResponse.json({ ok: true, path: `/images/shapes/${safeName}`, size: buffer.length });
  } catch (err) {
    console.error('POST /api/save-asset error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
