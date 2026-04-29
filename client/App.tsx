import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { initializeClickId, getMsisdnFromUrl } from "./utils/clickIdManager";
import { handleLoggedInUserPageLoad } from "./utils/loginSuccessHandler";
import { checkUserStatus, isUserSubscribed } from "./services/userStatusApi";
import Index from "./pages/Index";
import Classes from "./pages/Classes";
import Styles from "./pages/Styles";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Account from "./pages/Account";
import Watch from "./pages/Watch";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

function AppContent() {
  useEffect(() => {
    const { clickId, portalId } = initializeClickId();
    
    const msisdn = getMsisdnFromUrl();
    
    if (msisdn && portalId) {
      checkUserStatus(msisdn, portalId)
        .then(statusData => {
          if (isUserSubscribed(statusData)) {
            localStorage.setItem('isSubscribed', 'true');
            localStorage.setItem('userMobile', msisdn);
            localStorage.setItem('subscriptionData', JSON.stringify(statusData));
          } else {
            localStorage.removeItem('isSubscribed');
            localStorage.removeItem('userMobile');
            localStorage.removeItem('subscriptionData');
          }
        })
        .catch(() => {
          localStorage.removeItem('isSubscribed');
          localStorage.removeItem('userMobile');
          localStorage.removeItem('subscriptionData');
        });
    } else {
      handleLoggedInUserPageLoad().then((wasRedirected) => {
        if (!wasRedirected) {
          const storedMobile = localStorage.getItem('userMobile');
          if (storedMobile && portalId) {
            checkUserStatus(storedMobile, portalId)
              .catch(() => {});
          }
        }
      });
    }
    
    localStorage.removeItem(`eatme_product_cache_${portalId}`);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/styles" element={<Styles />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/account" element={<Account />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Index />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <SubscriptionProvider>
            <AppContent />
          </SubscriptionProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
