import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
const serverError = (err: unknown, label: string) => {
  console.error(label, err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await prisma.timelineItem.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (err) {
    return serverError(err, 'GET /api/timeline/[id] error:')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    const body = await request.json()
    const item = await prisma.timelineItem.update({
      where: { id },
      data: {
        order: body.order,
        year: body.year,
        titleVi: body.titleVi,
        titleEn: body.titleEn,
        descVi: body.descVi,
        descEn: body.descEn,
      },
    })
    return NextResponse.json(item)
  } catch (err) {
    return serverError(err, 'PUT /api/timeline/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.timelineItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, 'DELETE /api/timeline/[id] error:')
  }
}
