'use client';

import './calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { emotions } from '@/constants/emotion';

// 목데이터
const calendarData = [
  {
    date: '2025-08-01',
    books: [
      {
        isbn: '9791159031076',
        title: '초판본 데미안 (양장) - 1919년 오리지널 초판본 표지디자인',
        coverImage: 'https://image.aladin.co.kr/product/8554/35/coversum/s362636012_1.jpg',
        status: 'READING',
        emotionsId: [],
        startDate: true,
        finishDate: false,
      },
      {
        isbn: '9788937460449',
        title: '데미안',
        coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
        status: 'READING',
        emotionsId: [],
        startDate: true,
        finishDate: false,
      },
    ],
  },
  {
    date: '2025-08-03',
    books: [
      {
        isbn: '9791164456338',
        title:
          '초판본 데미안 (리커버 한정판, 패브릭 양장) - 헤르만 헤세 탄생 140주년 기념 초호화 패브릭 양장',
        coverImage: 'https://image.aladin.co.kr/product/31193/52/coversum/k722831955_1.jpg',
        status: 'READING',
        emotionsId: [1, 4, 5],
        startDate: true,
        finishDate: true,
      },
      {
        isbn: '9791173074684',
        title: '데미안',
        coverImage: 'https://image.aladin.co.kr/product/35371/7/coversum/k952035406_1.jpg',
        status: 'READING',
        emotionsId: [],
        startDate: true,
        finishDate: false,
      },
    ],
  },
  {
    date: '2025-08-04',
    books: [
      {
        isbn: '9788954620147',
        title: '데미안 (무선)',
        coverImage: 'https://image.aladin.co.kr/product/2174/21/coversum/8954620140_3.jpg',
        status: 'READING',
        emotionsId: [5, 6, 9, 3, 19],
        startDate: true,
        finishDate: false,
      },
      {
        isbn: '9788997213795',
        title: '데미안 - 전2권 (한글판 + 영문판)',
        coverImage: 'https://image.aladin.co.kr/product/2031/50/coversum/8997213792_1.jpg',
        status: 'READING',
        emotionsId: [],
        startDate: true,
        finishDate: true,
      },
    ],
  },
];

export default function Calendar() {
  // 날짜별 데이터 매핑
  const getDayData = (dateStr: string) => {
    return calendarData.find((item) => item.date === dateStr);
  };

  return (
    <div className='bg-background-input p-10 my-14 rounded-3xl text-gray-900'>
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
        titleFormat={(date) => {
          const year = date.date.year;
          const month = (date.date.month + 1).toString().padStart(2, '0');
          return `${year}.${month}`;
        }}
        dayCellDidMount={(info) => {
          const dateStr = info.date.toLocaleDateString('sv-SE');
          const dayData = getDayData(dateStr);

          if (!dayData) return;

          const firstBook = dayData.books[0];
          const cellRoot = info.el as HTMLElement; // <td> 요소
          const cellFrame = info.el.querySelector('.fc-daygrid-day-frame') as HTMLElement; // 셀 내부

          // 기존 상태 클래스 제거
          cellRoot.classList.remove('cell-start', 'cell-emotion', 'cell-complete');
          cellFrame.classList.remove('cell-start', 'cell-emotion', 'cell-complete');

          // wrapper 초기화
          const wrapper = document.createElement('div');
          wrapper.style.display = 'flex';
          wrapper.style.flexDirection = 'column';
          wrapper.style.alignItems = 'center';
          wrapper.style.justifyContent = 'center';

          // -- 독서 완료
          if (firstBook.finishDate) {
            cellRoot.classList.add('cell-complete');
            cellFrame.classList.add('cell-complete');
            cellFrame.style.backgroundColor = '#d2def4';

            // 책 표지
            const cover = document.createElement('img');
            cover.src = firstBook.coverImage;
            cover.className = 'book-cover';
            wrapper.appendChild(cover);

            // 감정 아이콘
            if (firstBook.emotionsId && firstBook.emotionsId.length > 0) {
              const emotionsWrapper = document.createElement('div');
              emotionsWrapper.className = 'emotions';
              firstBook.emotionsId.forEach((id) => {
                const emotion = emotions.find((e) => e.id === id);
                if (!emotion) return;
                const emo = document.createElement('img');
                emo.src = emotion.icon;
                emo.alt = emotion.name;
                emo.className = 'emotion-icon';
                emotionsWrapper.appendChild(emo);
              });
              wrapper.appendChild(emotionsWrapper);
            }

            // -- 읽는 중 + 감정 있음
          } else if (firstBook.startDate && firstBook.emotionsId.length > 0) {
            cellRoot.classList.add('cell-emotion');
            cellFrame.classList.add('cell-emotion');
            cellFrame.style.backgroundColor = '#E6F2E6';

            // 책 표지
            const cover = document.createElement('img');
            cover.src = firstBook.coverImage;
            cover.className = 'book-cover';
            wrapper.appendChild(cover);

            // 감정 아이콘
            const emotionsWrapper = document.createElement('div');
            emotionsWrapper.className = 'emotions';
            firstBook.emotionsId.forEach((id) => {
              const emotion = emotions.find((e) => e.id === id);
              if (!emotion) return;
              const emo = document.createElement('img');
              emo.src = emotion.icon;
              emo.alt = emotion.name;
              emo.className = 'emotion-icon';
              emotionsWrapper.appendChild(emo);
            });
            wrapper.appendChild(emotionsWrapper);

            // -- 읽는 중 + 감정 없음 (독서 시작)
          } else if (firstBook.startDate) {
            cellRoot.classList.add('cell-start');
            cellFrame.classList.add('cell-start');
            cellFrame.style.backgroundColor = '#9bc99f';

            // 책 표지
            const cover = document.createElement('img');
            cover.src = firstBook.coverImage;
            cover.className = 'book-cover';
            wrapper.appendChild(cover);
          }

          // wrapper를 셀에 추가
          cellFrame.appendChild(wrapper);
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
