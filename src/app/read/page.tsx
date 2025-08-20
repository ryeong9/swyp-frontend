'use client';

import { emotions } from '@/constants/emotion';
import useGetAllRecords from '@/hooks/read/useGetAllRecords';
import { Book } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ReadPageContent({ setBook }: { setBook: (b: Book) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookParam = searchParams.get('book');
    if (bookParam) {
      const book = JSON.parse(decodeURIComponent(bookParam)) as Book;
      setBook(book);
    }
  }, [searchParams, router, setBook]);

  return null;
}

export default function ReadPage() {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  const { data: allRecords } = useGetAllRecords(book?.bookshelfId);

  return (
    <div className='relative'>
      <Suspense fallback={null}>
        <ReadPageContent setBook={setBook} />
      </Suspense>
      <div className='fixed w-full h-[90px] px-[205px] py-5 flex justify-between border-b-2 bg-background border-b-gray-200 z-20'>
        <button
          type='button'
          onClick={() => router.back()}
        >
          <img
            src='/icons/arrowLeft.svg'
            alt='뒤로가기 아이콘'
          />
        </button>
      </div>
      <div className='w-[820px] mx-auto mb-14 pt-[90px]'>
        <section className='relative w-full'>
          <div className='relative h-[528px] flex flex-col justify-center items-center bg-background-input rounded-3xl mt-14 group'>
            <h2 className='font-sans font-semibold text-2xl text-gray-900 mb-2 truncate max-w-[600px]'>
              {book?.title}
            </h2>
            <p className='font-sans font-medium text-base text-gray-700 mb-4'>{book?.author}</p>
            <div className='w-[224px] h-[327px] rounded-lg overflow-hidden mb-4'>
              <img
                src={book?.coverImageUrl}
                alt='도서 표지'
                className='w-full h-full object-cover'
              />
            </div>
            <span className='font-sans font-normal text-sm text-gray-500'>
              {book?.category} &middot; {book?.publisher} &middot;{' '}
              {book?.publishedDate.split('-')[0]}
            </span>
          </div>
        </section>
        <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mt-[112px] mb-6'>
          독서 상태
        </h2>
        <div
          className={`w-[190px] h-[50px] flex justify-center items-center font-sans font-semibold leading-[30px] text-base rounded-lg mr-8 ${
            book?.status === 'READING'
              ? 'bg-[#E6F2E6] text-primary'
              : 'bg-primary-lightblue text-[#94A8D2]'
          }`}
        >
          {book?.status === 'READING' ? '읽는 중' : '다 읽음'}
        </div>
        <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mt-14 mb-6'>
          기록
        </h2>
        {allRecords?.map((item) => (
          <div
            key={item.recordId}
            className='w-full bg-background-input rounded-2xl px-8 py-6 mb-8'
          >
            <div className='flex justify-between'>
              <div className='flex items-center'>
                {item.page ? (
                  <p className='w-[63px] h-[30px] bg-gray-200 rounded-sm font-sans font-medium text-xs text-gray-700 flex justify-center items-center mr-4'>
                    {item.page} P
                  </p>
                ) : (
                  ''
                )}
                <p className='font-sans text-xs text-gray-500'>{item.createdAt.slice(0, 10)}</p>
              </div>
              <div className='flex'>
                <div className='relative group mr-4'>
                  <button
                    type='button'
                    aria-label='수정'
                    className='p-2'
                  >
                    <img
                      src='/icons/updateIcon.svg'
                      alt=''
                    />
                  </button>
                  <div
                    role='tooltip'
                    className='absolute -top-7 -left-1 bg-gray-900 text-background-input text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-10'
                  >
                    수정
                    <span
                      className='absolute top-full left-1/2 -translate-x-1/2 
                   border-4 border-transparent border-t-gray-900'
                    />
                  </div>
                </div>
                <div className='relative group'>
                  <button
                    type='button'
                    aria-label='삭제'
                    className='p-2'
                  >
                    <img
                      src='/icons/deleteIcon.svg'
                      alt=''
                    />
                  </button>
                  <div
                    role='tooltip'
                    className='absolute -top-7 -left-1 bg-gray-900 text-background-input text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-10'
                  >
                    삭제
                    <span
                      className='absolute top-full left-1/2 -translate-x-1/2 
                   border-4 border-transparent border-t-gray-900'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-5 grid-rows-1 gap-x-[23px]'>
              {item.emotions.map((emo, index) => {
                const emotion = emotions.find((item) => item.id === emo.emotionId);
                return (
                  <div
                    key={index}
                    className='w-[133px] h-[76px] flex justify-center items-center bg-gray-100 rounded-lg'
                  >
                    <img
                      src={emotion?.icon}
                      alt='감정 이모지'
                      className='w-[44px] mr-4'
                    />
                    <div className='flex flex-col font-sans font-medium text-sm'>
                      <p className='text-gray-900'>{emo.emotionName}</p>
                      <p className='text-gray-700'>{emo.score}점</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {item.content ? (
              <p className='mt-4 font-sans text-gray-900 text-base'>{item.content}</p>
            ) : (
              ''
            )}
            {item.finalNote ? (
              <div className='font-sans text-gray-900'>
                <h2 className='font-semibold text-2xl my-6'>노트</h2>
                <p className='py-4 px-6 text-base leading-[25px] bg-gray-100 rounded-sm'>
                  {item.finalNote}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
        {book?.status === 'READING' ? (
          <button
            type='button'
            className='w-[172px] h-[46px] flex items-center justify-center bg-gray-700 mb-4 rounded-lg cursor-pointer'
          >
            <img
              src='/icons/plusIcon.svg'
              alt='플러스 아이콘'
            />
            <p className='font-sans font-medium leading-[30px] text-base text-background-input ml-2'>
              인덱스 추가하기
            </p>
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
