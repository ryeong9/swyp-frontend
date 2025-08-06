// src/app/result/page.tsx
import ResultSearchPage from '@/components/search/resultSearchPage';
import { Suspense } from 'react';

export default function Page({ searchParams }: any) {
  const keyword = typeof searchParams?.keyword === 'string' ? searchParams.keyword : '';
  const type = typeof searchParams?.type === 'string' ? searchParams.type : 'title';

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ResultSearchPage
        keyword={keyword}
        type={type}
      />
    </Suspense>
  );
}
