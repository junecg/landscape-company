/**
 * Thay ảnh Unsplash trong DB bằng ảnh thật (Cloudinary) từ src/lib/data.ts
 * Match theo slug. Chỉ update các project có ảnh đang là unsplash hoặc khác data.ts.
 *
 * Chạy local:   npx tsx prisma/fix-project-images.ts
 * Chạy Railway: DATABASE_URL="<railway-url>" npx tsx prisma/fix-project-images.ts
 */
import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { projects as dataProjects } from '../src/lib/data'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const dbProjects = await prisma.project.findMany({
    select: { id: true, slug: true, image: true },
  })

  let updated = 0
  let skipped = 0
  const notFound: string[] = []

  for (const db of dbProjects) {
    const src = dataProjects.find((p) => p.slug === db.slug)
    if (!src) {
      notFound.push(db.slug)
      continue
    }
    if (db.image === src.image) {
      skipped++
      continue
    }
    await prisma.project.update({
      where: { id: db.id },
      data: { image: src.image, images: src.images },
    })
    console.log(`✅ ${db.slug}`)
    updated++
  }

  console.log(`\nĐã update: ${updated} · Bỏ qua (đã đúng): ${skipped}`)
  if (notFound.length) {
    console.log(`⚠️ Không tìm thấy trong data.ts (giữ nguyên): ${notFound.join(', ')}`)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
