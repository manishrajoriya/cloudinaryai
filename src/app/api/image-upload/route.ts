import { auth } from '@clerk/nextjs/server'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest } from 'next/server'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true

})

export async function POST(request: NextRequest) {
    const {userId} = auth()

    if(!userId){
        return  Response.json("Unauthorized", {status: 401})
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
        return  Response.json("Cloudinary credentials not found", { status: 500 })
    }
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return  Response.json("File not found", { status: 400 })
        }

        const byte = await file.arrayBuffer();
        const buffer = Buffer.from(byte);
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        });
    } catch (error) {
        
    }
    
}