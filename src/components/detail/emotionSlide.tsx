'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { emotions } from '@/constants/emotion';
import './emotionSlide.css';
import { useState } from 'react';

interface EmotionData {
  id: number;
  scoreSum: number;
}

interface EmotionSwiperProps {
  emotionList: EmotionData[];
  emotionLength: number;
}

function formatScore(score: number): string {
  if (score < 1000) return score.toLocaleString();
  const kValue = (score / 1000).toFixed(1); // 소수점 1자리
  return `${kValue.replace('.0', '')}k`; // .0 제거
}

export default function EmotionSwiper({ emotionList, emotionLength }: EmotionSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 점수 순 정렬
  const sortedEmotions = [...emotionList].sort((a, b) => (b.scoreSum ?? 0) - (a.scoreSum ?? 0));

  // 6개씩 페이지 나누기
  const pageSize = 6;
  const emotionPages = Array.from({ length: Math.ceil(sortedEmotions.length / pageSize) }).map(
    (_, idx) => sortedEmotions.slice(idx * pageSize, idx * pageSize + pageSize),
  );

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, emotionPages.length - 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className='relative w-full h-[240px] overflow-hidden'>
      <div
        className='flex transition-transform duration-500'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {emotionPages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className='grid grid-cols-6 gap-4 min-w-full'
          >
            {page.map((emotionData, index) => {
              const emotion = emotions.find((em) => em.id === emotionData.id);
              const globalRank = pageIndex * pageSize + index + 1;
              if (!emotion) return null;

              let badgeColor = 'text-gray-700';
              if (globalRank === 1) badgeColor = 'text-[#FFD324]';
              else if (globalRank === 2) badgeColor = 'text-[#B2B2B2]';
              else if (globalRank === 3) badgeColor = 'text-[#B87F3D]';

              return (
                <div
                  key={emotion.id}
                  className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-6 py-4 gap-2 flex flex-col items-start justify-center'
                >
                  <p className={`text-sm font-semibold mb-2 ${badgeColor} self-start`}>
                    #{globalRank}
                  </p>
                  <Image
                    src={emotion.icon}
                    alt={emotion.name}
                    width={80}
                    height={80}
                    className='mx-auto'
                  />
                  <p className='text-sm text-center w-full'>{emotion.name}</p>
                  <p className='text-xs text-gray-700 text-center w-full'>
                    {formatScore(emotionData.scoreSum)}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 화살표 및 닷 */}
      {emotionPages.length > 1 && (
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
              currentIndex === emotionPages.length - 1 ? 'opacity-30' : 'opacity-100'
            }`}
            onClick={next}
            disabled={currentIndex === emotionPages.length - 1}
          >
            <img
              src='/icons/arrowLeft.svg'
              alt='오른쪽 화살표'
              className='rotate-180 w-[13px]'
            />
          </button>
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2'>
            {emotionPages.map((_, idx) => (
              <div
                key={idx}
                className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
                  idx === currentIndex ? 'bg-[#5a5a5a]' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
