'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuth2Page() {
  const router = useRouter();

  // accessToken 추출 및 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#', ''));
      const accessToken = params.get('accessToken');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        router.push('/');
      } else {
        console.error('No access token found in URL');
        router.replace('/login');
      }
    }
  }, [router]);

  return <div>로그인 중입니다...</div>;
}
