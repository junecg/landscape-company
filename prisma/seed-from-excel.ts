/**
 * Seed projects from Excel template
 * Usage: npx tsx prisma/seed-from-excel.ts [path-to-excel] [--prune]
 *   --prune: xoá các dự án trong DB không có trong file Excel (dọn data demo cũ)
 * Default file: template-du-an.xlsx (in project root)
 */
import 'dotenv/config'
import * as XLSX from 'xlsx'
import * as path from 'path'
import * as fs from 'fs'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { projects as dataProjects } from '../src/lib/data'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

// Map các giá trị danh mục tự do trong Excel → danh mục hợp lệ
const CATEGORY_ALIASES: Record<string, string> = {
  'resort - landscape': 'Resort',
  'resort landscape': 'Resort',
  'landscape': 'Construction',
}

// Pool ảnh thật (Cloudinary) theo danh mục — lấy từ data.ts, dùng làm fallback khi Excel chưa có ảnh
const IMAGE_POOLS: Record<string, string[]> = {}
for (const p of dataProjects) {
  const pool = (IMAGE_POOLS[p.category] ??= [])
  for (const img of [p.image, ...(p.images || [])]) {
    if (img && !pool.includes(img)) pool.push(img)
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function main() {
  const fileArg = process.argv.slice(2).find(a => !a.startsWith('--'))
  const filePath = fileArg
    ? path.resolve(fileArg)
    : path.resolve(__dirname, '../template-du-an.xlsx')

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File không tồn tại: ${filePath}`)
    process.exit(1)
  }

  console.log(`📂 Đọc file: ${filePath}`)

  const wb = XLSX.readFile(filePath)
  const ws = wb.Sheets['Danh sách dự án']
  if (!ws) {
    console.error('❌ Không tìm thấy sheet "Danh sách dự án"')
    process.exit(1)
  }

  // Read from row 6 onward (rows 1-5 are header/example)
  const rows: Record<string, string>[] = XLSX.utils.sheet_to_json(ws, {
    range: 5, // 0-indexed = row 6
    header: [
      'stt', 'slug', 'titleVi', 'titleEn', 'category',
      'location', 'area', 'duration', 'client', 'year',
      'descVi', 'descEn', 'image', 'sketchImage', 'images', 'published'
    ],
    defval: '',
  })

  let created = 0, updated = 0, skipped = 0
  const seenSlugs: string[] = []
  const poolCursor: Record<string, number> = {}

  for (const row of rows) {
    const titleVi = String(row.titleVi || '').trim()
    const titleEn = String(row.titleEn || '').trim()
    const descVi  = String(row.descVi  || '').trim()
    const descEn  = String(row.descEn  || '').trim()
    const image   = String(row.image   || '').trim()
    const client  = String(row.client  || '').trim()
    const year    = String(row.year    || '').trim()

    // Skip empty rows
    if (!titleVi && !titleEn) { skipped++; continue }

    // Validate required fields (ảnh có thể nhập sau)
    const missing = []
    if (!titleVi)  missing.push('Tên VI')
    if (!titleEn)  missing.push('Tên EN')
    if (!descVi)   missing.push('Mô tả VI')
    if (!descEn)   missing.push('Mô tả EN')
    if (!client)   missing.push('Chủ đầu tư')
    if (!year)     missing.push('Năm')

    if (missing.length) {
      console.warn(`⚠️  Bỏ qua "${titleVi || titleEn}" — thiếu: ${missing.join(', ')}`)
      skipped++
      continue
    }

    const slug = String(row.slug || '').trim() || slugify(titleEn)
    const rawCategory = String(row.category || 'Golf').trim()
    const validCategories = ['Golf', 'Resort', 'Urban', 'Construction', 'Artwork']
    let category = rawCategory
    if (!validCategories.includes(category)) {
      category = CATEGORY_ALIASES[rawCategory.toLowerCase()] || 'Construction'
      console.warn(`⚠️  "${titleVi}" — danh mục "${rawCategory}" → dùng "${category}"`)
    }

    // Parse gallery images
    const imagesRaw = String(row.images || '').trim()
    let imagesList = imagesRaw
      ? imagesRaw.split(',').map(u => u.trim()).filter(Boolean)
      : []

    // Fallback ảnh: nếu Excel chưa có ảnh, lấy ảnh thật từ pool Cloudinary theo danh mục
    let finalImage = image
    if (!finalImage) {
      const pool = IMAGE_POOLS[category] || IMAGE_POOLS['Construction'] || []
      if (pool.length) {
        const cur = poolCursor[category] ?? 0
        finalImage = pool[cur % pool.length]
        if (!imagesList.length) {
          imagesList = [0, 1, 2, 3].map(k => pool[(cur + k) % pool.length])
        }
        poolCursor[category] = cur + 1
        console.log(`🖼  "${titleVi}" chưa có ảnh — dùng tạm ảnh Cloudinary (${category}), thay sau qua /admin/projects`)
      }
    }

    const data = {
      slug,
      title:         titleVi,
      titleEn,
      category,
      location:      String(row.location    || '').trim() || '—',
      area:          String(row.area        || '').trim() || '—',
      duration:      String(row.duration    || '').trim() || '—',
      client,
      year,
      image:         finalImage || '',    // có thể cập nhật sau qua admin
      sketchImage:   String(row.sketchImage || '').trim(),
      images:        imagesList,
      description:   descVi,
      descriptionEn: descEn,
      published:     String(row.published || 'TRUE').toUpperCase() !== 'FALSE',
    }
    seenSlugs.push(slug)

    try {
      const existing = await prisma.project.findUnique({ where: { slug } })
      if (existing) {
        await prisma.project.update({ where: { slug }, data })
        console.log(`✏️  Updated: ${titleVi} (${slug})`)
        updated++
      } else {
        await prisma.project.create({ data })
        console.log(`✅ Created: ${titleVi} (${slug})`)
        created++
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`❌ Lỗi "${titleVi}": ${msg}`)
      skipped++
    }
  }

  // --prune: xoá các dự án không có trong Excel (dọn data demo cũ)
  if (process.argv.includes('--prune')) {
    const stale = await prisma.project.findMany({
      where: { slug: { notIn: seenSlugs } },
      select: { slug: true, title: true },
    })
    for (const s of stale) {
      await prisma.project.delete({ where: { slug: s.slug } })
      console.log(`🗑  Đã xoá dự án cũ: ${s.title} (${s.slug})`)
    }
    console.log(`\n🧹 Prune: đã xoá ${stale.length} dự án không có trong Excel`)
  } else {
    const staleCount = await prisma.project.count({ where: { slug: { notIn: seenSlugs } } })
    if (staleCount > 0) {
      console.log(`\nℹ️  Còn ${staleCount} dự án cũ trong DB không có trong Excel. Chạy lại với --prune để xoá:`)
      console.log(`   npx tsx prisma/seed-from-excel.ts template-du-an.xlsx --prune`)
    }
  }

  console.log(`\n📊 Kết quả: ${created} tạo mới | ${updated} cập nhật | ${skipped} bỏ qua`)
}

main()
  .catch(e => { console.error('❌', e.message); process.exit(1) })
  .finally(() => prisma.$disconnect())
