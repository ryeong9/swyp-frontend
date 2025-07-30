'use client';

import BookModal from '@/components/writePage/bookModal';
import { useState } from 'react';

export default function WritePage() {
  const [selectedBook, setSelectedBook] = useState(true);
  const [showSelectModal, setShowSelectModal] = useState(false);

  return (
    <>
      <div className='w-full px-[205px] py-5 flex justify-end border-b-2 border-b-gray-200'>
        <button
          type='submit'
          className='w-[190px] h-[50px] rounded-lg font-sans font-medium bg-primary text-background-input disabled:bg-gray-300 disabled:text-gray-500'
          disabled
        >
          등록하기
        </button>
      </div>
      <div className='w-[1030px] mx-auto'>
        {/* 기록할 책 선택하기 */}
        <section className='w-full h-[177px] flex flex-col justify-center items-center mt-14 bg-gray-200 rounded-3xl'>
          <button
            type='button'
            onClick={() => setShowSelectModal((prev) => !prev)}
            className='w-[145px] h-[46px] flex items-center justify-center bg-gray-700 mb-4 rounded-lg'
          >
            <img
              src='/icons/plusIcon.svg'
              alt='플러스 아이콘'
            />
            <p className='font-sans font-medium leading-[30px] text-base text-background-input ml-2'>
              책 추가하기
            </p>
          </button>
          {showSelectModal && <BookModal />}
          <p className='font-sans text-base text-gray-500'>
            나의 책상에서 기록할 책을 추가해주세요
          </p>
        </section>
      </div>
    </>
  );
}
