import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Mail, Phone, X } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from '../../components/admin/AdminLayout'

type Submission = {
  id: string
  name: string
  email: string
  phone: string
  userType: string
  interestType: string
  status: 'NEW' | 'READ'
  createdAt: string
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('')
}

export default function AdminMessages() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    apiRequest<{ submissions: Submission[] }>('/api/contact')
      .then(({ submissions }) => setSubmissions(submissions))
      .catch(() => {
        // A failed fetch here almost always means the session token is stale
        // (e.g. role changed after login) — send them back to log in fresh
        // instead of showing a raw backend error.
        logout()
        navigate('/login', { replace: true })
      })
      .finally(() => setLoading(false))
  }, [logout, navigate])

  const selected = submissions.find((s) => s.id === selectedId) ?? null

  const markRead = async (id: string) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'READ' } : s)))
    try {
      await apiRequest(`/api/contact/${id}/read`, { method: 'PATCH' })
    } catch {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'NEW' } : s)))
    }
  }

  return (
    <AdminLayout title="Messages">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Table */}
        <div className="flex-1 overflow-auto p-8">
          {loading && (
            <div className="flex items-center gap-2 text-tokeo-navy/50">
              <Loader2 size={16} className="animate-spin" /> Loading messages...
            </div>
          )}

          {!loading && submissions.length === 0 && (
            <div className="flex flex-col items-center text-center gap-3 py-20">
              <Mail className="text-tokeo-navy/25" size={32} />
              <p className="text-tokeo-navy/50">No messages yet.</p>
            </div>
          )}

          {!loading && submissions.length > 0 && (
            <div className="bg-white border border-tokeo-navy/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-tokeo-navy/[0.03] text-left text-xs font-semibold tracking-wide uppercase text-tokeo-navy/40">
                    <th className="px-5 py-3 font-semibold">Name</th>
                    <th className="px-5 py-3 font-semibold">Contact</th>
                    <th className="px-5 py-3 font-semibold">Interested in</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={`border-t border-tokeo-navy/5 cursor-pointer transition-colors ${
                        selectedId === s.id ? 'bg-tokeo-gold/[0.06]' : 'hover:bg-tokeo-navy/[0.02]'
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-tokeo-navy/5 text-tokeo-navy text-xs font-semibold flex items-center justify-center shrink-0">
                            {initials(s.name)}
                          </span>
                          <span className="font-medium text-tokeo-navy">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-tokeo-navy/55">{s.email}</td>
                      <td className="px-5 py-4 text-tokeo-navy/55">{s.interestType}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[0.65rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${
                            s.status === 'NEW'
                              ? 'bg-tokeo-gold/10 text-tokeo-gold'
                              : 'bg-tokeo-navy/5 text-tokeo-navy/40'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-tokeo-navy/40">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 shrink-0 border-l border-tokeo-navy/10 bg-white p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex flex-col items-center gap-3 mx-auto text-center">
                <span className="w-14 h-14 rounded-full bg-tokeo-navy text-tokeo-cream text-lg font-semibold flex items-center justify-center">
                  {initials(selected.name)}
                </span>
                <p className="text-tokeo-navy font-bold">{selected.name}</p>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="text-tokeo-navy/40 hover:text-tokeo-navy shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-tokeo-navy/70 hover:text-tokeo-navy">
                <Mail size={14} /> {selected.email}
              </a>
              <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-tokeo-navy/70 hover:text-tokeo-navy">
                <Phone size={14} /> {selected.phone}
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-tokeo-navy/10">
              <p className="text-xs font-semibold tracking-widest uppercase text-tokeo-navy/40">Details</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs border border-tokeo-navy/15 rounded-full px-3 py-1 text-tokeo-navy/60">{selected.userType}</span>
                <span className="text-xs border border-tokeo-navy/15 rounded-full px-3 py-1 text-tokeo-navy/60">{selected.interestType}</span>
              </div>
              <p className="text-xs text-tokeo-navy/35 mt-2">
                Submitted {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>

            {selected.status === 'NEW' && (
              <button
                onClick={() => markRead(selected.id)}
                className="mt-auto bg-tokeo-gold text-tokeo-navy font-semibold text-sm rounded-lg px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                Mark as read
              </button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
