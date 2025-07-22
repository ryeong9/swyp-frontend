'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuth2SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash; // #accessToken=xxxxx
      const params = new URLSearchParams(hash.replace('#', '')); // 해시 제거
      const accessToken = params.get('accessToken');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        router.replace('/'); // 원하는 페이지로 리다이렉트
      } else {
        console.error('No access token found in URL');
        router.replace('/login');
      }
    }
  }, []);

  return <div>로그인 중입니다...</div>;
}
