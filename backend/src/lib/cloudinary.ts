import { v2 as cloudinary } from 'cloudinary'
import '../config/env'

// cloudinary.config() with no args auto-reads CLOUDINARY_URL from process.env
cloudinary.config()

export function uploadImage(buffer: Buffer, folder: string): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err || !result) return reject(err ?? new Error('Cloudinary upload returned no result'))
      resolve({ url: result.secure_url, publicId: result.public_id })
    })
    stream.end(buffer)
  })
}

export function deleteImage(publicId: string): Promise<void> {
  return cloudinary.uploader.destroy(publicId).then(() => undefined)
}
