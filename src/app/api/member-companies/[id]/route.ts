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
    const company = await prisma.memberCompany.findUnique({ where: { id } })
    if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(company)
  } catch (err) {
    return serverError(err, 'GET /api/member-companies/[id] error:')
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
    const company = await prisma.memberCompany.update({
      where: { id },
      data: {
        order: body.order,
        abbr: body.abbr,
        name: body.name,
        tagline: body.tagline,
        descVi: body.descVi,
        descEn: body.descEn,
        accent: body.accent,
        images: body.images ?? [],
        published: body.published,
      },
    })
    return NextResponse.json(company)
  } catch (err) {
    return serverError(err, 'PUT /api/member-companies/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.memberCompany.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, 'DELETE /api/member-companies/[id] error:')
  }
}
