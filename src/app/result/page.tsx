'use client';

import Image from 'next/image';
import { useInfiniteTitleSearch } from '@/hooks/search/useInfinite';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { TitleSearch } from '@/types';
import Header from '@/components/header/header';

export default function ResultSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteTitleSearch(keyword);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div>로딩 중....</div>;
  if (isError) return <div>오류 발생: {error?.message}</div>;

  const rawBooks = data?.pages.flatMap((page) => page.books || []) || [];
  const uniqueBooks = Array.from(
    new Map(rawBooks.map((book) => [book.isbn, book])).values(), // isbn 기반 중복 제거
  );

  console.log('📦 총 받은 책 수:', rawBooks.length);
  console.log('🧹 중복 제거 후:', uniqueBooks.length);
  console.log('총 검색 결과 수:', data?.pages[0]?.totalResults);
  console.log('총 페이지 수:', data?.pages.length);
  console.log('렌더링될 고유 책 수:', uniqueBooks.length);
  data?.pages.forEach((page, i) => {
    console.log(`page ${i + 1} - book count:`, page.books?.length);
  });

  return (
    <div className='pt-6 pb-6 max-w-[1030px] mx-auto'>
      <div className='flex flex-row gap-5'>
        <Header />
      </div>
      <div className='flex flex-col pt-8'>
        <p>도서명 검색결과 '{uniqueBooks.length}'건</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {uniqueBooks.map((book, index) => (
            <div
              key={book.isbn || `${book.title}-${index}`}
              className='bg-white rounded-[10px] p-5 flex flex-row gap-4 w-full'
            >
              <div className='bg-gray-300 w-[170px] h-[240px] rounded-lg'>
                {book.coverImageUrl && (
                  <Image
                    src={book.coverImageUrl}
                    alt={book.title || '책 커버'}
                    width={170}
                    height={240}
                    className='rounded-lg object-cover'
                    onError={(e) => {
                      console.error('이미지 로드 실패:', e, book.coverImageUrl);
                      (e.target as HTMLImageElement).src = '/placeholder.png';
                    }}
                  />
                )}
              </div>
              <div className='flex flex-col justify-between flex-1'>
                <div>
                  <h2 className='font-semibold text-base'>{book.title}</h2>
                  <p className='text-gray-700 text-sm'>{book.author}</p>
                  <p className='text-gray-500 text-xs'>
                    {book.publisher} • {book.publishedDate}
                  </p>
                </div>
                <p>
                  "이 책에{' '}
                  <span className='text-state-success font-semibold'>
                    {book.totalEmotionCount ?? 0}
                  </span>
                  명이 감정을 기록했어요"
                </p>
                <div className='flex flex-row gap-4'>
                  {book.emotions?.map((e: any) => (
                    <div
                      key={e.id}
                      className='text-center'
                    >
                      <p className='text-green-700 font-semibold mb-2'>
                        {Math.round(e.percentage * 100)}%
                      </p>
                      <div className='w-[44px] h-[44px] rounded-full border bg-gray-200 border-primary-light flex items-center justify-center mb-1'>
                        <Image
                          src={`/icons/emotion/${e.name.toLowerCase()}.png`}
                          alt={e.name}
                          width={26}
                          height={23}
                          onError={(e) => {
                            console.error('감정 이미지 로드 실패:', e);
                            (e.target as HTMLImageElement).src = '/placeholder.png';
                          }}
                        />
                      </div>
                      <p>{e.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isFetchingNextPage && <div>로딩 중...</div>}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}
