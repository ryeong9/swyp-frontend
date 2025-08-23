'use client';

import { useState } from 'react';
import './myBookHistory.css';
import { useRouter } from 'next/navigation';
import useGetRecordedData from '@/hooks/report/useGetRecordedData';
import { emotions } from '@/constants/emotion';

export default function MyBookHistory() {
  const router = useRouter();
  const { data: historyData } = useGetRecordedData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickWriteBtn = () => {
    router.push('/write');
  };

  if (!historyData || historyData.length === 0) {
    return (
      <div className='bg-background-input w-full h-[240px] rounded-[20px] p-10 mb-14 flex flex-col justify-center items-center'>
        <img
          src='/icons/noEmotionData.svg'
          alt='기록 없을 때 이모지'
          className='w-[60px] mb-2'
        />
        <p className='font-serif font-bold text-base text-gray-700 mb-6'>
          이 달의 감정 기록이 아직 없어요.
        </p>
        <button
          type='button'
          onClick={handleClickWriteBtn}
          className='w-[190px] h-[50px] bg-primary rounded-lg font-sans font-medium text-base text-background-input'
        >
          기록하기
        </button>
      </div>
    );
  }

  const groupSize = 3;
  const groups = Array.from({ length: Math.ceil(historyData.length / groupSize) }).map((_, idx) =>
    historyData.slice(idx * groupSize, idx * groupSize + groupSize),
  );

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, groups.length - 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className='relative w-full overflow-hidden'>
      <div
        className='flex transition-transform duration-500'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {groups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className='flex flex-col min-w-full pb-8'
          >
            {group.map((item, index) => (
              <div
                key={index}
                className='bg-background-input flex w-full h-[240px] rounded-[20px] mb-7 p-10 justify-between'
              >
                <section className='flex'>
                  <img
                    src={item.coverImageUrl}
                    alt='도서 표지 사진'
                    style={{
                      backgroundColor: '#D9D9D9',
                      width: '120px',
                      height: '160px',
                      borderRadius: '8px',
                    }}
                  />
                  <div className='flex flex-col w-[105px] justify-end ml-4'>
                    <p className='font-sans font-medium text-base mb-2 text-gray-900 truncate max-w-[105px]'>
                      {item.title}
                    </p>
                    <p className='font-sans font-medium text-sm mb-2 text-gray-700 truncate max-w-[105px]'>
                      {item.author}
                    </p>
                    <p className='font-sans text-xs text-gray-500 truncate max-w-[105px]'>
                      {item.category} &middot; {item.publisher} &middot; {item.pubDate}
                    </p>
                  </div>
                </section>
                <section className='w-[618px] ml-[91px]'>
                  <div className='flex justify-between items-center'>
                    <div className='flex font-sans'>
                      <p
                        className={`w-[72px] h-[33px] flex justify-center items-center rounded-sm font-medium ${
                          item.status === 'READING'
                            ? 'bg-primary-light text-primary-dark'
                            : 'bg-secondary text-[#94A8D2]'
                        }`}
                      >
                        {item.status === 'READING' ? '읽는 중' : '완료'}
                      </p>
                      {item.status === 'READING' &&
                        Number.isFinite(Number(item.currentPage)) &&
                        Number(item.currentPage) > 0 && (
                          <p className='w-[66px] h-[33px] flex justify-center items-center font-normal rounded-sm bg-gray-200 text-gray-700 ml-4'>
                            {Number(item.currentPage)}P
                          </p>
                        )}
                    </div>
                    <p className='font-sans text-xs text-gray-500'>
                      {item.createdAt.replace(/-/g, '.')}
                    </p>
                  </div>
                  {item.emotionStats.length === 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                      <img
                        src='/icons/noEmotionData.svg'
                        alt='감정 없음'
                        className='w-[60px] h-[57px] mb-4'
                      />
                      <p className='font-serif font-bold text-base leading-[25px] text-gray-700 text-center'>
                        아직 감정 기록이 없어요.
                        <br />
                        감정을 기록해 이 책의 기억을 완성해보세요.
                      </p>
                    </div>
                  ) : (
                    <div className='w-full h-[108px] grid grid-cols-5 gap-x-[79.5px] mt-[19px]'>
                      {item.emotionStats.slice(0, 5).map((emo) => {
                        const emotion = emotions.find((e) => e.id === emo.emotionId);
                        return (
                          <div
                            key={emo.emotionId}
                            className='flex flex-col w-[60px] items-center'
                          >
                            <img
                              src={emotion?.icon}
                              alt='감정 아이콘'
                              className='w-full h-[60px] mb-1'
                            />
                            <p className='font-sans text-sm text-gray-900 mb-2'>
                              {emo.emotionName}
                            </p>
                            <p className='font-sans text-base text-gray-900'>{emo.percentage}%</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 화살표 및 닷 */}
      {groups.length > 1 && (
        <>
          <button
            className={`absolute left-0 bottom-0 p-2 ${
              currentIndex === 0 ? 'opacity-30' : 'opacity-100'
            }`}
            onClick={prev}
            disabled={currentIndex === 0}
          >
            <img
              src='/icons/arrowLeft.svg'
              alt='왼쪽 화살표'
              className='w-[13px]'
            />
          </button>
          <button
            className={`absolute right-0 bottom-0 p-2 ${
              currentIndex === groups.length - 1 ? 'opacity-30' : 'opacity-100'
            }`}
            onClick={next}
            disabled={currentIndex === groups.length - 1}
          >
            <img
              src='/icons/arrowLeft.svg'
              alt='오른쪽 화살표'
              className='rotate-180 w-[13px]'
            />
          </button>
        </>
      )}
      <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center space-x-2'>
        {groups.map((_, idx) => (
          <div
            key={idx}
            className={`w-[10px] h-[10px] rounded-full ${
              idx === currentIndex ? 'bg-[#5a5a5a]' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
