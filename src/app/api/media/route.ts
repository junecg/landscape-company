import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET() {
  const items = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  const body = await request.json()

  const item = await prisma.media.create({
    data: {
      url: body.url,
      filename: body.filename ?? '',
      folder: body.folder ?? 'gallery',
    },
  })
  return NextResponse.json(item, { status: 201 })
}
