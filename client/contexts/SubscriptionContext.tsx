import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAccessWithAPI, getMobileForVerification, getPortalIdForVerification, clearSubscriptionCache } from '../utils/accessControlGuard';
import { handleLoginSuccess } from '../utils/loginSuccessHandler';

interface SubscriptionContextType {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  checkAndPlayVideo: (videoData: any, event?: any) => Promise<void>;
  handleSubscribe: (subscriptionData: any) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pendingVideo, setPendingVideo] = useState<any>(null);
  const navigate = useNavigate();
  const clickSent = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        clearSubscriptionCache();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (clickSent.current) return;
    
    if (window.location.pathname === '/checkout') return;
    
    const portalId = new URLSearchParams(window.location.search).get('id') || localStorage.getItem('portalId') || '15';
    let clickId = new URLSearchParams(window.location.search).get('clickid');
    
    if (!clickId) return;
    
    const callKey = `${clickId}-${portalId}`;
    if ((window as any)._apiCallTracker && (window as any)._apiCallTracker[callKey]) {
      return;
    }
    
    if (!(window as any)._apiCallTracker) (window as any)._apiCallTracker = {};
    (window as any)._apiCallTracker[callKey] = true;
    
    clickSent.current = true;
    
    const trackingUrl = `https://eyoga.live/api/payment/portal/${portalId}?clickid=${clickId}`;
    
    fetch(trackingUrl)
      .then(response => response.text())
      .catch(error => console.log('Backend error:', error));
  }, []);

  const getVideoUrl = (videoData: any) => {
    const videoUrl = typeof videoData === 'object' && videoData?.url ? videoData.url : videoData;
    const videoTitle = typeof videoData === 'object' && videoData?.title ? videoData.title : '';
    const videoDescription = typeof videoData === 'object' && videoData?.description ? videoData.description : '';
    
    const params = new URLSearchParams({
      url: videoUrl
    });
    if (videoTitle) params.append('title', videoTitle);
    if (videoDescription) params.append('description', videoDescription);
    
    return `/watch?${params.toString()}`;
  };

  const checkAndPlayVideo = async (videoData: any, event?: any) => {
    if (event) {
      const heroSection = event.target.closest('.hero-section, .home-slider, .bg-img-hero');
      if (heroSection) {
        return;
      }
    }
    
    const mobile = getMobileForVerification();
    const portalId = getPortalIdForVerification();
    
    if (!mobile) {
      setPendingVideo(videoData);
      setIsPopupOpen(true);
      return;
    }
    
    const hasAccess = await verifyAccessWithAPI(mobile, portalId);
    
    if (hasAccess) {
      const videoPath = getVideoUrl(videoData);
      navigate(videoPath);
    } else {
      clearSubscriptionCache();
      setPendingVideo(videoData);
      setIsPopupOpen(true);
    }
  };

  const handleSubscribe = async (subscriptionData: any) => {
    if (subscriptionData && subscriptionData.mobile) {
      const portalId = getPortalIdForVerification();
      
      const wasRedirected = await handleLoginSuccess(subscriptionData.mobile, portalId);
      
      if (!wasRedirected && pendingVideo) {
        const videoPath = getVideoUrl(pendingVideo);
        navigate(videoPath);
      }
    } else if (pendingVideo) {
      const videoPath = getVideoUrl(pendingVideo);
      navigate(videoPath);
    }
    
    setPendingVideo(null);
    setIsPopupOpen(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPendingVideo(null);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isPopupOpen,
        openPopup: () => setIsPopupOpen(true),
        closePopup,
        checkAndPlayVideo,
        handleSubscribe
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
