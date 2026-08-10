import { Language } from '@/types/flow';

export interface TranslationDictionary {
  appTitle: string;
  selectLanguageTitle: string;
  proceed: string;
  userDetailsTitle: string;
  name: string;
  outletName: string;
  shopCode: string;
  readOnlyBadge: string;
  phoneNumber: string;
  whatsappNumber: string;
  enterWhatsappPlaceholder: string;
  confirmButton: string;
  emergencyContactButton: string;
  emergencyModalTitle: string;
  emergencyModalSubtitle: string;
  phoneRequiredErr: string;
  uploadRequiredErr: string;
  alreadyRegisteredTitle: string;
  alreadyRegisteredSubtitle: string;
  emergencyContactNote: string;
  stepLanguage: string;
  stepDetails: string;
  stepThankYou: string;
  thankYouTitle: string;
  thankYouSubtitle: string;
  joinWhatsappButton: string;
  skipVideo: string;
  uploadPhoto: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appTitle: 'Muthupalasa',
    selectLanguageTitle: 'Select Language',
    proceed: 'Continue',
    userDetailsTitle: 'Outlet Details',
    name: 'Full Name',
    outletName: 'Outlet Name',
    shopCode: 'Outlet Code',
    readOnlyBadge: 'Locked',
    phoneNumber: 'Phone',
    whatsappNumber: 'WhatsApp Number',
    enterWhatsappPlaceholder: 'Enter WhatsApp number (07X XXX XXXX)...',
    confirmButton: 'Confirm',
    emergencyContactButton: 'Emergency Contact',
    emergencyModalTitle: 'Emergency Contacts',
    emergencyModalSubtitle: 'Need urgent assistance? Contact our team directly:',
    phoneRequiredErr: 'Enter a valid 10-digit WhatsApp number starting with 07',
    uploadRequiredErr: 'Please upload an image to continue.',
    alreadyRegisteredTitle: 'Already Registered',
    alreadyRegisteredSubtitle: 'You have already confirmed your invitation for this event. Join our official WhatsApp channel for event updates.',
    emergencyContactNote: 'Emergency Contact For Issues: ',
    stepLanguage: 'Language',
    stepDetails: 'Details',
    stepThankYou: 'Video',
    thankYouTitle: 'Thank You!',
    thankYouSubtitle: 'Thank you for your confirmation. Stay updated by joining our official WhatsApp Channel.',
    joinWhatsappButton: 'Join Our WhatsApp Channel',
    skipVideo: 'Skip',
    uploadPhoto: 'Upload Photo',
  },
  si: {
    appTitle: 'මුතුපලස',
    selectLanguageTitle: 'භාෂාව තෝරන්න',
    proceed: 'ඉදිරියට යන්න',
    userDetailsTitle: 'අවුට්ලෙට් විස්තර',
    name: 'නම',
    outletName: 'කඩයේ නම',
    shopCode: 'අවුට්ලෙට් කේතය',
    readOnlyBadge: 'වෙනස් කළ නොහැක',
    phoneNumber: 'දුරකථනය',
    whatsappNumber: 'WhatsApp අංකය',
    enterWhatsappPlaceholder: 'WhatsApp අංකය ඇතුළත් කරන්න (07X XXX XXXX)...',
    confirmButton: 'තහවුරු කරන්න',
    emergencyContactButton: 'හදිසි ඇමතුම් / Emergency Contact',
    emergencyModalTitle: 'හදිසි ඇමතුම් සේවාව',
    emergencyModalSubtitle: 'ඔබට හදිසි සහයක් අවශ්‍යද? අපගේ කණ්ඩායම අමතන්න:',
    phoneRequiredErr: 'අංක 10කින් යුත් නිවැරදි 07X WhatsApp අංකයක් ඇතුළත් කරන්න',
    uploadRequiredErr: 'ඉදිරියට යාමට කරුණාකර ඡායාරූපයක් එක් කරන්න.',
    alreadyRegisteredTitle: 'දැනටමත් ලියාපදිංචි වී ඇත',
    alreadyRegisteredSubtitle: 'ඔබගේ ආරාධනාව දැනටමත් තහවුරු කර ඇත. උත්සවයේ අලුත්ම තොරතුරු සඳහා අපගේ නිල WhatsApp චැනලයට එකතු වන්න.',
    emergencyContactNote: 'හදිසි සහාය සදහා ඇමතුම් අංකය: ',
    stepLanguage: 'භාෂාව',
    stepDetails: 'විස්තර',
    stepThankYou: 'වීඩියෝව',
    thankYouTitle: 'ස්තූතියි!',
    thankYouSubtitle: 'ඔබගේ තහවුරු කිරීමට ස්තූතියි. අපගේ නිල WhatsApp චැනලයට එකතු වී අලුත්ම තොරතුරු ලබාගන්න.',
    joinWhatsappButton: 'WhatsApp චැනලයට එකතු වන්න',
    skipVideo: 'මගහරින්න',
    uploadPhoto: 'ඡායාරූපයක් එක් කරන්න',
  },
};
