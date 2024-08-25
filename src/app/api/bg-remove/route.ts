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

export  async function POST(request: NextRequest) {
    const { userId } = auth()

    if (!userId) return NextResponse.json("Unauthorized", { status: 401 })

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
        return NextResponse.json("Cloudinary credentials not found", { status: 500 })
    }
    const formData = await request.formData()
    const file = formData.get('file') as string | null

    if (!file) {
        return NextResponse.json("File not found", { status: 400 })
    }
  
        
    const result=  cloudinary.image(file, {effect: "background_removal"})
    console.log("result = ",result);
    
       return NextResponse.json({
        data: result,
        message: "Image uploaded successfully"  
        }, { status: 200 })
    

    
}