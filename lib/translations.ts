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
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appTitle: 'Muthupalasa',
    selectLanguageTitle: 'Select Language',
    proceed: 'Continue',
    userDetailsTitle: 'Outlet Details',
    name: 'Full Name',
    outletName: 'Outlet Name',
    shopCode: 'Shop Code',
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
  },
  si: {
    appTitle: 'මුතුපලස',
    selectLanguageTitle: 'භාෂාව තෝරන්න',
    proceed: 'ඉදිරියට යන්න',
    userDetailsTitle: 'අවුට්ලෙට් විස්තර',
    name: 'නම',
    outletName: 'කඩයේ නම',
    shopCode: 'කඩයේ කේතය',
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
  },
};
