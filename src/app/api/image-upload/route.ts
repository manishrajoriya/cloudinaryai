import { auth } from '@clerk/nextjs/server'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    

})

interface CloudinaryResponse {
    public_id: string;
    [key: string]: any;
    
}

export async function POST(request: NextRequest) {
    const {userId} = auth()

    if(!userId){
        return  NextResponse.json("Unauthorized", {status: 401})
    }

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
        return  NextResponse.json("Cloudinary credentials not found", { status: 500 })
    }
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return  Response.json("File not found", { status: 400 })
        }

        const byte = await file.arrayBuffer();
        const buffer = Buffer.from(byte);
        const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream({ 
                
                folder: "ai2",
                
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result as CloudinaryResponse);
                }
            }).end(buffer);
        });

        return NextResponse.json(
            { publicId: result.public_id}, { status: 200 }
        )
    } catch (error) {
        console.log("error in immage upload route", error);
        return  NextResponse.json("Error uploading image", { status: 500 })
        
    }
    
}