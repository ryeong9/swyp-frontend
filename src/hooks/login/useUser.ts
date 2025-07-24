import { useState, useEffect } from 'react';
import { authInstance } from '@/lib/axios';

type User = {
  name: string;
  email: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authInstance.get('/api/user/me');

        setUser(res.data);
        console.log('유저 정보:', res.data);
      } catch (err) {
        console.error('유저 정보를 불러오지 못했습니다', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
export default useUser;
