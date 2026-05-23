import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
const serverError = (err: unknown, label: string) => {
  console.error(label, err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const category = searchParams.get('category')
    const where: Record<string, unknown> = {}
    if (category) where.categoryEn = category

    const articles = await prisma.newsArticle.findMany({
      where,
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(articles)
  } catch (err) {
    return serverError(err, 'GET /api/news error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const article = await prisma.newsArticle.create({
      data: {
        slug: body.slug,
        titleVi: body.titleVi,
        titleEn: body.titleEn,
        summaryVi: body.summaryVi ?? '',
        summaryEn: body.summaryEn ?? '',
        contentVi: body.contentVi ?? '',
        contentEn: body.contentEn ?? '',
        image: body.image ?? '',
        categoryVi: body.categoryVi ?? '',
        categoryEn: body.categoryEn ?? '',
        date: body.date ?? new Date().toISOString().slice(0, 10),
        readTime: body.readTime ?? 4,
        published: body.published ?? true,
      },
    })
    return NextResponse.json(article, { status: 201 })
  } catch (err) {
    return serverError(err, 'POST /api/news error:')
  }
}
