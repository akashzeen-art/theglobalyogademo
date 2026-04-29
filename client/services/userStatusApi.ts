export const checkUserStatus = async (mobile: string, portalId: string) => {
  if (!mobile || mobile === '' || mobile === 'undefined' || mobile === 'null') {
    throw new Error('Invalid mobile number');
  }
  
  const apiUrl = `https://eyoga.live/api/user/status?mobile=${mobile}&id=${portalId}`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Status check failed: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

export const isUserSubscribed = (statusData: any) => {
  return statusData && statusData.active === true;
};

export const getSubscriptionDetails = (statusData: any) => {
  if (!statusData) return null;
  
  return {
    portalName: statusData.portalName,
    mobile: statusData.mobile,
    packType: statusData.packType,
    startDate: statusData.startDate,
    endDate: statusData.endDate,
    active: statusData.active
  };
};
