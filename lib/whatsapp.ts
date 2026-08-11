export const getWhatsappChannelUrl = (rawDate?: string): string => {
  const d = (rawDate || '').toString().toLowerCase().trim();
  if (d.includes('18')) {
    return 'https://whatsapp.com/channel/0029Vb8TLg64Y9lnaNUMjk1X';
  }
  if (d.includes('19')) {
    return 'https://whatsapp.com/channel/0029Vb8vLzt8PgsNVNIjDn0E';
  }
  // Default to 17th August channel link
  return 'https://whatsapp.com/channel/0029VbDN1vP545v0dbfeP00I';
};
