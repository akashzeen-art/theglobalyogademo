import { checkUserStatus, isUserSubscribed } from '../services/userStatusApi';

export const handleLoginSuccess = async (mobile: string, portalId: string = '15') => {
  if (!mobile || mobile.trim() === '') {
    return false;
  }

  const cleanMobile = mobile.trim();

  try {
    const statusData = await checkUserStatus(cleanMobile, portalId);
    const isActive = isUserSubscribed(statusData);
    
    if (isActive) {
      const newUrl = `${window.location.origin}/?msisdn=${cleanMobile}&id=${portalId}`;
      
      localStorage.setItem('isSubscribed', 'true');
      localStorage.setItem('userMobile', cleanMobile);
      localStorage.setItem('subscriptionData', JSON.stringify(statusData));
      
      window.location.replace(newUrl);
      return true;
    } else {
      localStorage.removeItem('isSubscribed');
      localStorage.removeItem('subscriptionData');
      localStorage.setItem('userMobile', cleanMobile);
      return false;
    }
  } catch (error) {
    localStorage.removeItem('isSubscribed');
    localStorage.removeItem('subscriptionData');
    localStorage.setItem('userMobile', cleanMobile);
    return false;
  }
};

export const handleLoggedInUserPageLoad = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const hasClickId = urlParams.has('clickid');
  const hasMsisdn = urlParams.has('msisdn');
  
  if (!hasClickId || hasMsisdn) {
    return false;
  }
  
  const storedMobile = localStorage.getItem('userMobile');
  if (!storedMobile) {
    return false;
  }
  
  const portalId = urlParams.get('id') || localStorage.getItem('portalId') || '15';
  
  try {
    const statusData = await checkUserStatus(storedMobile, portalId);
    const isActive = isUserSubscribed(statusData);
    
    if (isActive) {
      const newUrl = `${window.location.origin}/?msisdn=${storedMobile}&id=${portalId}`;
      
      localStorage.setItem('isSubscribed', 'true');
      localStorage.setItem('subscriptionData', JSON.stringify(statusData));
      
      window.location.replace(newUrl);
      return true;
    } else {
      localStorage.removeItem('isSubscribed');
      localStorage.removeItem('subscriptionData');
      return false;
    }
  } catch (error) {
    return false;
  }
};
