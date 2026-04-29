import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPortalIdFromUrl, getOrGenerateClickId } from "@/utils/clickIdManager";
import { fetchPricingData } from "@/services/pricingApi";
import { checkUserStatus, isUserSubscribed } from "@/services/userStatusApi";
import { initiatePayment } from "@/services/paymentApi";

export default function Checkout() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [servicePack, setServicePack] = useState<string | null>(null);
  const [packOptions, setPackOptions] = useState<{ key: string; price: number }[]>([]);
  const [portalId, setPortalId] = useState("");
  const [clickId, setClickId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentPortalId = getPortalIdFromUrl() || "15";
    const currentClickId = getOrGenerateClickId(currentPortalId);
    
    setPortalId(currentPortalId);
    setClickId(currentClickId);
    
    fetchPricingData(currentPortalId, currentClickId)
      .then((config) => {
        const hasValidPackType = config?.multiplePackType && 
          typeof config.multiplePackType === "object" && 
          Object.keys(config.multiplePackType).length > 0;
        
        if (hasValidPackType) {
          const packKeys = Object.keys(config.multiplePackType);
          const options = packKeys.map((key) => ({ key, price: parseInt(config.multiplePackType[key]) }));
          setPackOptions(options);
          setServicePack(options[0].key);
          setPrice(options[0].price);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (price === null) {
      alert("Price information is not available. Please try again later.");
      return;
    }
    
    if (!mobile || mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    
    try {
      const statusData = await checkUserStatus(mobile, portalId);
      
      if (isUserSubscribed(statusData)) {
        alert("You are already subscribed! Redirecting to main portal...");
        const redirectUrl = `${window.location.origin}/?msisdn=${mobile}&id=${portalId}`;
        window.location.href = redirectUrl;
        return;
      }
    } catch (error) {
      console.warn("Status check failed - proceeding with payment");
    }
    
    setLoading(false);

    const orderData = {
      portalId: portalId,
      mobile: mobile,
      clickId: clickId,
      packType: servicePack || "DAILY",
      price: price
    };

    initiatePayment(orderData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Checkout</h2>
          <p className="text-2xl font-semibold text-purple-400">TheYogaStudio</p>
        </div>

        <div className="text-center mb-6">
          <img 
            src="/logo.png" 
            alt="Product" 
            className="w-32 h-32 mx-auto object-contain rounded-lg"
          />
        </div>

        {packOptions.length > 1 && (
          <div className="flex gap-3 mb-6">
            {packOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => { setServicePack(opt.key); setPrice(opt.price); }}
                className={`flex-1 py-3 rounded-lg border font-semibold transition-all ${
                  servicePack === opt.key
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-white/10 border-white/20 text-white/70 hover:border-purple-400"
                }`}
              >
                <div>{opt.key}</div>
                <div className="text-lg">₹{opt.price}</div>
              </button>
            ))}
          </div>
        )}

        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-6">
          <p className="text-white text-center">
            <strong className="text-purple-400">Proceed</strong> to complete the payment of{" "}
            {price !== null && servicePack ? (
              <strong className="text-purple-400">Rs.{price} ({servicePack})</strong>
            ) : (
              <strong className="text-gray-400">Loading...</strong>
            )} for your order.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setMobile(value);
                setError("");
              }}
              placeholder="Enter your mobile number"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              maxLength={10}
            />
            {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
          </div>

          <button
            type="submit"
            disabled={loading || price === null}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Complete Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
