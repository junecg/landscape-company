import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

export async function GET() {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(slides)
  } catch (err) {
    console.error('GET /api/hero-slides/admin error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
