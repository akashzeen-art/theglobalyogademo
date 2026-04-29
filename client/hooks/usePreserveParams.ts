import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const usePreserveParams = () => {
  const location = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(location.search);
    const clickid = params.get('clickid');
    const id = params.get('id');
    const msisdn = params.get('msisdn');
    
    const query = new URLSearchParams();
    if (clickid) query.set('clickid', clickid);
    if (id) query.set('id', id);
    if (msisdn) query.set('msisdn', msisdn);
    
    const queryString = query.toString();
    return queryString ? `?${queryString}` : '';
  }, [location.search]);
};
