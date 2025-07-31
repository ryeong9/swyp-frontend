'use client';

import { useState } from 'react';

export default function IndexRecord() {
  const [score, setScore] = useState(10);

  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(Number(e.target.value));
  };

  return (
    <div className='w-full bg-background-input'>
      <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>인덱스</h2>
      <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider mb-6'>
        인상 깊었던 부분에 감정 이모지를 추가해 점수를 선택해주세요. (최대 5개)
      </p>
      <div className='flex items-center px-8 py-6 bg-gray-100 rounded-2xl'>
        <button
          type='button'
          className='flex flex-col justify-center items-center pr-6 border-r-1 border-r-gray-300'
        >
          <img
            src='/icons/plusIcon.svg'
            alt='플러스 아이콘'
            className='w-[44px] h-[44px] p-3 rounded-full bg-gray-300 mb-2'
          />
          <p className='font-sans text-sm text-gray-500'>감정 선택</p>
        </button>
        <div className='w-[595px] px-6'>
          <input
            type='range'
            min='1'
            max='10'
            value={score}
            onChange={handleChangeScore}
            className='slider-custom'
            style={{
              background: `linear-gradient(to right,#9BC99F ${
                ((score - 1) / 9) * 100
              }%, #F0F0F0 ${((score - 1) / 9) * 100}%)`,
            }}
          />
          <div className='w-full flex justify-between mt-[9px] pl-2 pr-[18px] translate-x-[7px]'>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`font-sans text-sm ${score === i + 1 ? 'font-medium text-gray-900' : 'font-normal text-gray-500'}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div className='w-[84px] h-[51px] bg-[#EEF2FA] rounded-lg flex justify-center items-center'>
          <p className='font-sans font-medium text-base text-gray-900'>
            {score} <span className='font-sans text-base font-normal text-gray-700'>점</span>
          </p>
        </div>
      </div>
      <button
        type='button'
        className='w-[158px] h-[46px] flex items-center justify-center bg-gray-700 rounded-lg mt-6'
      >
        <img
          src='/icons/plusIcon.svg'
          alt='플러스 아이콘'
          className='mr-2'
        />
        <p className='font-sans font-medium text-background-input'>감정 추가하기</p>
      </button>
      <div className='relative mt-10'>
        <textarea
          placeholder='추가한 감정을 느낀 구절이나 생각을 남겨주세요.'
          className='w-full h-[200px] bg-gray-100 text-gray-900 rounded-2xl outline-none border-2 pt-6 pb-[47px] px-8 border-gray-300 hover:border-primary resize-none'
        />
        <p className='absolute bottom-[24px] right-[32px] text-sm text-gray-500'>0/1000</p>
      </div>
    </div>
  );
}
