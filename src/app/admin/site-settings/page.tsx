import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import SiteSettingsManager from './SiteSettingsManager'

export default async function SiteSettingsPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <SiteSettingsManager />
    </AdminShell>
  )
}
