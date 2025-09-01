'use client';

import Image from 'next/image';
import { emotions } from '@/constants/emotion';
import { useSwiper } from '../swiper/useSwiper';

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
  // 점수 순 정렬
  const sortedEmotions = [...emotionList].sort((a, b) => (b.scoreSum ?? 0) - (a.scoreSum ?? 0));

  // 6개씩 페이지 나누기
  const groupSize = 6;
  const { currentIndex, setCurrentIndex, pageCount, next, prev } = useSwiper(
    sortedEmotions.length,
    {
      groupSize,
    },
  );

  const pages = Array.from({ length: pageCount }).map((_, idx) =>
    sortedEmotions.slice(idx * groupSize, idx * groupSize + groupSize),
  );

  return (
    <div className='relative w-full h-[240px] overflow-hidden'>
      <div
        className='flex transition-transform duration-500'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className='grid grid-cols-6 gap-x-[33.2px] min-w-full'
          >
            {page.map((emotionData, index) => {
              const emotion = emotions.find((em) => em.id === emotionData.id);
              const globalRank = pageIndex * groupSize + index + 1;
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
      {pageCount > 1 && (
        <>
          <button
            className='absolute left-0 bottom-0 p-2 disabled:opacity-30'
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
            onClick={next}
            disabled={currentIndex === pageCount - 1}
            className='absolute right-0 bottom-0 p-2 disabled:opacity-30'
          >
            <img
              src='/icons/arrowLeft.svg'
              alt='오른쪽 화살표'
              className='rotate-180 w-[13px]'
            />
          </button>
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
            {pages.map((_, idx) => (
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
