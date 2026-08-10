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
  enterPhonePlaceholder: string;
  confirmButton: string;
  editDetailsButton: string;
  editModalTitle: string;
  editPhotoLabel: string;
  saveChanges: string;
  cancel: string;
  phoneRequiredErr: string;
  stepLanguage: string;
  stepDetails: string;
  stepThankYou: string;
  thankYouTitle: string;
  thankYouSubtitle: string;
  joinWhatsappButton: string;
  skipVideo: string;
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
    phoneNumber: 'Phone Number',
    enterPhonePlaceholder: '07X XXX XXXX',
    confirmButton: 'Confirm',
    editDetailsButton: 'Edit Details',
    editModalTitle: 'Edit Details',
    editPhotoLabel: 'Photo',
    saveChanges: 'Save',
    cancel: 'Cancel',
    phoneRequiredErr: 'Enter a valid phone number',
    stepLanguage: 'Language',
    stepDetails: 'Details',
    stepThankYou: 'Video',
    thankYouTitle: 'Thank You!',
    thankYouSubtitle: 'Thank you for your confirmation. Stay updated by joining our official WhatsApp Channel.',
    joinWhatsappButton: 'Join Our WhatsApp Channel',
    skipVideo: 'Skip',
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
    phoneNumber: 'දුරකථන අංකය',
    enterPhonePlaceholder: '07X XXX XXXX',
    confirmButton: 'තහවුරු කරන්න',
    editDetailsButton: 'විස්තර සංස්කරණය',
    editModalTitle: 'විස්තර සංස්කරණය',
    editPhotoLabel: 'ඡායාරූපය',
    saveChanges: 'සුරකින්න',
    cancel: 'අවලංගු කරන්න',
    phoneRequiredErr: 'දුරකථන අංකය ඇතුළත් කරන්න',
    stepLanguage: 'භාෂාව',
    stepDetails: 'විස්තර',
    stepThankYou: 'වීඩියෝව',
    thankYouTitle: 'ස්තූතියි!',
    thankYouSubtitle: 'ඔබගේ තහවුරු කිරීමට ස්තූතියි. අපගේ නිල WhatsApp චැනලයට එකතු වී අලුත්ම තොරතුරු ලබාගන්න.',
    joinWhatsappButton: 'Join Our WhatsApp Channel',
    skipVideo: 'මගහරින්න',
  },
};
