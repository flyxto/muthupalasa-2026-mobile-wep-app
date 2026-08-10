export type Language = 'en' | 'si';

export type FlowStep = 'language' | 'details' | 'video' | 'thankyou';

export type ClubType = 'mp' | 'dmart' | 'starclub';

export interface InvitationDocument {
  _id?: string;
  "LOYALTY CLUB"?: string;
  "AREA"?: string;
  "CLASSIFICATION"?: string;
  "BP Code"?: string;
  "BP Name"?: string;
  "Outlet Code"?: string;
  "OUTLET NAME"?: string;
  "OWNER'S NAME"?: string;
  "MOBILE NUMBER"?: string;
  "EXCLUSIVE EVEN CONFIRMATION"?: string;
  "REMARKS"?: string;
  "LEN"?: string;
  "EVENT LOCATION"?: string;
  "HOTEL"?: string;
  "DATE"?: string;
  "GOLDEN PASS"?: string;
  "image url"?: string;
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
