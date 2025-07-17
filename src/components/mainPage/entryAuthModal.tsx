'use client';

import { useRouter } from 'next/navigation';

export default function EntryAuthModal() {
  const router = useRouter();
  const handleClickGotoLogin = () => {
    router.push('/login');
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-20'>
      <div className='w-[820px] h-auto min-h-[25rem] flex'>
        <section className='relative w-1/2 py-12 px-[55px] bg-white rounded-l-2xl overflow-hidden'>
          <p className='font-serif font-bold text-base leading-[27px]'>
            Every book invites you into a story, but <br />
            it’s your emotions that make the journey unforgettable. They rise quietly between the
            lines, stirred by a single sentence or a moment of recognition. <br />
            <span className='shadow-[inset_0_-15px_0_#9BC99FCC]'>
              책은 덮어도, 감정은 계속 흘러요.
            </span>{' '}
            Even after the final page, those feelings continue to echo inside you.{' '}
            <span className='shadow-[inset_0_-15px_0_#9BC99FCC]'>
              찰나의 감정을 오래 꺼내볼 수 있도록 기록해요.
            </span>{' '}
            Because some <br />
            moments deserve to be revisited—again and again. And ‘till the end.
          </p>
          <div
            className='absolute w-[100px] h-[160px] right-[44px] top-0 bg-[#DEC7B5]/80 z-10'
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)' }}
          ></div>
        </section>
        <section className='w-1/2 flex flex-col justify-center items-center py-12 px-[55px] bg-gray-200 rounded-r-2xl'>
          <img className='w-[300px] h-[238px] bg-gray-300' />
          <button
            onClick={handleClickGotoLogin}
            className='w-full mt-4 px-6 py-3 bg-primary rounded-lg font-sans font-medium text-base text-white'
          >
            로그인/회원가입 하기
          </button>
        </section>
      </div>
    </div>
  );
}
