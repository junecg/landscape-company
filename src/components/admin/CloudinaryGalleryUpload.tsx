'use client'

import { useRef, useState } from 'react'

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

interface Props {
  value: string[]
  onChange: (urls: string[]) => void
  label?: string
}

export default function CloudinaryGalleryUpload({ value, onChange, label = 'Ảnh gallery' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const uploadFile = async (file: File): Promise<string> => {
    const form = new FormData()
    form.append('file', file)
    form.append('upload_preset', UPLOAD_PRESET!)
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: form }
    )
    if (!res.ok) throw new Error('Upload thất bại')
    const data = await res.json()
    return data.secure_url as string
  }

  const handleFiles = async (files: FileList) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError('Chưa cấu hình Cloudinary')
      return
    }
    setUploading(true)
    setError('')
    try {
      const uploads = await Promise.all(Array.from(files).map(uploadFile))
      onChange([...value, ...uploads])
    } catch {
      setError('Một số ảnh upload thất bại.')
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(e.target.files)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (files.length) handleFiles(Object.assign(new DataTransfer(), { files }).files)
  }

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {/* Grid preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {value.map((url, i) => (
            <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`w-full h-20 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors
          ${uploading ? 'border-[#328442] bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-[#328442] hover:bg-green-50/40'}`}
      >
        {uploading ? (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-4 h-4 border-2 border-[#328442] border-t-transparent rounded-full animate-spin" />
            Đang tải lên...
          </div>
        ) : (
          <span className="text-xs text-gray-400">
            + Thêm ảnh <span className="text-[#328442] font-medium">chọn file</span> hoặc kéo thả (nhiều file)
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {/* URL text fallback */}
      <details className="mt-2">
        <summary className="text-[11px] text-gray-400 cursor-pointer select-none">Dán URL thủ công</summary>
        <textarea
          value={value.join('\n')}
          onChange={(e) => onChange(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
          rows={3}
          placeholder="Mỗi URL một dòng..."
          className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] resize-none"
        />
      </details>

      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />
    </div>
  )
}
