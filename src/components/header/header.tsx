'use client';

import { Suspense, useState } from 'react';
import SearchBar from './searchBar';
import ProfileDropDown from './profileDropDwon';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/icons/logoEntry.svg';

export default function Header() {
  const router = useRouter();
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  const handleClickMain = () => {
    router.push('/');
  };

  return (
    <div className='fixed w-full pt-6 pb-4 flex justify-center items-center z-20 bg-background'>
      <Logo
        width={167}
        height={38}
        className='mr-5'
        onClick={handleClickMain}
      />
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <div className='relative flex ml-[23px] pr-[23px] items-center'>
        <button
          type='button'
          className='w-[20px] h-[20px] cursor-pointer'
          onClick={() => setShowProfileDropDown((prev) => !prev)}
        >
          <img
            src='/icons/profile.svg'
            alt='프로필 아이콘'
          />
        </button>
        {showProfileDropDown && <ProfileDropDown />}
      </div>
    </div>
  );
}
