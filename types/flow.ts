export type Language = 'en' | 'si' | 'ta';

export type FlowStep = 'language' | 'details' | 'video';

export interface UserProfile {
  name: string;
  outletName: string;
  code: string; // Shop code / ID - strictly read-only!
  photo: string;
  phoneNumber: string;
}
