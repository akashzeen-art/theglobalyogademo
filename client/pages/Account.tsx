import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import SubscriptionModal from "@/components/SubscriptionModal";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { usePreserveParams } from "@/hooks/usePreserveParams";
import { getMobileForVerification, getPortalIdForVerification } from "@/utils/accessControlGuard";
import { checkUserStatus, getSubscriptionDetails } from "@/services/userStatusApi";
import { User, LogIn, CheckCircle, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Account() {
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isPopupOpen, closePopup, handleSubscribe } = useSubscription();
  const [showModal, setShowModal] = useState(false);
  const queryParams = usePreserveParams();

  useEffect(() => {
    const mobile = getMobileForVerification();
    const portalId = getPortalIdForVerification();
    
    if (mobile && portalId) {
      checkUserStatus(mobile, portalId)
        .then(statusData => {
          if (statusData.active) {
            setSubscriptionData(getSubscriptionDetails(statusData));
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleSignIn = () => {
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-yoga-cream">
        <VideoBackground />
        <div className="relative z-20 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen bg-yoga-cream">
      <VideoBackground />
      <SubscriptionModal 
        isOpen={showModal || isPopupOpen} 
        onClose={() => { setShowModal(false); closePopup(); }} 
        onSubscribe={handleSubscribe} 
      />

      <div className="relative z-20">
        <Navbar />

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                My <span className="text-purple-500">Account</span>
              </h1>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 sm:p-12 space-y-6 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <User className="w-12 h-12 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">Dashboard</h2>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                {subscriptionData ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-green-400 mb-4">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-xl font-semibold">Active Subscription</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/90">
                        <User className="w-5 h-5 text-purple-400" />
                        <span>Mobile: {subscriptionData.mobile}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-white/90">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                        <span>Plan: {subscriptionData.packType}</span>
                      </div>
                      
                      {subscriptionData.startDate && (
                        <div className="flex items-center gap-3 text-white/90">
                          <Calendar className="w-5 h-5 text-purple-400" />
                          <span>Start: {new Date(subscriptionData.startDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {subscriptionData.endDate && (
                        <div className="flex items-center gap-3 text-white/90">
                          <Calendar className="w-5 h-5 text-purple-400" />
                          <span>End: {new Date(subscriptionData.endDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xl text-white/90 mb-6">Mobile number not found.</p>
                    
                    <button 
                      onClick={handleSignIn}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                    >
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </button>
                  </>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-white/70 text-center">
                  Don't have an account? Sign in to access your dashboard and manage your subscription.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/20 bg-white/10 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center text-white text-sm">
            <p className="mb-2">&copy; 2025, Alphamovil All Rights Reserved</p>
            <div className="flex gap-2 justify-center">
              <Link to={`/terms${queryParams}`} className="hover:text-white/80">Terms of Services</Link>
              <span>|</span>
              <Link to={`/refund${queryParams}`} className="hover:text-white/80">Refund Policy</Link>
              <span>|</span>
              <Link to={`/privacy${queryParams}`} className="hover:text-white/80">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
