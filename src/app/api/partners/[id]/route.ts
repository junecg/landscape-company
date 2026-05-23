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
    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(partner)
  } catch (err) {
    return serverError(err, 'GET /api/partners/[id] error:')
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
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        order: body.order,
        name: body.name,
        sectorVi: body.sectorVi,
        sectorEn: body.sectorEn,
        descVi: body.descVi,
        descEn: body.descEn,
        founded: body.founded,
        hq: body.hq,
        statLabelVi: body.statLabelVi,
        statLabelEn: body.statLabelEn,
        statValue: body.statValue,
        projectsVi: body.projectsVi,
        projectsEn: body.projectsEn,
        highlightVi: body.highlightVi,
        highlightEn: body.highlightEn,
        images: body.images ?? [],
        published: body.published,
      },
    })
    return NextResponse.json(partner)
  } catch (err) {
    return serverError(err, 'PUT /api/partners/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.partner.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, 'DELETE /api/partners/[id] error:')
  }
}
