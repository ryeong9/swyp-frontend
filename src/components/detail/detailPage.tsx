'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDetail } from '@/hooks/detail/useDetail';
import Header from '@/components/header/header';
// import ReadingStatusTag from './renderStatus';

import EmotionSwiper from './emotionSlide';
import { useState } from 'react';
import usePostAddDesk from '@/hooks/detail/usePostAddDesk';
import { AddDeskData, Book, mapAddDeskToBook } from '@/types';

interface DetailPageProps {
  isbn: string;
}
export default function DetailPage({ isbn }: DetailPageProps) {
  const { data: book, isLoading, isError } = useDetail(isbn);
  // const { data: bookStatus } = useBookStatus(isbn);
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const [bookData, setBookData] = useState<Book | null>(null);

  const { mutate } = usePostAddDesk();

  if (isLoading) return <div className='text-center mt-10'>로딩 중...</div>;
  if (isError || !book)
    return <div className='text-center mt-10'>도서 정보를 불러오지 못했습니다.</div>;

  const hasEmotion = book?.emotions && book.emotions.length > 0;

  const handleClickAddDesk = () => {
    mutate(isbn, {
      onSuccess: (data: AddDeskData) => {
        setBookData(mapAddDeskToBook(data));
        setShowPopup(true);
      },
      onError: (err) => {
        alert('책장 등록 실패');
        console.error(err);
      },
    });
  };

  const handleClickGotoWrite = () => {
    const encodedBook = encodeURIComponent(JSON.stringify(bookData));
    router.push(`/write?book=${encodedBook}`);
  };

  return (
    <div className='relative flex justify-center items-center'>
      <div className='w-[1030px] max-w-full flex flex-col gap-14 pb-14'>
        <div className='flex flex-row gap-5'>
          <Header />
        </div>
        {/* 책 소개 부분 */}
        <div className='bg-white w-[1030px] max-w-full h-[326px] rounded-2xl p-10 flex flex-row gap-4'>
          <div className='bg-white w-[170px] h-[240px] rounded-lg flex items-center justify-center overflow-hidden'>
            {book.coverImageUrl && (
              <Image
                src={book.coverImageUrl}
                alt={book.title || '책 커버'}
                width={172}
                height={246}
                className='rounded-lg object-cover'
                onError={(e) => {
                  console.error('이미지 로드 실패:', e, book.coverImageUrl);
                  (e.target as HTMLImageElement).src = '/placeholder.png';
                }}
              />
            )}
          </div>

          <div className='flex flex-col justify-between w-[762px] min-h-[246px]'>
            <p className='text-gray-500 text-xs'>{book.category}</p>
            <p className='text-gray-900 text-base font-medium'>{book.title}</p>
            <p className='text-gray-700 text-xs font-medium'>{book.author}</p>
            <p className='text-gray-500 text-xs'>
              {book.publisher} • {book.publishedDate}
            </p>
            <p className='text-gray-700 text-sm line-clamp-4 overflow-hidden'>
              {book.description || '설명이 없습니다.'}
            </p>
            <div className='flex flex-row justify-between'>
              <button
                onClick={handleClickAddDesk}
                className='w-[300px] h-[50px] bg-state-success text-white px-4 py-2 gap-2.5 text-base rounded-sm'
              >
                책상에 올리기
              </button>
            </div>
          </div>
        </div>

        {/* 감정 점수 순위 */}
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col max-w-full h-[64px] gap-2 justify-between'>
            <p className='font-semibold text-2xl leading-[30px]'>도서의 감정 점수 순위</p>
            <p className='text-gray-700 leading-[25px] text-base'>
              누적된 감정을 점수로 환산해 순위로 정리했어요.
            </p>
          </div>
          {hasEmotion ? (
            <EmotionSwiper
              emotionList={book.emotions}
              emotionLength={book.emotions.length}
            />
          ) : (
            <div className='bg-white w-full h-[184px] rounded-3xl p-10 flex flex-col justify-center items-center gap-2'>
              <img
                src='/icons/noEmotionData.svg'
                alt='emotionIcon'
              />
              <p className='text-gray-700 font-serif font-bold text-base'>
                이 책의 감정 기록이 아직 없어요.
              </p>
            </div>
          )}
        </div>
      </div>
      {showPopup && bookData && (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-20'>
          <div className='w-[412px] h-[291px] flex flex-col justify-center items-center bg-background-input rounded-2xl'>
            <h2 className='font-sans font-semibold text-xl mb-4'>책상 위에 자리 잡았어요!</h2>
            <p className='font-sans font-medium text-sm text-gray-700 mb-6'>
              이 순간의 감정을 책과 함께 남겨보세요.
            </p>
            <button
              type='button'
              className='w-[300px] h-[50px] bg-state-success text-background-input text-base rounded-lg mb-2'
              onClick={handleClickGotoWrite}
            >
              기록하기
            </button>
            <button
              type='button'
              className='w-[300px] h-[50px] bg-gray-300 text-gray-700 text-base rounded-lg'
              onClick={() => setShowPopup(false)}
            >
              돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
