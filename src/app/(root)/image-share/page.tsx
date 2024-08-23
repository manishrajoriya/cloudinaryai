"use client"
import React,{useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { CldImage } from 'next-cloudinary';
import { IconProgress, IconProgressX } from '@tabler/icons-react';

const page = () => {
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
      <div>
        <input type="file"
        accept='image/*'
        disabled={uploading}
        multiple={false}
        title='image upload'
        className='input input-sm w-full  card-body'
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        
        <button
        className='btn btn-primary mt-4'
        onClick={handleFileUpload}
        >
          upload image
        </button>
      </div>
      <div>
        {uploading && <IconProgressX/>}
      </div>
      <div>
        {uploaded && 
        <div>
          <CldImage
            width="500"
            height="500"
            src={fileData}
            
            crop="fill"
            gravity="auto"
            sizes="100vw"
            alt="Description of my image"
          />
        </div>
        }
      </div>
      <Toaster />
    </div>
  )
}

export default page