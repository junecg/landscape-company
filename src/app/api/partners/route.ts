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
    const partners = await prisma.partner.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(partners)
  } catch (err) {
    return serverError(err, 'GET /api/partners error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const partner = await prisma.partner.create({
      data: {
        order: body.order ?? 0,
        name: body.name,
        sectorVi: body.sectorVi ?? '',
        sectorEn: body.sectorEn ?? '',
        descVi: body.descVi ?? '',
        descEn: body.descEn ?? '',
        founded: body.founded ?? 2000,
        hq: body.hq ?? '',
        statLabelVi: body.statLabelVi ?? '',
        statLabelEn: body.statLabelEn ?? '',
        statValue: body.statValue ?? '',
        projectsVi: body.projectsVi ?? [],
        projectsEn: body.projectsEn ?? [],
        highlightVi: body.highlightVi ?? '',
        highlightEn: body.highlightEn ?? '',
        logo: body.logo ?? '',
        images: body.images ?? [],
        published: body.published ?? true,
      },
    })
    return NextResponse.json(partner, { status: 201 })
  } catch (err) {
    return serverError(err, 'POST /api/partners error:')
  }
}
