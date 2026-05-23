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
    const items = await prisma.timelineItem.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (err) {
    return serverError(err, 'GET /api/timeline error:')
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body: { id: string; order: number }[] = await request.json()
    await Promise.all(
      body.map(({ id, order }) => prisma.timelineItem.update({ where: { id }, data: { order } }))
    )
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, 'PATCH /api/timeline error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const item = await prisma.timelineItem.create({
      data: {
        order: body.order ?? 0,
        year: body.year,
        titleVi: body.titleVi,
        titleEn: body.titleEn,
        descVi: body.descVi ?? '',
        descEn: body.descEn ?? '',
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return serverError(err, 'POST /api/timeline error:')
  }
}
