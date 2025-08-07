// components/detail/EmotionSwiper.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { emotions } from '@/constants/emotion';

// import './emotionSlide.css';
import '@/components/reportPage/myBookHistory.css';
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
  const sortedEmotions = [...emotionList].sort((a, b) => (b.scoreSum ?? 0) - (a.scoreSum ?? 0));
  const emotionPages = Array.from({ length: Math.ceil(sortedEmotions.length / 6) }).map(
    (_, index) => sortedEmotions.slice(index * 6, index * 6 + 6),
  );

  console.log('emotionLength:', emotionLength);
  console.log('emotionList:', emotionList);

  return (
    <div className='w-full relative'>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={emotionLength >= 1 ? { clickable: true } : false}
        navigation={emotionLength >= 1}
        className='w-full'
      >
        {emotionPages.map((page, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className='grid grid-cols-6 gap-4'>
              {page.map((emotionData, index) => {
                const emotion = emotions.find((em) => em.id === emotionData.id);
                const globalRank = pageIndex * 6 + index + 1;
                if (!emotion) return null;

                let badgeColor = 'text-gray-700';
                if (globalRank === 1) badgeColor = 'text-[#FFD324]';
                else if (globalRank === 2) badgeColor = 'text-[#B2B2B2]';
                else if (globalRank === 3) badgeColor = 'text-[#B87F3D]';

                return (
                  <div
                    key={emotion.id}
                    className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-6 py-4 gap-2 flex flex-col items-start justify-center' // items-center -> items-start로 왼쪽 정렬
                  >
                    <p className={`text-sm font-semibold mb-2 ${badgeColor} self-start text-left`}>
                      #{globalRank}
                    </p>{' '}
                    {/* self-start 추가 */}
                    <Image
                      src={emotion.icon}
                      alt={emotion.name}
                      width={80}
                      height={80}
                      className='mx-auto' // 아이콘만 중앙
                    />
                    <p className='text-sm text-center w-full'>{emotion.name}</p> {/* 이름 중앙 */}
                    <p className='text-xs text-gray-700 text-center w-full'>
                      {formatScore(emotionData.scoreSum)}
                    </p>
                    {/* 점수 중앙 */}
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
