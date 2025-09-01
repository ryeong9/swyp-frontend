'use client';

import { useSwiper } from './useSwiper';

interface SwiperProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function Swiper<T>({ items, renderItem }: SwiperProps<T>) {
  const itemsPerView = 5;
  const gap = 24;
  const itemWidth = 172;
  const itemHeight = 246;

  const { currentIndex, setCurrentIndex, pageCount, next, prev } = useSwiper(items?.length, {
    itemsPerView,
  });

  return (
    <div className='relative w-full flex justify-center overflow-hidden'>
      <div className='w-[956px] overflow-hidden'>
        <div
          className='flex transition-transform duration-500'
          style={{
            transform: `translateX(-${currentIndex * itemsPerView * (itemWidth + gap)}px)`,
            gap: `${gap}px`,
          }}
        >
          {items?.map((item, idx) => (
            <div
              key={idx}
              style={{ width: itemWidth, height: itemHeight, flexShrink: 0 }}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>

        {/* 화살표 */}
        {pageCount > 1 && (
          <>
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className='absolute left-4 top-[40%] disabled:opacity-30'
            >
              <img
                src='/icons/arrowLeft.svg'
                alt='왼쪽'
              />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= pageCount - 1}
              className='absolute right-4 top-[40%] disabled:opacity-30'
            >
              <img
                src='/icons/arrowLeft.svg'
                alt='오른쪽'
                className='rotate-180'
              />
            </button>
          </>
        )}

        {/* 페이지 닷 */}
        {pageCount > 1 && (
          <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2'>
            {Array.from({ length: pageCount }).map((_, idx) => (
              <div
                key={idx}
                className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
                  idx === currentIndex ? 'bg-[#5a5a5a]' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
