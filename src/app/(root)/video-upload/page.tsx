"use client"

import { NextRequest } from 'next/server';
import React, { useState } from 'react'
import toast, {Toaster} from 'react-hot-toast';

const videoUpload:React.FC = () =>{
    const [selectedvideo, setSelectedVideo] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('');
    

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const file = e.target.files?.[0];
        if (file ) {
            setSelectedVideo(file);
        }

    }

    const handleUpload = async () => {
        if (!selectedvideo) {
            toast.error('Please select a video file');
            return
        }

        if (!title || !description) {
            toast.error('Please enter a title and description');
            return
        } 

        setUploading(true);

        const formData = new FormData();
        formData.append('video', selectedvideo);
        formData.append('title', title);
        formData.append('description', description);

        try {
            const response = await fetch('/api/video-upload', {
                method: 'POST',
                body: formData
            })
            console.log("1st fetch",response);
            
            if (response.status === 200) {
                toast.success('Video uploaded successfully');
            }else{
                toast.error('Failed to upload video');
            }
            
        } catch (error) {
            toast.error('Failed to upload video catch');
            console.log(error);
        }

    }
    // get responce form route
   
    

  return (
    <div className=''>
         <input 
         className='input input-sm w-full  card-body'
        type="text" 
        placeholder="Enter video title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

         <textarea
         className='textarea textarea-bordered max-w-full'
        placeholder="Enter video description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

         <input 
         className=' max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg'
         title='upload video'
        type="file" 
        accept="video/*" 
        onChange={handleVideoChange} 
      />

      <button
      className='btn btn-primary mt-4'
        onClick={handleUpload}
        disabled={uploading}
        title='upload video'
      >
        {uploading? "uploading..." : "upload video"}
      </button>

        <Toaster />
    </div>
  )
}

export default videoUpload