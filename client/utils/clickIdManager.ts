const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const generateClickId = () => `0000${generateUUID()}`;

export const validateClickId = (clickId: string | null) => {
  if (!clickId || clickId === 'null' || clickId === 'undefined' || clickId === 'NaN' || clickId === '') {
    return false;
  }
  return true;
};

export const getOrGenerateClickId = (portalId: string) => {
  const storageKey = `eatme_clickid_${portalId}`;
  const storedClickId = localStorage.getItem(storageKey);
  if (storedClickId && validateClickId(storedClickId)) {
    return storedClickId;
  }
  const newClickId = generateClickId();
  localStorage.setItem(storageKey, newClickId);
  return newClickId;
};

export const getClickIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('clickid');
};

export const getPortalIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id') || localStorage.getItem('portalId') || '15';
};

export const getMsisdnFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('msisdn');
};

export const updateUrlWithClickId = (clickId: string, portalId: string) => {
  // clickid and id are stored in localStorage only — not shown in URL
  const url = new URL(window.location.href);
  const existingMsisdn = url.searchParams.get('msisdn');
  url.searchParams.delete('clickid');
  url.searchParams.delete('id');
  if (existingMsisdn) {
    url.searchParams.set('msisdn', existingMsisdn);
  }
  window.history.replaceState({}, '', url.toString());
};

export const initializeClickId = () => {
  const url = new URL(window.location.href);
  const portalId = url.searchParams.get('id') || '15';
  const clickId = url.searchParams.get('clickid');
  const msisdn = url.searchParams.get('msisdn');

  // Strip clickid and id from URL immediately, keep only msisdn if present
  url.searchParams.delete('clickid');
  url.searchParams.delete('id');
  const cleanUrl = msisdn
    ? `${url.pathname}?msisdn=${msisdn}`
    : url.pathname;
  window.history.replaceState({}, '', cleanUrl);

  if (validateClickId(clickId)) {
    const storageKey = `eatme_clickid_${portalId}`;
    localStorage.setItem(storageKey, clickId!);
    localStorage.setItem('portalId', portalId);
    return { clickId: clickId!, portalId };
  }

  const storageKey = `eatme_clickid_${portalId}`;
  const storedClickId = localStorage.getItem(storageKey);
  if (validateClickId(storedClickId)) {
    localStorage.setItem('portalId', portalId);
    return { clickId: storedClickId!, portalId };
  }

  const newClickId = generateClickId();
  localStorage.setItem(storageKey, newClickId);
  localStorage.setItem('portalId', portalId);
  return { clickId: newClickId, portalId };
};
