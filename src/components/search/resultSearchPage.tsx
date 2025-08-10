'use client';

import Image from 'next/image';
import { useInfiniteTitleSearch, useInfiniteEmotionSearch } from '@/hooks/search/useInfinite';
import { useEffect, useRef } from 'react';
import Header from '@/components/header/header';
import { emotions } from '@/constants/emotion';
import { useRouter } from 'next/navigation';
export default function ResultSearchPage({ keyword, type }: { keyword: string; type: string }) {
  const router = useRouter();
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    type === 'emotion' ? useInfiniteEmotionSearch(keyword) : useInfiniteTitleSearch(keyword);

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

  return (
    <div className='pt-6 pb-6 max-w-[1030px] mx-auto'>
      <div className='flex flex-row gap-5'>
        <Header />
      </div>
      <div className='flex flex-col mt-14'>
        <p className='mb-8'>도서명 검색결과 '{data?.pages[0]?.totalResults || 0}'건</p>
        {rawBooks.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {rawBooks.map((book, index) => (
              <div
                key={book.isbn || `${book.title}-${index}`}
                className='bg-white rounded-[10px] p-5 flex flex-row gap-4 w-full'
                onClick={() => router.push(`/detail?isbn=${book.isbn}`)}
              >
                {/* 이미지 영역 */}
                <div className='bg-white w-[170px] h-[240px] rounded-lg flex items-center justify-center overflow-hidden'>
                  {book.coverImageUrl && (
                    <Image
                      src={book.coverImageUrl}
                      alt={book.title || '책 커버'}
                      width={170}
                      height={240}
                      className='rounded-lg object-cover w-[170px] h-[240px]'
                      onError={(e) => {
                        console.error('이미지 로드 실패:', e, book.coverImageUrl);
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                  )}
                </div>

                {/* 책 정보 */}
                <div className='flex flex-col justify-between w-[279px] h-[244px] gap-4'>
                  <div className='flex flex-col gap-2'>
                    <h2 className='font-semibold text-base line-clamp-1 overflow-hidden'>
                      {book.title}
                    </h2>
                    <p className='text-gray-700 text-sm'>{book.author}</p>
                    <p className='text-gray-500 text-xs'>
                      {book.publisher} • {book.publishedDate}
                    </p>
                  </div>

                  {/* 감정 요약 */}
                  <div className='flex flex-col w-[279px] h-[161px] rounded-lg bg-gray-100 p-5 gap-3 items-center justify-center'>
                    {book.emotions && book.emotions.length > 0 ? (
                      <>
                        <p className='text-sm'>
                          "이 책에{' '}
                          <span className='text-state-success font-semibold'>
                            {book.totalEmotionCount}
                          </span>
                          명이 감정을 기록했어요"
                        </p>
                        <div className='w-[220px] h-[91px] grid grid-cols-3 grid-rows-1 gap-x-4'>
                          {book.emotions
                            .slice()
                            .sort((a, b) => b.percentage - a.percentage)
                            .map((e, idx) => {
                              const emotion = emotions.find((em: any) => em.id === e.id);
                              const isTop = idx === 0;
                              return (
                                <div
                                  key={e.id}
                                  className='flex flex-col items-center justify-between'
                                >
                                  <p
                                    className={`${
                                      isTop
                                        ? 'text-green-700 font-semibold'
                                        : 'text-gray-700 font-normal'
                                    } text-sm mb-1`}
                                  >
                                    {Math.round(e.percentage)}%
                                  </p>
                                  <div className='w-[44px] h-[44px] flex items-center justify-center mb-1'>
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
                                  <p
                                    className={`${
                                      isTop
                                        ? 'text-gray-900 font-medium text-sm'
                                        : 'text-gray-700 text-sm'
                                    }`}
                                  >
                                    {e.name}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </>
                    ) : (
                      // 감정 데이터 없을 때
                      <div className='flex flex-col items-center justify-center gap-4'>
                        <img
                          src='/icons/noEmotionData.svg'
                          alt='감정 없음'
                          width={60}
                          height={57.17}
                        />
                        <div className='flex flex-col font-serif  text-gray-700 font-bold text-xs  '>
                          <p>아직 감정 데이터가 없어요.</p>
                          <p>이 책의 첫 감정 기록을 도와주세요!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col w-full min-h-screen mt-14 items-center justify-center font-serif font-bold text-gray-700 text-base leading-[25px] gap-6'>
            <img
              src='/icons/noEmotionData.svg'
              alt='noResult'
              width={101.62}
              height={96.83}
            />
            <div className='flex flex-col items-center'>
              <p>검색 결과가 없어요.</p>
              <p>다른 도서명으로 검색하거나 새로운 책을 기록해주세요!</p>
            </div>
          </div>
        )}
        {isFetchingNextPage && <div>로딩 중...</div>}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}
