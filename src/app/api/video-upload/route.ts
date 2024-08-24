import { NextRequest, NextResponse } from "next/server";

import { v2 as cloudinary } from 'cloudinary';

import { auth } from "@clerk/nextjs/server";


 cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });


export async function POST(request: NextRequest) {
  const {userId} = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
    
  }

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
     !process.env.CLOUDINARY_API_KEY || 
     !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: "Missing Cloudinary environment variables" }, { status: 500 });
  }

  try {
    const formdata = await request.formData();
    const file = formdata.get('file') as File | null;
    const title = formdata.get('title') as string;
    const description = formdata.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    } 

    const bytes=  await file.arrayBuffer()
        const buffer = Buffer.from(bytes);
        const uploadResult = await new Promise((resolve, reject) => {
           const uploadStrem = cloudinary.uploader.upload_stream(
            {
                resource_type: 'video',
                folder: "2video-upload",
                transformation: [
                    { quality: 'auto', fetch_format: 'mp4' }
                ],
               
                
                }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result );
                }
            })
            uploadStrem.end(buffer);
        });
        return NextResponse.json({data: uploadResult, title, description});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to upload video" }, { status: 500 });
    
  }

}