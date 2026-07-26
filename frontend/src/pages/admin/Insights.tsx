import AdminLayout from '../../components/admin/AdminLayout'
import AdminComingSoon from '../../components/admin/AdminComingSoon'

export default function AdminInsights() {
  return (
    <AdminLayout title="Insights">
      <AdminComingSoon
        label="Insights"
        description="Articles are still managed directly in the codebase. Editing them from here — create, update, publish — is coming next."
      />
    </AdminLayout>
  )
}
