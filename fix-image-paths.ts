import 'dotenv/config'
import { PrismaClient } from './src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

// Fallback Cloudinary images to replace broken local paths
const FALLBACK_IMAGES = [
  'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671218/wymbkpzgdmlov1gnysd3.jpg',
  'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671220/krdjhrj99xfciaznt6kx.jpg',
  'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671222/pxdn0m1hrnqmlvkc7fw8.jpg',
  'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
]

function isLocalPath(url: string) {
  return !url.startsWith('http') || url.includes('/images/hero/')
}

function getFallback(index = 0) {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
}

async function main() {
  const projects = await prisma.project.findMany({
    select: { id: true, slug: true, image: true, images: true },
  })

  let fixed = 0
  for (const p of projects) {
    const fixes: { image?: string; images?: string[] } = {}

    if (p.image && isLocalPath(p.image)) {
      fixes.image = getFallback(0)
      console.log(`[${p.slug}] image: ${p.image} → ${fixes.image}`)
    }

    if (p.images?.some(isLocalPath)) {
      fixes.images = p.images.map((img, i) =>
        isLocalPath(img) ? getFallback(i) : img
      )
      console.log(`[${p.slug}] images[] fixed`)
    }

    if (Object.keys(fixes).length > 0) {
      await prisma.project.update({ where: { id: p.id }, data: fixes })
      fixed++
    }
  }

  console.log(`\nDone. Fixed ${fixed} project(s).`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
