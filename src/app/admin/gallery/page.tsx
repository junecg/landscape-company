import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import GalleryManager from './GalleryManager'

export default async function GalleryPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <GalleryManager />
    </AdminShell>
  )
}
