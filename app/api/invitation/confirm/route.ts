import { NextResponse } from 'next/server';

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

    // Temporarily bypass MongoDB
    return NextResponse.json({
      success: true,
      message: 'Mock: WhatsApp number successfully posted (DB Bypassed)',
      data: {
        goldenPass: targetPass,
        waNumber: cleanWhatsapp,
        waStatus: true,
        isRegistered: true,
        updatedAt: new Date().toISOString()
      },
    });
  } catch (error: any) {
    console.error('Error in mock API:', error);
    return NextResponse.json(
      { error: 'Failed to update (Mock)', message: error?.message },
      { status: 500 }
    );
  }
}
