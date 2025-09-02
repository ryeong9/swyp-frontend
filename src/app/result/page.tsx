import ResultSearchPage from '@/components/search/resultSearchPage';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const keyword = typeof params.keyword === 'string' ? params.keyword : '';
  const type = typeof params.type === 'string' ? params.type : 'title';

  return (
    <ResultSearchPage
      keyword={keyword}
      type={type}
    />
  );
}
