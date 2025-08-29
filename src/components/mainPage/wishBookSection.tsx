import { Wishlist } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const data: Wishlist = [
  {
    isbn: '9791191136979',
    title: '이처럼 사소한 것들',
    author: '클레어 키건',
    coverImageUrl: 'https://image.aladin.co.kr/product/31221/53/coversum/k392832962_1.jpg',
    publisher: '다산책방',
    category: '소설',
    publishedDate: '2023-04-10',
  },
  {
    isbn: '9791191136974',
    title: '이처럼 사소한 것들',
    author: '클레어 키건',
    coverImageUrl: 'https://image.aladin.co.kr/product/31221/53/coversum/k392832962_1.jpg',
    publisher: '다산책방',
    category: '소설',
    publishedDate: '2023-04-10',
  },
  {
    isbn: '9791191136973',
    title: '이처럼 사소한 것들',
    author: '클레어 키건',
    coverImageUrl: 'https://image.aladin.co.kr/product/31221/53/coversum/k392832962_1.jpg',
    publisher: '다산책방',
    category: '소설',
    publishedDate: '2023-04-10',
  },
  {
    isbn: '9791191136971',
    title: '이처럼 사소한 것들',
    author: '클레어 키건',
    coverImageUrl: 'https://image.aladin.co.kr/product/31221/53/coversum/k392832962_1.jpg',
    publisher: '다산책방',
    category: '소설',
    publishedDate: '2023-04-10',
  },
  {
    isbn: '9791191136972',
    title: '이처럼 사소한 것들',
    author: '클레어 키건',
    coverImageUrl: 'https://image.aladin.co.kr/product/31221/53/coversum/k392832962_1.jpg',
    publisher: '다산책방',
    category: '소설',
    publishedDate: '2023-04-10',
  },
  {
    isbn: '9791191136975',
    title: '이처럼 사소한 것들',
    author: '클레어 키건',
    coverImageUrl: 'https://image.aladin.co.kr/product/31221/53/coversum/k392832962_1.jpg',
    publisher: '다산책방',
    category: '소설',
    publishedDate: '2023-04-10',
  },
];

export default function WishBookSection() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;
  const gap = 24;

  const next = () => {
    if (!data) return;
    const maxIndex = Math.ceil(data.length / itemsPerView) - 1;
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleClickBook = (isbn: string) => {
    router.push(`/detail?isbn=${isbn}`);
  };

  return (
    <div className='flex flex-col mb-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>
          내가 찜한 책
        </h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            언젠가 읽고 싶은 책들을 여기에 모아뒀어요.
          </p>
        </div>
      </div>
      {data.length === 0 ? (
        <div className='flex flex-col h-[246px] justify-center items-center'>
          <img
            src='/icons/noEmotionData.svg'
            alt='nodata 아이콘'
            className='w-[101px] mb-6'
          />
          <p className='font-serif font-bold text-gray-700 text-center leading-[25px]'>
            읽고 싶은 책이 있다면 찜을 해주세요.
          </p>
        </div>
      ) : (
        <div className='relative flex justify-center px-5 w-full h-[280px] overflow-hidden'>
          <div className='w-[956px] overflow-hidden'>
            <div
              className='flex transition-transform duration-500'
              style={{
                transform: `translateX(-${currentIndex * itemsPerView * (172 + gap)}px)`,
                gap: `${gap}px`,
              }}
            >
              {data?.map((item) => (
                <div
                  key={item.isbn}
                  className='relative flex-shrink-0 w-[172px] h-[246px] cursor-pointer'
                  onClick={() => handleClickBook(item.isbn)}
                >
                  <img
                    // src={item.coverImageUrl}
                    alt='도서 이미지'
                    className='w-full h-full rounded-lg bg-gray-200'
                  />
                  <div
                    className='absolute flex justify-center w-[50px] h-[80px] top-[-10px] right-[10px] bg-[#D2DEF4]/80 z-10 rounded-t-[2px]'
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* 화살표 및 닷 */}
            {data && data.length > itemsPerView && (
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
                  disabled={currentIndex >= data.length - itemsPerView}
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
            {data && data.length > itemsPerView && (
              <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2'>
                {Array.from({ length: Math.ceil(data.length / itemsPerView) }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
                      idx === currentIndex ? 'bg-[#5a5a5a]' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
