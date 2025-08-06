'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDetail, useBookStatus } from '@/hooks/detail/useDetail';
import Header from '@/components/header/header';
import ReadingStatusTag from './renderStatus';
import { emotions } from '@/constants/emotion';

interface DetailPageProps {
  isbn: string;
}
export default function DetailPage({ isbn }: DetailPageProps) {
  const { data: book, isLoading, isError } = useDetail(isbn);
  const { data: bookStatus } = useBookStatus(isbn);
  const router = useRouter();

  const hasEmotion = book?.emotions && book.emotions.length > 0;
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='pt-6 pb-6 w-[1030px] max-w-full flex flex-col gap-14'>
        <div className='flex flex-row gap-5'>
          <Header />
        </div>
        {/* 책 소개 부분 */}
        <div className='bg-white w-[1030px] max-w-full h-[326px] rounded-2xl p-10 flex flex-row gap-4'>
          <div className='bg-state-disabled rounded-lg w-[172px] h-[246px]' />
          <div className='flex flex-col justify-between w-[762px] min-h-[246px]'>
            <p className='text-gray-500 text-xs'>{book?.category}</p>
            <p className='text-gray-900 text-base font-medium'>{book?.title}</p>
            <p className='text-gray-700 text-xs font-medium'>{book?.author}</p>
            <p className='text-gray-500 text-xs'>
              {book?.publisher} • {book?.publishedDate}
            </p>
            <p className='text-gray-700 text-sm line-clamp-4 overflow-hidden'>
              {/* description 텍스트 */}
              {book?.description}
            </p>
            <div className='flex flex-row justify-between'>
              <ReadingStatusTag status={bookStatus?.status ?? 'NONE'} />
              <button className='w-[300px] h-[50px] bg-state-success text-white px-4 py-2 gap-2.5 text-base rounded-sm'>
                기록하기
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
            <div className='flex flex-row items-center justify-between'>
              {book.emotions
                .sort((a, b) => (b.scoreSum ?? 0) - (a.scoreSum ?? 0))
                .slice(0, 6)
                .map((emotionData, index) => {
                  const emotion = emotions.find((em: any) => em.id === emotionData.id);
                  if (!emotion) return null;

                  return (
                    <div
                      key={emotion.id}
                      className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-8 py-6 gap-2'
                    >
                      <p className='text-sm font-semibold mb-2'>#{index + 1}</p>
                      <Image
                        src={emotion.icon}
                        alt={emotion.name}
                        width={40}
                        height={40}
                      />
                      <p className='text-sm'>{emotion.name}</p>
                      <p className='text-xs text-gray-500'>
                        {emotionData.scoreSum?.toLocaleString()}점
                      </p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className='bg-white w-full h-[184px] rounded-3xl p-10 flex flex-col justify-center items-center gap-2'>
              <Image
                src='/icons/emotion/neutralityIcon.svg'
                alt='emotionIcon'
                width={34.75}
                height={40.35}
              />
              <p className='text-gray-700 font-serif font-bold text-base'>
                이 책의 감정 기록이 아직 없어요.
              </p>
            </div>
          )}
          {hasEmotion ? (
            <div className='flex flex-row items-center justify-between'>
              <Image
                src='/icons/arrowLeft.svg'
                alt='arrowLeft'
                width={20}
                height={20}
              />
              <div className='flex flex-row w-[30px] h-[10px] gap-2 justify-between items-center'>
                <Image
                  src='/icons/paginationClick.svg'
                  alt='paginationClcik'
                  width={20}
                  height={20}
                />
                <Image
                  src='/icons/paginationNoClick.svg'
                  alt='paginationNoClcik'
                  width={20}
                  height={20}
                />
              </div>
              <Image
                src='/icons/arrowRight.svg'
                alt='arrowRight'
                width={20}
                height={20}
              />
            </div>
          ) : (
            <div className='invisible flex flex-row items-center justify-between'>
              <Image
                src='/icons/arrowLeft.svg'
                alt='arrowLeft'
                width={20}
                height={20}
              />
              <div className='flex flex-row w-[30px] h-[10px] gap-2 justify-between items-center'>
                <Image
                  src='/icons/paginationClick.svg'
                  alt='paginationClcik'
                  width={20}
                  height={20}
                />
                <Image
                  src='/icons/paginationNoClick.svg'
                  alt='paginationNoClcik'
                  width={20}
                  height={20}
                />
              </div>
              <Image
                src='/icons/arrowRight.svg'
                alt='arrowRight'
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
