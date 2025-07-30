'use client';

import BookModal from '@/components/writePage/bookModal';
import { useState } from 'react';

export default function WritePage() {
  const [selectedBook, setSelectedBook] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [status, setStatus] = useState('독서 상태');

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <div className='w-full px-[205px] py-5 flex justify-end border-b-2 border-b-gray-200'>
        <button
          type='submit'
          className='w-[190px] h-[50px] rounded-lg font-sans font-medium bg-primary text-background-input disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer'
          disabled
        >
          등록하기
        </button>
      </div>
      <div className='w-[1030px] mx-auto'>
        {/* 기록할 책 선택하기 */}
        <section className='relative w-full h-[177px] flex flex-col justify-center items-center mt-14 bg-gray-200 rounded-3xl'>
          <button
            type='button'
            onClick={() => setShowSelectModal((prev) => !prev)}
            className='w-[145px] h-[46px] flex items-center justify-center bg-gray-700 mb-4 rounded-lg cursor-pointer'
          >
            <img
              src='/icons/plusIcon.svg'
              alt='플러스 아이콘'
            />
            <p className='font-sans font-medium leading-[30px] text-base text-background-input ml-2'>
              책 추가하기
            </p>
          </button>
          {showSelectModal && (
            <BookModal
              setSelectedBook={setSelectedBook}
              setShowSelectModal={setShowSelectModal}
            />
          )}
          <p className='font-sans text-base text-gray-500'>
            나의 책상에서 기록할 책을 추가해주세요
          </p>
        </section>
        {/* 독서 상태 선택하기 */}
        <section className='w-full h-[257px] bg-background-input rounded-3xl mt-14 py-14 px-[105px]'>
          <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>
            독서 상태
          </h2>
          <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider'>
            독서 상태를 선택해주세요.
          </p>
          <div className='flex items-center mt-8'>
            <div
              className={`w-[190px] h-[50px] flex justify-center items-center font-sans font-semibold leading-[30px] text-base rounded-lg mr-8 ${
                !selectedBook
                  ? 'bg-gray-100 text-gray-300'
                  : status === '읽는 중'
                    ? 'bg-[#E6F2E6] text-primary'
                    : status === '다 읽음'
                      ? 'bg-[#EEF2FA] text-[#94A8D2]'
                      : 'bg-gray-100 text-gray-300'
              }`}
            >
              {status}
            </div>
            <label
              htmlFor='reading'
              className='flex font-sans font-medium text-gray-300 cursor-pointer'
            >
              <input
                id='reading'
                type='radio'
                name='독서상태'
                value='읽는 중'
                className='mr-2 reading'
                disabled={!selectedBook}
                onChange={handleChangeRadio}
              />
              <span>읽는 중</span>
            </label>
            <label
              htmlFor='finished'
              className='flex ml-5 font-sans font-medium text-gray-300 cursor-pointer'
            >
              <input
                id='finished'
                type='radio'
                name='독서상태'
                value='다 읽음'
                className='mr-2 finished'
                disabled={!selectedBook}
                onChange={handleChangeRadio}
              />
              <span>다 읽음</span>
            </label>
          </div>
        </section>
      </div>
    </>
  );
}
