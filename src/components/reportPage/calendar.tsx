'use client';

import './calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  return (
    <div className='bg-background-input p-10 my-14 rounded-3xl text-gray-900'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        firstDay={1}
        fixedWeekCount={false}
        // events={[
        //   { title: 'Event A', date: '2025-07-08' },
        //   { title: 'Event B', date: '2025-07-15' },
        //   { title: 'Event C', date: '2025-07-25' },
        // ]}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        titleFormat={(date) => {
          const year = date.date.year;
          const month = (date.date.month + 1).toString().padStart(2, '0');
          return `${year}.${month}`;
        }}
      />
      <div className='flex pl-2 mt-5'>
        <img
          src='/icons/RectangleStart.svg'
          alt='독서 시작 표시 색상'
          className='mr-2'
        />
        <span className='mr-8'>독서 시작</span>
        <img
          src='/icons/RectangleFinish.svg'
          alt='독서 완료 표시 색상'
          className='mr-2'
        />
        <span className='mr-8'>독서 완료</span>
        <img
          src='/icons/RectangleWrite.svg'
          alt='감정 기록 표시 색상'
          className='mr-2'
        />
        <span className='mr-8'>감정 기록</span>
        <img
          src='/icons/todayDot.svg'
          alt='오늘 표시 색상'
          className='mr-2'
        />
        <span className='mr-8'>오늘</span>
      </div>
    </div>
  );
}
