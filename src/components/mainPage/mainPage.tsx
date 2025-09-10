'use client';

import BookReport from './bookReport';
import BookShelfSection from './bookShelfSection';
import DeskSection from './deskSection';
import Header from '../header/header';
import HeroSection from './heroSection';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RecommendSection from './recommendSection';
import WishBookSection from './wishBookSection';
import Logo from '@/assets/icons/logoEntry.svg';
import PlusIcon from '@/assets/icons/plusIcon.svg';
import CloseIcon from '@/assets/icons/closeIcon.svg';

export default function MainPage() {
  const router = useRouter();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  const hideName = 'hideSpeechBubble';
  const hideDay = 24 * 60 * 60 * 1000;

  function isHidden(): boolean {
    try {
      const until = Number(localStorage.getItem(hideName) || '0');
      return until > Date.now();
    } catch {
      return false;
    }
  }

  function hideForOneDay() {
    try {
      const oneDayLater = Date.now() + hideDay;
      localStorage.setItem(hideName, String(oneDayLater));
    } catch {}
  }

  useEffect(() => {
    setShowSpeechBubble(!isHidden());
  }, []);

  const handleClickCloseBubble = () => {
    hideForOneDay();
    setShowSpeechBubble(false);
  };

  return (
    <div className='relative flex flex-col items-center'>
      <Header />
      <div className='w-[1030px] flex flex-col mx-auto'>
        <HeroSection />
        <BookReport />
        <DeskSection />
        <BookShelfSection />
        <WishBookSection />
        <RecommendSection />
      </div>
      <div className='w-full h-[371px] pt-14 px-[100px] border-t border-t-gray-300'>
        <div className='flex justify-between mb-10'>
          <div>
            <Logo
              width={137}
              height={33}
              className='mb-4 text-primary'
            />
            <p className='mb-[60px] font-serif font-bold leading-[25px] text-base text-gray-900'>
              찰나의 감정을 오래 꺼내볼 수 있도록 기록해요.
              <br />
              인덱스가 그 순간들을 모아드릴게요.
            </p>
            <div className='flex'>
              <section className='mr-[52px] flex flex-col font-sans text-gray-700 leading-[15px] tracking-wider'>
                <h2 className='font-semibold text-sm mb-4'>Team INDEX (2025)</h2>
                <div className='flex'>
                  <p className='font-normal text-sm'>
                    <span className='font-medium mr-2'>PM</span>
                    정환욱
                  </p>
                  <p className='text-sm'>
                    <span className='font-medium ml-4 mr-2'>UI/UX</span>
                    정다희<span className='ml-2'>채준병</span>
                  </p>
                </div>
                <div className='flex mt-2'>
                  <p className='text-sm'>
                    <span className='font-medium mr-2'>FE</span>
                    김민희<span className='ml-2'>최성령</span>
                  </p>
                  <p className='text-sm'>
                    <span className='font-medium ml-4 mr-2'>BE</span>
                    나현오<span className='ml-2'>박영찬</span>
                    <span className='ml-2'>이동주</span>
                  </p>
                </div>
              </section>
              <section className='flex flex-col justify-between font-sans text-sm text-gray-700 leading-[15px] tracking-wider'>
                <div className='flex items-center'>
                  <img
                    src='/icons/mailIcon.svg'
                    alt='이메일 아이콘'
                  />
                  <a
                    href='mailto:udown0109@gmail.com'
                    className='ml-2'
                  >
                    udown0109@gmail.com
                  </a>
                </div>
                <div className='flex items-center mt-4'>
                  <img
                    src='/icons/githubIcon.svg'
                    alt='깃허브 아이콘'
                  />
                  <a
                    href='https://github.com/SWYP-index'
                    className='ml-2'
                  >
                    https://github.com/SWYP-index
                  </a>
                </div>
              </section>
            </div>
          </div>
          <div className='flex items-end'>
            <img
              src='/icons/emotion/positiveIcon.svg'
              alt='긍정 아이콘'
              className='w-[82px] h-[82px]'
            />
            <img
              src='/icons/emotion/negativeIcon.svg'
              alt='부정 아이콘'
              className='w-[82px] h-[82px]'
            />
            <img
              src='/icons/emotion/neutralityIcon.svg'
              alt='중립 아이콘'
              className='w-[82px] h-[82px]'
            />
            <img
              src='/icons/emotion/thoughtIcon.svg'
              alt='사고기반 아이콘'
              className='w-[82px] h-[82px]'
            />
          </div>
        </div>
        <p className='text-center font-sans text-xs text-gray-700 leading-[15px] tracking-wider pb-8'>
          © 2025 INDEX. All rights reserved.
        </p>
      </div>
      <div className='fixed bottom-[60px] right-[205px] flex flex-col items-end drop-shadow-sm z-10'>
        {showSpeechBubble && (
          <div className='flex flex-col items-end relative -top-4 -right-3'>
            <div className='relative w-[288px] h-[140px] bg-background-input rounded-2xl p-8'>
              <button
                type='button'
                className='w-[10px] absolute top-4 right-4 cursor-pointer'
                onClick={handleClickCloseBubble}
              >
                <CloseIcon
                  width={10}
                  height={10}
                  className='text-gray-300'
                />
              </button>
              <h2 className='font-serif font-bold text-lg text-gray-900'>
                당신의 감정을 들려주세요.
              </h2>
              <p className='font-serif font-normal text-sm mt-[10px]'>
                기록은 습관이 될수록 더 깊어져요. <br />
                하루 인덱스 하나, 한 줄이면 충분해요.
              </p>
            </div>
            <img
              src='/icons/polygon.svg'
              alt='말풍선 삼각형'
              className='w-[35px] relative right-[26px] -top-1 rotate-180'
            />
          </div>
        )}
        <button
          type='button'
          onClick={() => router.push('/write')}
          className='z-50 cursor-pointer'
        >
          <PlusIcon
            width={60}
            height={60}
            className='text-background-input bg-primary rounded-full p-[15px]'
          />
        </button>
      </div>
    </div>
  );
}
