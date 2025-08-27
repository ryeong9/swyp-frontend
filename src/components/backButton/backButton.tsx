'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleClickBack}
      className='w-[75px] h-[22px] flex mt-[130px] cursor-pointer'
    >
      <img
        src='/icons/arrowLeft.svg'
        alt='왼쪽 화살표'
      />
      <p className='font-sans text-base text-gray-500 ml-2'>뒤로가기</p>
    </div>
  );
}
