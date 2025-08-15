'use client';

import './calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { emotions } from '@/constants/emotion';
import useGetCalendarData from '@/hooks/report/useGetCalendarData';
import { useEffect, useState } from 'react';

export default function Calendar() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const { data: calendarData } = useGetCalendarData(year, month);

  // 날짜별 데이터 매핑
  const getDayData = (dateStr: string) => {
    return calendarData?.find((item) => item.date === dateStr);
  };

  useEffect(() => {
    if (!calendarData) return;

    // DOM 조작을 브라우저 렌더링 후로 미룸 (FullCalendar가 DOM을 다 그린 후에 셀 커스텀)
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('.fc-daygrid-day').forEach((cell) => {
        const dateStr = cell.getAttribute('data-date');
        const dayData = getDayData(dateStr || '');
        const cellFrame = cell.querySelector('.fc-daygrid-day-frame') as HTMLElement;
        if (!cellFrame || !dayData) return;

        // 기존 클래스만 초기화 (innerHTML 초기화 금지)
        cell.classList.remove('cell-start', 'cell-emotion', 'cell-complete');
        cellFrame.classList.remove('cell-start', 'cell-emotion', 'cell-complete');

        // 첫번째 책 + 같은 책을 새롭게 다시 기록하면, startDate false로 보냄(백엔드에서)
        const firstBook = { ...dayData.books[0] };
        if (firstBook.status === 'READING') {
          firstBook.startDate = true;
        }

        // wrapper가 이미 있다면 재사용
        let wrapper = cellFrame.querySelector('.custom-wrapper') as HTMLDivElement;
        if (!wrapper) {
          wrapper = document.createElement('div');
          wrapper.className = 'custom-wrapper';
          wrapper.style.display = 'flex';
          wrapper.style.flexDirection = 'column';
          wrapper.style.alignItems = 'center';
          wrapper.style.justifyContent = 'center';
          wrapper.style.paddingTop = '9px';
          cellFrame.appendChild(wrapper);
        } else {
          wrapper.innerHTML = '';
        }

        // 다 읽은 날 배경색
        if (firstBook.finishDate) {
          cell.classList.add('cell-complete');
          cellFrame.classList.add('cell-complete');
          cellFrame.style.backgroundColor = '#d2def4';
        } else if (firstBook.startDate && firstBook.emotionsId.length > 0) {
          // 읽는 중 + 감정 기록 o 배경색
          cell.classList.add('cell-emotion');
          cellFrame.classList.add('cell-emotion');
          cellFrame.style.backgroundColor = '#E6F2E6';
        } else if (firstBook.startDate) {
          // 읽는 중 + 감정 기록 x 배경색
          cell.classList.add('cell-start');
          cellFrame.classList.add('cell-start');
          cellFrame.style.backgroundColor = '#9bc99f';
        }

        // 책 표지
        const cover = document.createElement('img');
        cover.src = firstBook.coverImage;
        cover.className = 'book-cover';
        wrapper.appendChild(cover);

        // 감정 아이콘
        if (firstBook.emotionsId.length > 0) {
          const emotionsWrapper = document.createElement('div');
          emotionsWrapper.className = 'emotions';

          firstBook.emotionsId.slice(0, 5).forEach((id) => {
            const emotion = emotions.find((e) => e.id === id);
            if (!emotion) return;
            const emo = document.createElement('img');
            emo.src = emotion.icon;
            emo.alt = emotion.name;
            emo.className = 'emotion-icon';
            emotionsWrapper.appendChild(emo);
          });
          wrapper.appendChild(emotionsWrapper);
        } else {
          // 감정이 없으면 텍스트 추가
          const noEmotionText = document.createElement('p');
          noEmotionText.innerText = '감정은 비워뒀어요.';
          noEmotionText.style.marginTop = '8px';
          noEmotionText.style.fontSize = '12px';
          noEmotionText.style.fontFamily = '"Gowun Batang", serif';
          noEmotionText.style.color = '#6B7280';
          noEmotionText.style.textAlign = 'center';
          wrapper.appendChild(noEmotionText);
        }
      });
    });
  }, [calendarData]);

  return (
    <div className='bg-background-input p-10 mb-14 mt-[125px] rounded-3xl text-gray-900'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        firstDay={1}
        aspectRatio={1}
        fixedWeekCount={false}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        datesSet={(arg) => {
          const current = arg.view.currentStart;
          setYear(current.getFullYear());
          setMonth(current.getMonth() + 1);
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
