// src/app/test/page.tsx
'use client';

import { useNicknameCheck } from '@/hooks/signup/useNicknameCheck';

export default function TestPage() {
  const { data, isLoading } = useNicknameCheck('test', true);
  return (
    <div>
      <h1>Test</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Loading: {isLoading.toString()}</p>
    </div>
  );
}
