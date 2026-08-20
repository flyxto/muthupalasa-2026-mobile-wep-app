export const getWhatsappChannelUrl = (rawDate?: string): string => {
  const d = (rawDate || '').toString().toLowerCase().trim();

  // 31st / 31th August
  if (d.includes('31')) {
    return 'https://whatsapp.com/channel/0029VbDIyaN2kNFjmkW7GL0C';
  }

  // 1st September
  if (
    (d.includes('sep') || d.includes('september')) &&
    (/\b0?1(st)?\b/.test(d) || d.includes('1st') || d.includes('01st'))
  ) {
    return 'https://whatsapp.com/channel/0029VbD5H0d30LKGYWoFHa3X';
  }

  // 2nd September
  if (
    (d.includes('sep') || d.includes('september')) &&
    (/\b0?2(nd)?\b/.test(d) || d.includes('2nd') || d.includes('02nd'))
  ) {
    return 'https://whatsapp.com/channel/0029VbCwMYMHbFV5uFQEVv2e';
  }

  // 3rd September
  if (
    (d.includes('sep') || d.includes('september')) &&
    (/\b0?3(rd)?\b/.test(d) || d.includes('3rd') || d.includes('03rd'))
  ) {
    return 'https://whatsapp.com/channel/0029VbDMQKK84Om5PdO1Ku1S';
  }

  // 18th August
  if (d.includes('18')) {
    return 'https://whatsapp.com/channel/0029Vb8TLg64Y9lnaNUMjk1X';
  }

  // 19th August
  if (d.includes('19')) {
    return 'https://whatsapp.com/channel/0029Vb8vLzt8PgsNVNIjDn0E';
  }

  // Default to 17th August channel link
  return 'https://whatsapp.com/channel/0029VbDN1vP545v0dbfeP00I';
};

export const formatDisplayDate = (rawDateStr?: string): string => {
  const raw = (rawDateStr || '').toString().trim();
  const lower = raw.toLowerCase();

  if (lower.includes('31')) {
    return '31st August 2026';
  }
  if (
    (lower.includes('sep') || lower.includes('september')) &&
    (/\b0?1(st)?\b/.test(lower) || lower.includes('1st') || lower.includes('01st'))
  ) {
    return '1st September 2026';
  }
  if (
    (lower.includes('sep') || lower.includes('september')) &&
    (/\b0?2(nd)?\b/.test(lower) || lower.includes('2nd') || lower.includes('02nd'))
  ) {
    return '2nd September 2026';
  }
  if (
    (lower.includes('sep') || lower.includes('september')) &&
    (/\b0?3(rd)?\b/.test(lower) || lower.includes('3rd') || lower.includes('03rd'))
  ) {
    return '3rd September 2026';
  }
  if (lower.includes('17')) {
    return '17th August 2026';
  }
  if (lower.includes('18')) {
    return '18th August 2026';
  }
  if (lower.includes('19')) {
    return '19th August 2026';
  }

  return raw || '17th August 2026';
};


