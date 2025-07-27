'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/login/useUser';

export default function OAuth2Page() {
  const router = useRouter();
  const [tokenReady, setTokenReady] = useState(false);
  // accessToken 추출 및 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#', ''));
      const accessToken = params.get('accessToken');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setTokenReady(true);
      } else {
        console.error('No access token found in URL');
        router.replace('/login');
      }
    }
  }, [router]);

  // 2. accessToken 저장 이후에만 useUser 호출
  const { user, loading } = useUser(tokenReady);

  // 3. 유저 정보를 받아오면 홈으로 이동
  useEffect(() => {
    if (!tokenReady || loading) return;

    if (user) {
      router.replace('/');
    } else {
      router.replace('/login');
    }
  }, [tokenReady, loading, user, router]);

  return <div>로그인 중입니다...</div>;
}
