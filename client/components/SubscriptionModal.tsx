import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { getPortalIdFromUrl, getOrGenerateClickId } from "../utils/clickIdManager";
import { fetchPricingData, parsePricingForUI } from "../services/pricingApi";
import { checkUserStatus, isUserSubscribed } from "../services/userStatusApi";
import { initiatePayment, getPackTypeFromPlan, getPriceForPlan } from "../services/paymentApi";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (data: any) => void;
}

export default function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pricingData, setPricingData] = useState<any>(null);
  const [portalId, setPortalId] = useState<string>('');
  const [clickId, setClickId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setMobileNumber('');
      setError('');
      setLoading(false);
      
      const currentPortalId = getPortalIdFromUrl() || '15';
      const currentClickId = getOrGenerateClickId(currentPortalId);
      
      setPortalId(currentPortalId);
      setClickId(currentClickId);
      
      loadPricingData(currentPortalId, currentClickId);
    }
  }, [isOpen]);
  
  const loadPricingData = async (portalId: string, clickId: string) => {
    setLoading(true);
    setError('');
    
    try {
      const apiData = await fetchPricingData(portalId, clickId);
      const parsedData = parsePricingForUI(apiData);
      setPricingData(parsedData);
      const firstPlan = Object.keys(parsedData.plans)[0];
      if (firstPlan) setSelectedPlan(firstPlan);
    } catch (error) {
      const fallbackData = {
        portalId: parseInt(portalId),
        currencyCode: 'INR',
        plans: {
          weekly: { discountedPrice: 65, originalPrice: 130, discount: '50% OFF' },
          monthly: { discountedPrice: 75, originalPrice: 125, discount: '60% OFF' }
        }
      };
      setPricingData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
    setError('');
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    try {
      setLoading(true);
      const statusData = await checkUserStatus(mobileNumber, portalId);
      
      if (isUserSubscribed(statusData)) {
        localStorage.setItem('isSubscribed', 'true');
        localStorage.setItem('subscriptionData', JSON.stringify({ ...statusData, mobile: mobileNumber }));
        onSubscribe(statusData);
        return;
      }
    } catch (error) {
      console.log('Status check failed, continuing with subscription');
    } finally {
      setLoading(false);
    }
    
    setStep(2);
  };

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      setError('Please select a subscription plan');
      return;
    }
    
    if (!portalId || !clickId || !mobileNumber || !pricingData) {
      setError('Missing required information. Please try again.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const packType = pricingData.plans[selectedPlan]?.packType || selectedPlan.toUpperCase();
    const price = pricingData.plans[selectedPlan]?.discountedPrice;
    
    console.log('Payment initiation:', { portalId, clickId, mobile: mobileNumber, packType, price });
    
    const orderData = {
      portalId: portalId,
      clickId: clickId,
      mobile: mobileNumber,
      packType: packType,
      price: price
    };
    
    localStorage.setItem('isSubscribed', 'true');
    localStorage.setItem('subscriptionData', JSON.stringify({ 
      active: true, 
      mobile: mobileNumber,
      plan: selectedPlan,
      price: price
    }));
    
    initiatePayment(orderData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {step === 1 && (
          <form onSubmit={handleInitialSubmit}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Mobile Number</h3>
            
            <div className="mb-6">
              <input
                type="tel"
                id="mobileInput"
                placeholder="Enter your phone number"
                value={mobileNumber}
                onChange={handleMobileChange}
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                autoFocus
                disabled={loading}
              />
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Subscribe Now'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePlanSubmit}>
            <div className="text-center mb-4 text-gray-600">Mobile: {mobileNumber}</div>

            {pricingData?.plans && Object.entries(pricingData.plans).map(([planKey, plan]: [string, any]) => (
              <label key={planKey} className="block mb-4 p-4 border-2 rounded-lg cursor-pointer hover:border-purple-500 transition-colors" style={{ borderColor: selectedPlan === planKey ? '#7c3aed' : '' }}>
                <input
                  type="radio"
                  name="plan"
                  value={planKey}
                  checked={selectedPlan === planKey}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  disabled={loading}
                  className="mr-3"
                />
                <span className="font-semibold capitalize">{planKey}</span>
                <span className="ml-2">₹{plan.discountedPrice}</span>
                <span className="ml-2 line-through text-gray-400">₹{plan.originalPrice}</span>
                <span className="ml-2 text-green-600">{plan.discount}</span>
                <div className="text-sm text-gray-600 mt-1">Unlimited Videos & Web Series</div>
              </label>
            ))}

            <button
              type="submit"
              disabled={loading || !pricingData}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
