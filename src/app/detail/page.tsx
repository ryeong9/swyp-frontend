import { Suspense } from 'react';
import DetailPage from '@/components/detail/detailPage';

export default function Page({ searchParams }: { searchParams: { isbn?: string } }) {
  const isbn = searchParams.isbn;

  if (!isbn) return <div>잘못된 접근입니다.</div>;

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <DetailPage isbn={isbn} />
    </Suspense>
  );
}
