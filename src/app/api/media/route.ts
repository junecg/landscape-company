import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
const serverError = (err: unknown, label: string) => {
  console.error(label, err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export async function GET() {
  try {
    const items = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (err) {
    return serverError(err, 'GET /api/media error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const item = await prisma.media.create({
      data: {
        url: body.url,
        filename: body.filename ?? '',
        folder: body.folder ?? 'gallery',
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return serverError(err, 'POST /api/media error:')
  }
}
