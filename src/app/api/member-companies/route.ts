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
    const companies = await prisma.memberCompany.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(companies)
  } catch (err) {
    return serverError(err, 'GET /api/member-companies error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const company = await prisma.memberCompany.create({
      data: {
        order: body.order ?? 0,
        abbr: body.abbr,
        name: body.name,
        tagline: body.tagline ?? '',
        descVi: body.descVi ?? '',
        descEn: body.descEn ?? '',
        accent: body.accent ?? '#328442',
        images: body.images ?? [],
        published: body.published ?? true,
      },
    })
    return NextResponse.json(company, { status: 201 })
  } catch (err) {
    return serverError(err, 'POST /api/member-companies error:')
  }
}
