export type Language = 'en' | 'si';

export type FlowStep = 'language' | 'details' | 'video' | 'thankyou';

export interface UserProfile {
  name: string;
  outletName: string;
  code: string; // Shop code / ID - strictly read-only!
  photo: string;
  phoneNumber: string;
}
