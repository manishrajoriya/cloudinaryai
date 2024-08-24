"use client"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { CldImage } from 'next-cloudinary';

function page() {
    const [file, setFile] = useState<File | null>(null)
  const [uploaded, setUploaded] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [fileData, setFileData] = useState<string>('')
    
    const handleFileUpload = async() => {
    if (!file) {
    toast.error('Please select a file')
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        setUploaded(true)
        toast.success('File uploaded successfully')
      } else {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setFileData(data.publicId)
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }
  return (
    <div>
         <input type="file"
        accept='image/*'
        disabled={uploading}
        multiple={false}
        title='image upload'
        className='input input-sm w-full  card-body'
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={handleFileUpload} disabled={uploading}>Upload</button>
        {uploaded && 
        
        <CldImage
            width="960"
            height="600"
            src={fileData}
            sizes="100vw"
            removeBackground={true}
            alt=""
            />
        }
        <Toaster />
    </div>
  )
}

export default page