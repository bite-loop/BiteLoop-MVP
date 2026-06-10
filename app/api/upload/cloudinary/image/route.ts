import { v2 as cloudinary} from "cloudinary"
import { NextRequest, NextResponse } from "next/server"

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export async function POST(request: NextRequest) {
     try {
        const formData = await request.formData()
        const file = formData.get('image') as File
        const userId = formData.get('userId') as string

        if (!file) {
             return NextResponse.json(
                {error: "No file provided"},
                {status: 400}
             )
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // upload to cloudinary
        const uploadRes = await new Promise((resolve, reject) => { 
            cloudinary.uploader.upload_stream(
                 {
                     folder: `user/${userId}/profile`,
                      transformation: [
                     { width: 500, height: 500, crop: "limit" },
                        { quality: "auto" }
                    ],
                 },
                 (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                 }
            ).end(buffer)
        })

        const result = uploadRes as any

        return NextResponse.json({
            success: true,
            imageUrl: result.secure_url,
            publicId: result.publicId
        })
     } catch (error:any) {
       console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
     }
}