"use client"
import React,{useState, useEffect, useRef} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { CldImage } from 'next-cloudinary';
import {  IconProgressX } from '@tabler/icons-react';


const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  "Facebook Post (1.91:1)": { width: 1200, height: 630, aspectRatio: "1.91:1" },
  "LinkedIn Post (1.91:1)": { width: 1200, height: 627, aspectRatio: "1.91:1" },
  "LinkedIn Banner (4:1)": { width: 1584, height: 396, aspectRatio: "4:1" },
  "YouTube Thumbnail (16:9)": { width: 1280, height: 720, aspectRatio: "16:9" },
  "YouTube Channel Cover (16:9)": { width: 2560, height: 1440, aspectRatio: "16:9" },
  "Pinterest Pin (2:3)": { width: 1000, height: 1500, aspectRatio: "2:3" },
  "Pinterest Square (1:1)": { width: 1000, height: 1000, aspectRatio: "1:1" },
  "Snapchat Ad (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "TikTok Video (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "LinkedIn Profile Photo (1:1)": { width: 400, height: 400, aspectRatio: "1:1" },
  "Instagram Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
};
type SocialFormat = keyof typeof socialFormats;

const page = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploaded, setUploaded] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [fileData, setFileData] = useState<string>('')
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('Instagram Square (1:1)');
   const imgRef = useRef<HTMLImageElement>(null)

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

  const handleFileDownload = () => {
    console.log(imgRef);
    
        if(!imgRef.current) return;

        fetch(imgRef.current.src)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
        })
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
        <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
        className='select select-sm w-full mt-4'
        title='Select social media format'

        >
          {
            Object.keys(socialFormats).map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))
          }
        </select>
      </div>


      <div>
        {uploading && <IconProgressX/>}
      </div>
      <div>
        {uploaded && 
        <div className='card bg-base-100 flex justify-center shadow-xl'>
          <CldImage
            width={socialFormats[selectedFormat].width}
            height={socialFormats[selectedFormat].height}
            src={fileData}
            aspectRatio={socialFormats[selectedFormat].aspectRatio}
            
            crop="fill"
            gravity="auto"
            sizes="100vw"
            alt="Description of my image"
          />

            <div>
            <button
            onClick={handleFileDownload}
            className='btn btn-primary mt-4'
            >
              Download Image
            </button>
            
          </div>
        </div>
        }
      </div>
      
      <Toaster />
    </div>
  )
}

export default page