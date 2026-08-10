import { NextResponse } from 'next/server';
import { getInvitationsCollection } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { goldenPass, whatsappNumber } = body;

    if (!goldenPass) {
      return NextResponse.json(
        { error: 'Golden Pass parameter is required' },
        { status: 400 }
      );
    }

    if (!whatsappNumber) {
      return NextResponse.json(
        { error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }

    const targetPass = goldenPass.toString().trim();
    const cleanWhatsapp = whatsappNumber.toString().trim();

    const collection = await getInvitationsCollection();
    const updateResult = await collection.findOneAndUpdate(
      {
        $or: [
          { "GOLDEN PASS": targetPass },
          { "GOLDEN PASS": String(targetPass) }
        ]
      },
      {
        $set: {
          "WHATSAPP NUMBER": cleanWhatsapp,
          "EXCLUSIVE EVEN CONFIRMATION": "CONFIRMED",
          "updatedAt": new Date().toISOString()
        }
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json({
      success: true,
      message: 'WhatsApp number successfully posted to MongoDB!',
      data: updateResult?.value || updateResult,
    });
  } catch (error: any) {
    console.error('Error updating WhatsApp number in MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to update database', message: error?.message },
      { status: 500 }
    );
  }
}
