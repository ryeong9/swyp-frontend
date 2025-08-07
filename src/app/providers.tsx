'use client';

import { ReactNode, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query-client';
import useAuthStore from '@/stores/useAuthStore';
import EntryAuthModal from '@/components/mainPage/entryAuthModal';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: ReactNode }) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {!isLogin && !isAuthPage && <EntryAuthModal />}
    </QueryClientProvider>
  );
}
