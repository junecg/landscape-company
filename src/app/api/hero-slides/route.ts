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
    const slides = await prisma.heroSlide.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(slides)
  } catch (err) {
    return serverError(err, 'GET /api/hero-slides error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const slide = await prisma.heroSlide.create({
      data: {
        order: body.order ?? 0,
        image: body.image,
        labelVi: body.labelVi,
        labelEn: body.labelEn,
        published: body.published ?? true,
      },
    })
    return NextResponse.json(slide, { status: 201 })
  } catch (err) {
    return serverError(err, 'POST /api/hero-slides error:')
  }
}
