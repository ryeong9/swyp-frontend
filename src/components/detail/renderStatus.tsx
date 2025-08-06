// components/detail/ReadingStatusTag.tsx

'use client';

import Image from 'next/image';

type Status = 'NONE' | 'WISH' | 'READING' | 'FINISHED';

interface Props {
  status: Status;
}

const ReadingStatusTag = ({ status }: Props) => {
  if (status === 'FINISHED') {
    return (
      <button className='flex flex-row items-center w-[88px] h-[50px] bg-primary-lightblue rounded-lg px-5 py-2.5 gap-2.5 text-state-success'>
        <Image
          src='/icons/completeRead.svg'
          alt='완료'
          width={16.76}
          height={24}
        />
        <span className='text-xs'>완료</span>
      </button>
    );
  }

  if (status === 'READING') {
    return (
      <button className='flex flex-row items-center w-[88px] h-[50px] bg-primary-lightblue rounded-lg px-5 py-2.5 gap-2.5 text-state-success'>
        <Image
          src='/icons/completeRead.svg'
          alt='읽는 중'
          width={16.76}
          height={24}
        />
        <span className='text-xs'>읽는 중</span>
      </button>
    );
  }

  return (
    <button className='flex flex-row items-center w-[88px] h-[50px] bg-primary-lightblue rounded-lg px-5 py-2.5 gap-2.5 text-gray-500'>
      <Image
        src='/icons/noIndex.svg'
        alt='인덱스 없음'
        width={16.76}
        height={24}
      />
      <span className='text-xs'>인덱스 없음</span>
    </button>
  );
};

export default ReadingStatusTag;
