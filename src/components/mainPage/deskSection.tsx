'use client';

import { useState } from 'react';

export default function DeskSection() {
  const data = [
    { type: 'reading', book: { id: 1, title: '읽는 중1' } },
    { type: 'reading', book: { id: 2, title: '읽는 중2' } },
    { type: 'recommend', book: { id: 3, title: '추천1' } },
    { type: 'recommend', book: { id: 4, title: '추천2' } },
    { type: 'recommend', book: { id: 5, title: '추천3' } },
  ];

  const [active, setActive] = useState(2);
  return (
    <div className='flex flex-col'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책상</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금 읽고 있는 책과 추천 책을 책상 위에 올려놔 보았어요
          </p>
          <button className='flex'>
            <p className='font-sans text-xs text-gray-500 mr-2'>더 보기</p>
            <img
              src='/icons/arrowRight.svg'
              alt='오른쪽 화살표'
            />
          </button>
        </div>
      </div>
      <div>
        <div className='flex justify-between items-center mb-6 px-[27px]'>
          {data.map((item, index) => {
            const isActive = index === active;
            return (
              <div
                key={item.book.id}
                className={`w-[172px] h-[246px] bg-gray-500 rounded-[8px] ${isActive ? 'w-[220px] h-[290px] drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]' : 'w-[172px] h-[246px]'} transition duration-300`}
                onClick={() => setActive(index)}
              >
                {item.book.title}
              </div>
            );
          })}
        </div>
        <div className='flex justify-center w-full gap-2'>
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`w-[8px] h-[8px] rounded-full transition
              ${index === active ? 'bg-gray-700 scale-110' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
