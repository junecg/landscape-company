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
    const project = await prisma.project.findUnique({ where: { id } })
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    return NextResponse.json(project)
  } catch (err) {
    return serverError(err, 'GET /api/projects/[id] error:')
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
    const project = await prisma.project.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        titleEn: body.titleEn,
        category: body.category,
        location: body.location,
        area: body.area,
        duration: body.duration,
        client: body.client,
        year: body.year,
        image: body.image,
        images: body.images,
        description: body.description,
        descriptionEn: body.descriptionEn,
        published: body.published,
      },
    })
    return NextResponse.json(project)
  } catch (err) {
    return serverError(err, 'PUT /api/projects/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, 'DELETE /api/projects/[id] error:')
  }
}
