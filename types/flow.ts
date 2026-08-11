export type Language = 'en' | 'si';

export type FlowStep = 'language' | 'details' | 'video' | 'thankyou';

export type ClubType = 'mp' | 'dmart' | 'starclub';

export interface InvitationDocument {
  _id?: any;
  loyaltyClub?: string;
  area?: string;
  classification?: string;
  bpCode?: string;
  bpName?: string;
  outletCode?: string;
  outletName?: string;
  ownerName?: string;
  mobileNumber?: string;
  hotel?: string;
  goldenPass?: string;
  originalImage?: string;
  isWinner?: boolean;
  isAttended?: boolean;
  processedImage?: string;
  archiveOriginalImage?: string[];
  archiveProcessedImage?: string[];
  eventName?: string;
  award?: string;
  isRegistered?: boolean;
  waNumber?: string;
  waStatus?: boolean;
  eventDate?: string;
  restricted?: boolean;
  createdAt?: string;
  updatedAt?: string | null;
  rawImage?: string;
  [key: string]: any;
}

export interface UserProfile {
  name: string;
  outletName: string;
  code: string; // Shop code / ID - strictly read-only!
  photo: string;
  phoneNumber: string; // Original registered phone number from DB
  whatsappNumber: string; // User entered/confirmed WhatsApp number
  goldenPass?: string;
  rawInvitation?: InvitationDocument;
}
