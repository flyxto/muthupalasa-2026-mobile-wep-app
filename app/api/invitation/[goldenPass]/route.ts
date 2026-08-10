import { NextResponse } from 'next/server';
import { getInvitationsCollection } from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ goldenPass: string }> }
) {
  try {
    const resolvedParams = await params;
    const goldenPass = resolvedParams?.goldenPass;

    if (!goldenPass) {
      return NextResponse.json(
        { error: 'Golden Pass parameter is required' },
        { status: 400 }
      );
    }

    const targetPass = goldenPass.trim();
    const collection = await getInvitationsCollection();

    // Query invitation by "GOLDEN PASS"
    const invitation = await collection.findOne({
      $or: [
        { "GOLDEN PASS": targetPass },
        { "GOLDEN PASS": String(targetPass) }
      ]
    });

    if (!invitation) {
      return NextResponse.json(
        { error: `Invitation not found for Golden Pass: ${targetPass}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: invitation });
  } catch (error: any) {
    console.error('Error fetching invitation from MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invitation from database', message: error?.message },
      { status: 500 }
    );
  }
}
