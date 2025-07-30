'use client';

import './myBookHistory.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';

// 임의의 타입 지정이라 후에 지울 예정
type Book = {
  coverImg: string;
  title: string;
  author: string;
  genre: string;
  publisher: string;
  since: string;
  type: 'reading' | 'finished';
};

export default function MyBookHistory() {
  const router = useRouter();
  const handleClickWriteBtn = () => {
    router.push('/write');
  };

  // 목데이터
  const data: Book[] = [
    {
      coverImg: '/',
      title: '책 제목',
      author: '저자',
      genre: '장르',
      publisher: '출판사',
      since: '2000.09.02',
      type: 'reading',
    },
    {
      coverImg: '/',
      title: '책 제목2',
      author: '저자2',
      genre: '장르2',
      publisher: '출판사2',
      since: '2000.09.22',
      type: 'reading',
    },
    {
      coverImg: '/',
      title: '책 제목3',
      author: '저자3',
      genre: '장르3',
      publisher: '출판사3',
      since: '2000.03.22',
      type: 'finished',
    },
    {
      coverImg: '/',
      title: '책 제목4',
      author: '저자4',
      genre: '장르4',
      publisher: '출판사4',
      since: '2000.03.22',
      type: 'finished',
    },
  ];

  if (!data || data.length === 0) {
    return (
      <div className='bg-background-input w-full h-[240px] rounded-[20px] p-10 mb-14'>
        <div className='flex flex-col justify-center items-center'>
          <img
            src='/icons/noReadIcon.svg'
            alt='기록 없을 때 이모지'
            className='w-[35px] h-[40px] mb-2'
          />
          <p className='font-serif font-bold text-base text-gray-700 mb-6'>
            이 달의 감정 기록이 아직 없어요.
          </p>
          <button
            type='button'
            onClick={handleClickWriteBtn}
            className='w-[190px] h-[50px] bg-primary rounded-[8px] font-sans font-medium text-base text-background-input'
          >
            기록하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={data.length > 1 ? { clickable: true } : false}
        navigation={data.length > 1}
        className='w-full pb-20'
      >
        {Array.from({ length: Math.ceil(data.length / 3) }).map((_, groupIndex) => {
          const start = groupIndex * 3;
          const group = data.slice(start, start + 3);

          return (
            <SwiperSlide key={groupIndex}>
              <div className='flex flex-col pb-8'>
                {group.map((item, index) => (
                  <div
                    key={index}
                    className='bg-background-input flex w-full h-[240px] rounded-[20px] mb-7 p-10 justify-between'
                  >
                    <section className='flex'>
                      <img
                        src={item?.coverImg}
                        alt='도서 표지 사진'
                        style={{
                          backgroundColor: '#D9D9D9',
                          width: '120px',
                          height: '160px',
                          borderRadius: '8px',
                        }}
                      />
                      <div className='flex flex-col justify-end ml-4'>
                        <p className='font-sans font-medium text-base mb-2 text-gray-900'>
                          {item.title}
                        </p>
                        <p className='font-sans font-medium text-sm mb-2 text-gray-700'>
                          {item.author}
                        </p>
                        <p className='font-sans text-xs text-gray-500'>
                          {item.genre} &middot; {item.publisher} &middot; {item.since}
                        </p>
                      </div>
                    </section>
                    <section></section>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
