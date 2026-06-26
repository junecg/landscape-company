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
    const slide = await prisma.heroSlide.findUnique({ where: { id } })
    if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(slide)
  } catch (err) {
    return serverError(err, 'GET /api/hero-slides/[id] error:')
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
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        order: body.order,
        image: body.image,
        labelVi: body.labelVi,
        labelEn: body.labelEn,
        published: body.published,
      },
    })
    return NextResponse.json(slide)
  } catch (err) {
    return serverError(err, 'PUT /api/hero-slides/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.heroSlide.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, 'DELETE /api/hero-slides/[id] error:')
  }
}
