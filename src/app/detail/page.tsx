import { Suspense } from 'react';
import DetailPage from '@/components/detail/detailPage';

export default function Page({ searchParams }: any) {
  const isbn = typeof searchParams?.isbn === 'string' ? searchParams.isbn : '';
  if (!isbn || typeof isbn !== 'string') return <div>잘못된 접근입니다.</div>;

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <DetailPage isbn={isbn} />
    </Suspense>
  );
}
