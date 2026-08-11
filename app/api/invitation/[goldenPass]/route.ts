import { NextResponse } from 'next/server';

const MOCK_OBJECTS = [
  {
    "loyaltyClub": "MUTHUPALASA",
    "area": "CENTRAL 2",
    "classification": "GOLD",
    "bpCode": "800045",
    "bpName": "800045 : SINHA DISTRIBUTORS - MONARAGALA",
    "outletCode": "T1022004018203",
    "outletName": "SANDALUWA STORES",
    "ownerName": "S JINAPALA",
    "mobileNumber": "784700800",
    "hotel": "SHANGRI-LA HAMBANTOTA",
    "goldenPass": "0233",
    "originalImage": "https://res.cloudinary.com/dacskh1vb/image/upload/v1749653479/lightx-temp/temp-1749653476850.jpg",
    "isWinner": false,
    "isAttended": false,
    "processedImage": "",
    "archiveOriginalImage": [""],
    "archiveProcessedImage": [""],
    "eventName": "HAMBANTOTA",
    "award": "No",
    "isRegistered": false,
    "waNumber": "",
    "waStatus": false,
    "eventDate": "18TH AUG 2026",
    "restricted": false,
    "createdAt": "2026-08-10T16:11:40.150Z",
    "updatedAt": null
  },
  {
    "loyaltyClub": "MUTHUPALASA",
    "area": "CENTRAL 1",
    "classification": "SUPER PLATINUM",
    "bpCode": "800018",
    "bpName": "800018 : SRI MAHADEWA STORES",
    "outletCode": "T10020070013196",
    "outletName": "NEW WEERARATHNE STORES (PVT) LTD",
    "ownerName": "M.H.S.AHAMED",
    "mobileNumber": "777376523",
    "hotel": "SHANGRI-LA HAMBANTOTA",
    "goldenPass": "0039",
    "originalImage": "https://res.cloudinary.com/dacskh1vb/image/upload/v1749136357/lightx-temp/temp-1749136353968.jpg",
    "isWinner": false,
    "isAttended": false,
    "processedImage": "",
    "archiveOriginalImage": [""],
    "archiveProcessedImage": [""],
    "eventName": "EXCLUSIVE EVENT HAMBANTOTA",
    "award": "No",
    "isRegistered": false,
    "waNumber": "",
    "waStatus": false,
    "eventDate": "17TH AUG 2026",
    "restricted": false,
    "createdAt": "2026-08-10T16:11:40.150Z",
    "updatedAt": null
  },
  {
    "loyaltyClub": "DMART",
    "area": "CENTRAL 2",
    "classification": "PREMIUM",
    "bpCode": "803502",
    "bpName": "803502 : BIBILE TRADING - BADULLA",
    "outletCode": "T10210080013925",
    "outletName": "FRESH SUPER MART",
    "ownerName": "H.M.WIJITHA KUMARA",
    "mobileNumber": "779000024",
    "hotel": "SHANGRI-LA HAMBANTOTA",
    "goldenPass": "0283",
    "originalImage": "https://res.cloudinary.com/vccpsacloud/image/upload/v1755784656/u6hpruczbacjzxq41hie.jpg",
    "isWinner": false,
    "isAttended": false,
    "processedImage": "",
    "archiveOriginalImage": [""],
    "archiveProcessedImage": [""],
    "eventName": "DMART/STAR CLUB - HAMBANTOTA",
    "award": "No",
    "isRegistered": false,
    "waNumber": "",
    "waStatus": false,
    "eventDate": "19TH AUG 2026",
    "restricted": false,
    "createdAt": "2026-08-10T16:11:40.150Z",
    "updatedAt": null
  }
];

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
    
    // Temporarily bypass MongoDB and return mock object if it matches
    const matchedMock = MOCK_OBJECTS.find(obj => obj.goldenPass === targetPass);
    if (matchedMock) {
      return NextResponse.json({ success: true, data: matchedMock });
    }

    return NextResponse.json(
      { error: `Invitation not found for Golden Pass: ${targetPass}` },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Error in mock API:', error);
    return NextResponse.json(
      { error: 'Failed to process request', message: error?.message },
      { status: 500 }
    );
  }
}
