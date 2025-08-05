'use client';

import Image from 'next/image';
import { useInfiniteTitleSearch } from '@/hooks/search/useInfinite';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Header from '@/components/header/header';
import { emotions } from '@/constants/emotion';

export default function ResultSearchPage() {
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

  // 테스트용으로 첫 번째 책에 mock 감정 데이터 넣기
  if (rawBooks.length > 0) {
    rawBooks[0].totalEmotionCount = 10;
    rawBooks[0].emotions = [
      { id: 5, name: '위로', percentage: 0.5 },
      { id: 6, name: '슬픔', percentage: 0.3 },
      { id: 15, name: '평온함', percentage: 0.2 },
    ];
  }

  console.log('📦 총 받은 책 수:', rawBooks.length);
  data?.pages.forEach((page, i) => {
    console.log(`page ${i + 1} - book count:`, page.books?.length);
  });

  return (
    <div className='pt-6 pb-6 max-w-[1030px] mx-auto'>
      <div className='flex flex-row gap-5'>
        <Header />
      </div>
      <div className='flex flex-col pt-8'>
        <p>도서명 검색결과 '{data?.pages[0]?.totalResults || 0}'건</p>
        {rawBooks.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {rawBooks.map((book, index) => (
              <div
                key={book.isbn || `${book.title}-${index}`}
                className='bg-white rounded-[10px] p-5 flex flex-row gap-4 w-full'
              >
                {/* 이미지 영역 */}
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

                {/* 책 정보 */}
                <div className='flex flex-col justify-between flex-1'>
                  <div>
                    <h2 className='font-semibold text-base'>{book.title}</h2>
                    <p className='text-gray-700 text-sm'>{book.author}</p>
                    <p className='text-gray-500 text-xs'>
                      {book.publisher} • {book.publishedDate}
                    </p>
                  </div>

                  {/* 감정 요약 */}
                  <div className='flex flex-col w-[279px] h-[161px] rounded-lg bg-gray-100 p-5 gap-4 items-center justify-between'>
                    <p>
                      "이 책에{' '}
                      <span className='text-state-success font-semibold'>
                        {book.totalEmotionCount ?? 0}
                      </span>
                      명이 감정을 기록했어요"
                    </p>

                    {/* 감정 퍼센트 및 아이콘 */}
                    {book.emotions && book.emotions.length > 0 ? (
                      <div className='w-[220px] h-[91px] flex flex-row justify-between items-center gap-4'>
                        {book.emotions
                          .slice()
                          .sort((a, b) => b.percentage - a.percentage)
                          .map((e, idx) => {
                            const emotion = emotions.find((em: any) => em.id === e.id);
                            const isTop = idx === 0; //젤 높은 감정
                            return (
                              <div
                                key={e.id}
                                className='flex flex-col items-center justify-between '
                              >
                                <p
                                  className={`${isTop ? 'text-green-700 font-semibold' : 'text-gray-700 font-normal'} text-sm mb-1`}
                                >
                                  {Math.round(e.percentage * 100)}%
                                </p>
                                <div className='w-[44px] h-[44px]  border-0 flex items-center justify-center mb-1'>
                                  {emotion?.icon && (
                                    <Image
                                      src={emotion.icon}
                                      alt={e.name}
                                      width={44}
                                      height={44}
                                      onError={(e) => {
                                        console.error('감정 이미지 로드 실패:', e, emotion?.icon);
                                        (e.target as HTMLImageElement).src = '/placeholder.png';
                                      }}
                                    />
                                  )}
                                </div>
                                <p>{e.name}</p>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className='text-gray-400 text-sm'>감정 기록이 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center font-serif font-bold text-gray-700 text-base leading-[25px] gap-4'>
            <img
              src='/icons/noSearchIcon.svg'
              alt='noResult'
              width='34.75'
              height='40.35'
            />
            <p>검색 결과가 없어요.</p>
            <p>다른 도서명으로 검색하거나 새로운 책을 기록해주세요!</p>
          </div>
        )}
        {isFetchingNextPage && <div>로딩 중...</div>}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}
