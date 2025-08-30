'use client';

import useGetOnlyDeskData from '@/hooks/write/useGetOnlyDeskData';
import { Book, RecordDataState } from '@/types';
import { useState } from 'react';

interface BookModalProps {
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
  setShowSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (data: Partial<RecordDataState>) => void;
}

export default function BookModal({
  setSelectedBook,
  setShowSelectModal,
  onChange,
}: BookModalProps) {
  const { data: deskData } = useGetOnlyDeskData();
  const [tempSelectedBook, setTempSelectedBook] = useState<Book | null>(null);

  const handleClickAddBtn = () => {
    setSelectedBook(tempSelectedBook);
    onChange({ isbn: tempSelectedBook?.isbn });
    setShowSelectModal(false);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-40'>
      <div className='w-[763px] h-[740px] bg-background-input rounded-2xl'>
        <div className='relative pt-[58px] px-[56px] pb-2 bg-background-input drop-shadow-sm rounded-t-2xl'>
          <button
            type='button'
            className='absolute top-6 right-6 cursor-pointer'
            onClick={() => setShowSelectModal((prev) => !prev)}
          >
            <img
              src='/icons/closeIcon.svg'
              alt='닫기 아이콘'
            />
          </button>
          <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>
            책 선택
          </h2>
          <p className='font-sans text-base text-gray-500 leading-[25px]'>
            나의 책상에서 기록할 책을 선택해주세요.
          </p>
        </div>
        {deskData?.length === 0 ? (
          <div className='w-full h-[503px] flex flex-col items-center justify-center'>
            <img
              src='/icons/noEmotionData.svg'
              alt='데이터 없을 때 아이콘'
              className='w-[101px] h-[96px] mb-8'
            />
            <p className='font-serif font-bold text-base text-gray-700 text-center leading-[25px]'>
              추가할 책이 없어요.
              <br /> 책을 검색해서 책상에 넣어주세요.
            </p>
          </div>
        ) : (
          <div className='h-[503px] overflow-y-scroll'>
            <div className='grid grid-cols-5 justify-items-center py-5 px-11 bg-background-input'>
              {deskData?.map((item) => (
                <div
                  key={item.isbn}
                  className={`w-[135px] flex flex-col justify-center p-3 rounded-lg cursor-pointer ${tempSelectedBook?.isbn === item.isbn ? 'bg-[#E6F2E6]' : ''}`}
                  onClick={() => {
                    setTempSelectedBook(item);
                  }}
                >
                  <img
                    src={item.coverImageUrl}
                    alt='표지 사진'
                    className='w-[111px] h-[160px] mb-2'
                  />
                  <p className='font-sans font-medium text-base text-gray-900 mb-1 truncate w-[111px]'>
                    {item.title}
                  </p>
                  <p className='font-sans font-medium text-sm text-gray-700 truncate w-[111px]'>
                    {item.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='flex justify-center'>
          <button
            onClick={handleClickAddBtn}
            className={`w-[300px] h-[50px] font-sans font-medium text-base rounded-lg mt-5 cursor-pointer ${!tempSelectedBook ? 'bg-gray-300 text-gray-500' : 'bg-primary text-background-input '}`}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
