import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useGetBookshelfData from '@/hooks/main/useGetBookshelfData';
import BookshelfSkeleton from '../skeleton/bookshelfSkeleton';
import { Book } from '@/types';

export default function BookShelfSection() {
  const router = useRouter();
  const { data: bookshelfData, isLoading } = useGetBookshelfData();

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;
  const gap = 24;

  if (isLoading) return <BookshelfSkeleton />;

  const isEmpty = bookshelfData?.length === 0;

  const handleClickGotoRead = (item: Book) => {
    const encodedBook = encodeURIComponent(JSON.stringify(item));
    router.push(`/read?book=${encodedBook}`);
  };

  const next = () => {
    if (!bookshelfData) return;
    const maxIndex = Math.ceil(bookshelfData.length / itemsPerView) - 1;
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className='w-[1030px] flex flex-col my-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책장</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금까지 읽었던 책들이 책장에 꽂혀 있어요
          </p>
        </div>
      </div>
      {isEmpty ? (
        <div className='flex flex-col h-[246px] justify-center items-center'>
          <img
            src='/icons/noEmotionData.svg'
            alt='nodata 아이콘'
            className='w-[101px] mb-6'
          />
          <p className='font-serif font-bold text-gray-700 text-center leading-[25px]'>
            최근에 어떤 책을 재미있게 읽었나요?
            <br />
            검색을 통해 읽었던 책을 책장에 꽂아주세요.
          </p>
        </div>
      ) : (
        <div className='w-full h-[336px] bg-background-input rounded-2xl pt-[45px]'>
          <div className='relative flex justify-center px-5 w-full h-[280px] overflow-hidden'>
            <div className='w-[956px] overflow-hidden'>
              <div
                className='flex transition-transform duration-500'
                style={{
                  transform: `translateX(-${currentIndex * itemsPerView * (172 + gap)}px)`,
                  gap: `${gap}px`,
                }}
              >
                {bookshelfData?.map((item) => (
                  <div
                    key={item.isbn}
                    className='flex-shrink-0 w-[172px] h-[246px] cursor-pointer'
                    onClick={() => handleClickGotoRead(item)}
                  >
                    <img
                      src={item.coverImageUrl}
                      alt='도서 이미지'
                      className='w-full h-full rounded-lg'
                    />
                  </div>
                ))}
              </div>

              {/* 화살표 및 닷 */}
              {bookshelfData && bookshelfData.length > itemsPerView && (
                <>
                  <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className='absolute left-4 top-[40%] disabled:opacity-30'
                  >
                    <img
                      src='/icons/arrowLeft.svg'
                      alt='왼쪽 화살표'
                    />
                  </button>
                  <button
                    onClick={next}
                    disabled={currentIndex >= bookshelfData.length - itemsPerView}
                    className='absolute right-4 top-[40%] disabled:opacity-30'
                  >
                    <img
                      src='/icons/arrowLeft.svg'
                      alt='오른쪽 화살표'
                      className='rotate-180'
                    />
                  </button>
                </>
              )}
              {bookshelfData && bookshelfData.length > itemsPerView && (
                <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2'>
                  {Array.from({ length: Math.ceil(bookshelfData.length / itemsPerView) }).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
                          idx === currentIndex ? 'bg-[#5a5a5a]' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentIndex(idx)}
                      />
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
