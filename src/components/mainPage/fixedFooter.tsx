'use client';

import { useRouter } from 'next/navigation';

export default function FixedFooter() {
  const router = useRouter();
  const handleClickGotoWriteBtn = () => {
    router.push('/write');
  };

  return (
    <div className='fixed bottom-0 h-[177px] py-[38.5px] px-[310px] bg-background-input z-10'>
      <div className='flex w-[820px] h-[100px] items-center'>
        <img
          src='/'
          alt='로고?'
          className='w-[189px] h-[97px] bg-gray-200 my-0.5'
        />
        <div className='w-[295px] flex flex-col py-0.5 ml-[18px]'>
          <p className='font-serif font-bold text-gray-900 text-2xl'>당신의 감정을 들려주세요</p>
          <p className='font-sans font-medium text-gray-700 text-base mt-2 leading-[25px]'>
            기록은 습관이 될수록 더 깊어져요.
            <br />
            하루 인덱스 하나, 한 줄이면 충분해요.
          </p>
        </div>
        <button
          onClick={handleClickGotoWriteBtn}
          className='w-[300px] h-[50px] rounded-lg bg-primary text-background-input font-sans font-medium ml-[18px] text-base'
        >
          기록하러 가기
        </button>
      </div>
    </div>
  );
}
