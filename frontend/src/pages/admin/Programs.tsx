import { useEffect, useRef, useState } from 'react'
import { Loader2, Compass, Plus, Pencil, Trash2, X, ImageIcon } from 'lucide-react'
import { apiRequest, apiUpload } from '../../lib/api'
import type { Program } from '../../types/program'
import AdminLayout from '../../components/admin/AdminLayout'

type FormState = {
  number: string
  slug: string
  title: string
  tagline: string
  challenge: string
  artifact: string
  quote: string
}

const emptyForm: FormState = {
  number: '',
  slug: '',
  title: '',
  tagline: '',
  challenge: '',
  artifact: '',
  quote: '',
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Program | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const load = () => {
    setLoading(true)
    apiRequest<{ programs: Program[] }>('/api/programs')
      .then(({ programs }) => setPrograms(programs))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview(null)
    setError('')
    setFormOpen(true)
  }

  const openEdit = (program: Program) => {
    setEditing(program)
    setForm({
      number: program.number,
      slug: program.slug,
      title: program.title,
      tagline: program.tagline,
      challenge: program.challenge,
      artifact: program.artifact,
      quote: program.quote,
    })
    setImageFile(null)
    setImagePreview(program.imageUrl)
    setError('')
    setFormOpen(true)
  }

  const closeForm = () => setFormOpen(false)

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImagePick = (file: File | null) => {
    setImageFile(file)
    setImagePreview(file ? URL.createObjectURL(file) : editing?.imageUrl ?? null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    if (imageFile) formData.append('image', imageFile)

    try {
      if (editing) {
        const { program } = await apiUpload<{ program: Program }>(`/api/programs/${editing.id}`, formData, { method: 'PATCH' })
        setPrograms((prev) => prev.map((p) => (p.id === program.id ? program : p)))
      } else {
        const { program } = await apiUpload<{ program: Program }>('/api/programs', formData)
        setPrograms((prev) => [...prev, program])
      }
      setFormOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await apiRequest(`/api/programs/${id}`, { method: 'DELETE' })
      setPrograms((prev) => prev.filter((p) => p.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  const inputClass =
    'w-full bg-tokeo-offwhite border border-tokeo-navy/10 rounded-lg text-tokeo-navy placeholder:text-tokeo-navy/30 px-3.5 py-2.5 text-sm focus:outline-none focus:border-tokeo-gold/50 transition-colors'
  const labelClass = 'block text-xs font-semibold tracking-wide uppercase text-tokeo-navy/40 mb-1.5'

  return (
    <AdminLayout title="Programs">
      <div className="p-8 overflow-auto h-[calc(100vh-4rem)]">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-tokeo-navy/50">{programs.length} program{programs.length === 1 ? '' : 's'}</p>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-tokeo-navy text-tokeo-cream text-sm font-semibold rounded-lg px-4 py-2.5 hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> Add Program
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-tokeo-navy/50">
            <Loader2 size={16} className="animate-spin" /> Loading programs...
          </div>
        )}

        {!loading && programs.length === 0 && (
          <div className="flex flex-col items-center text-center gap-3 py-20">
            <Compass className="text-tokeo-navy/25" size={32} />
            <p className="text-tokeo-navy/50">No programs yet.</p>
          </div>
        )}

        {!loading && programs.length > 0 && (
          <div className="bg-white border border-tokeo-navy/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tokeo-navy/[0.03] text-left text-xs font-semibold tracking-wide uppercase text-tokeo-navy/40">
                  <th className="px-5 py-3 font-semibold">Program</th>
                  <th className="px-5 py-3 font-semibold">Number</th>
                  <th className="px-5 py-3 font-semibold">Slug</th>
                  <th className="px-5 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id} className="border-t border-tokeo-navy/5 hover:bg-tokeo-navy/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-tokeo-navy/5 overflow-hidden shrink-0 flex items-center justify-center">
                          {program.imageUrl ? (
                            <img src={program.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={14} className="text-tokeo-navy/25" />
                          )}
                        </div>
                        <span className="font-medium text-tokeo-navy">{program.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-tokeo-navy/55">{program.number}</td>
                    <td className="px-5 py-3.5 text-tokeo-navy/55">{program.slug}</td>
                    <td className="px-5 py-3.5 text-tokeo-navy/40">{new Date(program.updatedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(program)}
                          className="p-2 text-tokeo-navy/40 hover:text-tokeo-navy hover:bg-tokeo-navy/5 rounded-lg transition-colors"
                          aria-label={`Edit ${program.title}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(program.id)}
                          disabled={deletingId === program.id}
                          className="p-2 text-tokeo-navy/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                          aria-label={`Delete ${program.title}`}
                        >
                          {deletingId === program.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-tokeo-navy/40" onClick={closeForm}>
          <div
            className="w-full max-w-md bg-white h-full overflow-y-auto p-8 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-tokeo-navy text-xl font-bold tracking-tight">
                {editing ? 'Edit Program' : 'Add Program'}
              </h2>
              <button onClick={closeForm} className="text-tokeo-navy/40 hover:text-tokeo-navy" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
              )}

              <div>
                <label className={labelClass}>Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-tokeo-offwhite border border-tokeo-navy/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={18} className="text-tokeo-navy/25" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleImagePick(e.target.files?.[0] ?? null)}
                    className="text-xs text-tokeo-navy/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Number</label>
                  <input
                    required
                    value={form.number}
                    onChange={(e) => handleChange('number', e.target.value)}
                    placeholder="00"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Slug</label>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="inner-compass"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  required
                  value={form.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Challenge</label>
                <textarea
                  required
                  rows={3}
                  value={form.challenge}
                  onChange={(e) => handleChange('challenge', e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>You will build (artifact)</label>
                <input
                  required
                  value={form.artifact}
                  onChange={(e) => handleChange('artifact', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Quote</label>
                <textarea
                  required
                  rows={2}
                  value={form.quote}
                  onChange={(e) => handleChange('quote', e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 bg-tokeo-gold text-tokeo-navy font-semibold text-sm rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
              >
                {saving && <Loader2 size={15} className="animate-spin" />}
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Program'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
