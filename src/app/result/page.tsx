import ResultSearchPage from '@/components/search/resultSearchPage';

export default function ResultPage({
  searchParams,
}: {
  searchParams: { keyword?: string; type?: string };
}) {
  return (
    <ResultSearchPage
      keyword={searchParams.keyword || ''}
      type={searchParams.type || 'title'}
    />
  );
}
