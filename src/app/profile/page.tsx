'use client';

import React from 'react';
import { useUser } from '@/hooks/login/useUser';

export default function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) return <p>로딩 중...</p>;

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div>
      <h1>프로필 페이지</h1>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}
