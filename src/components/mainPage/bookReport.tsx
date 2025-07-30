'use client';

import { useRouter } from 'next/navigation';

export default function BookReport() {
  const router = useRouter();
  const handleClickMoreBtn = () => {
    router.push('/report');
  };

  return (
    <div className='flex flex-col mb-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>
          독서 리포트
        </h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금까지의 기록들을 바탕으로 리포트를 작성해보았어요
          </p>
          <button
            type='button'
            className='flex cursor-pointer'
            onClick={handleClickMoreBtn}
          >
            <p className='font-sans text-xs text-gray-500 mr-2'>더 보기</p>
            <img
              src='/icons/arrowRight.svg'
              alt='오른쪽 화살표'
            />
          </button>
        </div>
      </div>
      <div>
        <section className='w-full h-[400px] bg-background-input rounded-3xl mb-6'></section>
        <div className='flex'>
          <section className='w-[505px] h-[400px] bg-background-input rounded-3xl mr-5'></section>
          <section className='w-[505px] h-[400px] bg-background-input rounded-3xl'></section>
        </div>
      </div>
    </div>
  );
}
