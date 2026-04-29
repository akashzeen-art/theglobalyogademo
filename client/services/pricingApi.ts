export const fetchPricingData = async (portalId: string, clickId: string) => {
  const apiUrl = `https://eyoga.live/api/payment/portal/${portalId}?clickid=${clickId}`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

export const parsePricingForUI = (apiData: any) => {
  const { multiplePackType } = apiData;
  const plans: any = {};

  if (multiplePackType && typeof multiplePackType === 'object') {
    Object.entries(multiplePackType).forEach(([key, val]) => {
      const planKey = key.toLowerCase();
      const discountedPrice = parseInt(val as string);
      plans[planKey] = {
        packType: key,
        discountedPrice,
        originalPrice: Math.round(discountedPrice / 0.5),
        discount: '50% OFF'
      };
    });
  }

  return {
    portalId: apiData.portalId,
    currencyCode: apiData.currencyCode || 'INR',
    plans
  };
};
