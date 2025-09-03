import { Suspense } from 'react';
import DetailPage from '@/components/detail/detailPage';
import Spinner from '@/components/spinner/page';

export default async function Page({ searchParams }: any) {
  const params = await searchParams;
  const isbn = typeof params?.isbn === 'string' ? params.isbn : '';

  if (!isbn) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <Suspense fallback={<Spinner size='lg' />}>
      <DetailPage isbn={isbn} />
    </Suspense>
  );
}
