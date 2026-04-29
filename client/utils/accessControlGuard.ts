import { checkUserStatus, isUserSubscribed } from '../services/userStatusApi';

export const verifyAccessWithAPI = async (mobile: string, portalId: string) => {
  if (!mobile || mobile.trim() === '' || mobile === 'undefined' || mobile === 'null') {
    return false;
  }
  
  if (!portalId) {
    return false;
  }

  try {
    const statusData = await checkUserStatus(mobile, portalId);
    const isActive = isUserSubscribed(statusData);
    
    if (isActive) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const clearSubscriptionCache = () => {
  localStorage.removeItem('isSubscribed');
  localStorage.removeItem('subscriptionData');
};

export const getMobileForVerification = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const msisdn = urlParams.get('msisdn');
  
  if (msisdn && msisdn.trim() !== '' && msisdn !== 'undefined' && msisdn !== 'null') {
    const cleanMobile = msisdn.trim();
    localStorage.setItem('userMobile', cleanMobile);
    return cleanMobile;
  }
  
  const storedMobile = localStorage.getItem('userMobile');
  if (storedMobile && storedMobile.trim() !== '' && storedMobile !== 'undefined' && storedMobile !== 'null') {
    return storedMobile.trim();
  }
  
  return null;
};

export const getPortalIdForVerification = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id') || localStorage.getItem('portalId') || '15';
};
