'use client';

import BookReport from './bookReport';
import BookShelfSection from './bookShelfSection';
import DeskSection from './deskSection';
import Header from '../header/header';
import HeroSection from './heroSection';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    <div className='relative'>
      <Header />
      <div className='w-[1030px] flex flex-col mx-auto'>
        <HeroSection />
        {/* <DeskSection /> */}
        <BookShelfSection />
        <BookReport />
      </div>
      <div className='w-full h-[435px] bg-[#383838] mt-[114px] py-14 px-[100px]'>
        <div className='flex justify-between mb-10'>
          <div className=''>
            <img
              src='/icons/logoFooter.svg'
              alt='로고 초록색'
              className='mb-4'
            />
            <p className='mb-[100px] font-serif font-bold leading-[25px] text-base text-background'>
              찰나의 감정을 오래 꺼내볼 수 있도록 기록해요.
              <br />
              인덱스가 그 순간들을 모아드릴게요.
            </p>
            <div className='flex'>
              <section className='mr-[52px] flex flex-col'>
                <h2 className='font-sans font-semibold text-sm text-background-input leading-[15px] tracking-wider mb-4'>
                  Team INDEX (2025)
                </h2>
                <div className='flex'>
                  <p className='font-sans font-normal text-sm text-background-input leading-[15px] tracking-wider'>
                    <span className='font-medium mr-2'>PM</span>
                    정환욱
                  </p>
                  <p className='font-sans text-sm text-background-input leading-[15px] tracking-wider'>
                    <span className='font-medium ml-4 mr-2'>UI/UX</span>
                    정다희<span className='ml-2'>채준병</span>
                  </p>
                </div>
                <div className='flex mt-2'>
                  <p className='font-sans text-sm text-background-input leading-[15px] tracking-wider'>
                    <span className='font-medium mr-2'>FE</span>
                    김민희<span className='ml-2'>최성령</span>
                  </p>
                  <p className='font-sans text-sm text-background-input leading-[15px] tracking-wider'>
                    <span className='font-medium ml-4 mr-2'>BE</span>
                    나현오<span className='ml-2'>박영찬</span>
                    <span className='ml-2'>이동주</span>
                  </p>
                </div>
              </section>
              <section className='flex flex-col justify-between'>
                <div className='flex items-center'>
                  <img
                    src='/icons/mailIcon.svg'
                    alt='이메일 아이콘'
                  />
                  <a
                    href='mailto:udown0109@gmail.com'
                    className='ml-2 font-sans text-sm text-background-input leading-[15px] tracking-wider'
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
                    className='ml-2 font-sans text-sm text-background-input leading-[15px] tracking-wider'
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
        <p className='text-center font-sans text-xs text-[#94A8D2] leading-[15px] tracking-wider'>
          © 2025 INDEX. All rights reserved.
        </p>
      </div>
      <div className='fixed bottom-[60px] right-[205px] flex flex-col items-end drop-shadow-sm'>
        {showSpeechBubble && (
          <div className='flex flex-col items-end relative -top-4 -right-3'>
            <div className='relative w-[321px] h-[150px] bg-background-input rounded-2xl p-8'>
              <button
                type='button'
                className='w-[10px] absolute top-4 right-4'
                onClick={handleClickCloseBubble}
              >
                <img
                  src='/icons/closeIcon.svg'
                  alt='닫기 아이콘'
                />
              </button>
              <h2 className='font-serif font-bold text-xl text-gray-900'>
                당신의 감정을 들려주세요.
              </h2>
              <p className='font-serif font-normal text-base leading-[25px] mt-[10px]'>
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
        >
          <img
            src='icons/plusIcon.svg'
            alt='글쓰기 버튼'
            className='w-[60px] h-[60px] bg-primary rounded-full p-[15px]'
          />
        </button>
      </div>
    </div>
  );
}
