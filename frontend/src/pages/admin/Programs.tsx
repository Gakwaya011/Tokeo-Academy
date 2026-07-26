import AdminLayout from '../../components/admin/AdminLayout'
import AdminComingSoon from '../../components/admin/AdminComingSoon'

export default function AdminPrograms() {
  return (
    <AdminLayout title="Programs">
      <AdminComingSoon
        label="Programs"
        description="What's editable here depends on what the pilot program ends up needing — that's still being defined before these tools get built."
      />
    </AdminLayout>
  )
}
