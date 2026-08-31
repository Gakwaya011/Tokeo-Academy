import { useEffect, useRef, useState } from 'react'
import { Loader2, Newspaper, Plus, Pencil, Trash2, X, ImageIcon } from 'lucide-react'
import { apiRequest, apiUpload } from '../../lib/api'
import type { Insight } from '../../types/insight'
import AdminLayout from '../../components/admin/AdminLayout'

type FormState = {
  slug: string
  category: string
  title: string
  excerpt: string
  body: string[]
  imageFocus: string
}

const emptyForm: FormState = {
  slug: '',
  category: '',
  title: '',
  excerpt: '',
  body: [''],
  imageFocus: 'center',
}

export default function AdminInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Insight | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const load = () => {
    setLoading(true)
    apiRequest<{ insights: Insight[] }>('/api/insights')
      .then(({ insights }) => setInsights(insights))
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

  const openEdit = (insight: Insight) => {
    setEditing(insight)
    setForm({
      slug: insight.slug,
      category: insight.category,
      title: insight.title,
      excerpt: insight.excerpt,
      body: insight.body.length > 0 ? insight.body : [''],
      imageFocus: insight.imageFocus,
    })
    setImageFile(null)
    setImagePreview(insight.imageUrl)
    setError('')
    setFormOpen(true)
  }

  const closeForm = () => setFormOpen(false)

  const handleChange = (field: 'slug' | 'category' | 'title' | 'excerpt' | 'imageFocus', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleParagraphChange = (index: number, value: string) => {
    setForm((prev) => ({ ...prev, body: prev.body.map((p, i) => (i === index ? value : p)) }))
  }

  const addParagraph = () => setForm((prev) => ({ ...prev, body: [...prev.body, ''] }))
  const removeParagraph = (index: number) =>
    setForm((prev) => ({ ...prev, body: prev.body.filter((_, i) => i !== index) }))

  const handleImagePick = (file: File | null) => {
    setImageFile(file)
    setImagePreview(file ? URL.createObjectURL(file) : editing?.imageUrl ?? null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const formData = new FormData()
    formData.append('slug', form.slug)
    formData.append('category', form.category)
    formData.append('title', form.title)
    formData.append('excerpt', form.excerpt)
    formData.append('imageFocus', form.imageFocus)
    formData.append('body', JSON.stringify(form.body.map((p) => p.trim()).filter(Boolean)))
    if (imageFile) formData.append('image', imageFile)

    try {
      if (editing) {
        const { insight } = await apiUpload<{ insight: Insight }>(`/api/insights/${editing.id}`, formData, { method: 'PATCH' })
        setInsights((prev) => prev.map((i) => (i.id === insight.id ? insight : i)))
      } else {
        const { insight } = await apiUpload<{ insight: Insight }>('/api/insights', formData)
        setInsights((prev) => [...prev, insight])
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
      await apiRequest(`/api/insights/${id}`, { method: 'DELETE' })
      setInsights((prev) => prev.filter((i) => i.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  const inputClass =
    'w-full bg-tokeo-offwhite border border-tokeo-navy/10 rounded-lg text-tokeo-navy placeholder:text-tokeo-navy/30 px-3.5 py-2.5 text-sm focus:outline-none focus:border-tokeo-gold/50 transition-colors'
  const labelClass = 'block text-xs font-semibold tracking-wide uppercase text-tokeo-navy/40 mb-1.5'

  return (
    <AdminLayout title="Insights">
      <div className="p-8 overflow-auto h-[calc(100vh-4rem)]">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-tokeo-navy/50">{insights.length} article{insights.length === 1 ? '' : 's'}</p>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-tokeo-navy text-tokeo-cream text-sm font-semibold rounded-lg px-4 py-2.5 hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> Add Insight
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-tokeo-navy/50">
            <Loader2 size={16} className="animate-spin" /> Loading insights...
          </div>
        )}

        {!loading && insights.length === 0 && (
          <div className="flex flex-col items-center text-center gap-3 py-20">
            <Newspaper className="text-tokeo-navy/25" size={32} />
            <p className="text-tokeo-navy/50">No insights yet.</p>
          </div>
        )}

        {!loading && insights.length > 0 && (
          <div className="bg-white border border-tokeo-navy/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tokeo-navy/[0.03] text-left text-xs font-semibold tracking-wide uppercase text-tokeo-navy/40">
                  <th className="px-5 py-3 font-semibold">Article</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Slug</th>
                  <th className="px-5 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {insights.map((insight) => (
                  <tr key={insight.id} className="border-t border-tokeo-navy/5 hover:bg-tokeo-navy/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-tokeo-navy/5 overflow-hidden shrink-0 flex items-center justify-center">
                          {insight.imageUrl ? (
                            <img src={insight.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={14} className="text-tokeo-navy/25" />
                          )}
                        </div>
                        <span className="font-medium text-tokeo-navy">{insight.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-tokeo-navy/55">{insight.category}</td>
                    <td className="px-5 py-3.5 text-tokeo-navy/55">{insight.slug}</td>
                    <td className="px-5 py-3.5 text-tokeo-navy/40">{new Date(insight.updatedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(insight)}
                          className="p-2 text-tokeo-navy/40 hover:text-tokeo-navy hover:bg-tokeo-navy/5 rounded-lg transition-colors"
                          aria-label={`Edit ${insight.title}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(insight.id)}
                          disabled={deletingId === insight.id}
                          className="p-2 text-tokeo-navy/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                          aria-label={`Delete ${insight.title}`}
                        >
                          {deletingId === insight.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
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
                {editing ? 'Edit Insight' : 'Add Insight'}
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
                  <label className={labelClass}>Category</label>
                  <input
                    required
                    value={form.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="Execution Notes"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Slug</label>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="planning-less-executing-more"
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
                <label className={labelClass}>Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>Image focus (CSS object-position)</label>
                <input
                  value={form.imageFocus}
                  onChange={(e) => handleChange('imageFocus', e.target.value)}
                  placeholder="center 45%"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className={labelClass}>Body paragraphs</label>
                  <button type="button" onClick={addParagraph} className="text-xs font-semibold text-tokeo-gold hover:opacity-80">
                    + Add paragraph
                  </button>
                </div>
                {form.body.map((paragraph, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <textarea
                      required
                      rows={3}
                      value={paragraph}
                      onChange={(e) => handleParagraphChange(i, e.target.value)}
                      className={`${inputClass} resize-none flex-1`}
                    />
                    {form.body.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraph(i)}
                        className="p-2 text-tokeo-navy/30 hover:text-red-600 transition-colors"
                        aria-label={`Remove paragraph ${i + 1}`}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 bg-tokeo-gold text-tokeo-navy font-semibold text-sm rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
              >
                {saving && <Loader2 size={15} className="animate-spin" />}
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Insight'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
