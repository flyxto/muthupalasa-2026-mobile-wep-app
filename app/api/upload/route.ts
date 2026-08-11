import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } from '@/lib/r2';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const goldenPass = (formData.get('goldenPass') as string || '').trim();

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!goldenPass) {
      return NextResponse.json(
        { error: 'Golden Pass identifier is required' },
        { status: 400 }
      );
    }

    // Read file bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine extension
    const mimeType = file.type || 'image/jpeg';
    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('webp')) ext = 'webp';
    else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = 'jpg';

    // Object key in R2 bucket
    const key = `invitations/pass-${goldenPass}-${Date.now()}.${ext}`;

    // Upload directly to Cloudflare R2 bucket
    const putCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    });

    await r2Client.send(putCommand);

    // Public URL
    const publicUrl = `${R2_PUBLIC_URL}/${key}`;

    // Temporarily bypass MongoDB
    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
      data: {
        goldenPass: goldenPass,
        originalImage: publicUrl,
      },
    });
  } catch (error: any) {
    console.error('Error uploading image to R2 / updating Mock DB:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', message: error?.message },
      { status: 500 }
    );
  }
}
