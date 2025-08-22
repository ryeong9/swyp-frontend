'use client';

import { emotions } from '@/constants/emotion';
import useDeleteRecords from '@/hooks/read/useDeleteRecords';
import useGetAllRecords from '@/hooks/read/useGetAllRecords';
import { Book } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ReadPageContent({ setBook }: { setBook: (b: Book) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookParam = searchParams.get('book');
    if (bookParam) {
      const book = JSON.parse(decodeURIComponent(bookParam)) as Book;
      setBook(book);
    }
  }, [searchParams, setBook]);

  return null;
}

export default function ReadPage() {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  const { data: allRecords } = useGetAllRecords(book?.bookshelfId);

  const handleClickUpdateBtn = (
    recordId: number,
    bookshelfId: number,
    status: string,
    isbn: string,
  ) => {
    router.push(
      `/update?recordId=${recordId}&bookshelfId=${bookshelfId}&status=${status}&isbn=${isbn}`,
    );
  };

  const [deleteTarget, setDeleteTarget] = useState<{
    status: string;
    recordId: number;
    bookshelfId: number;
  } | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClickDeleteConfirm = (status: string, recordId: number, bookshelfId: number) => {
    setDeleteTarget({ status, recordId, bookshelfId });
    setShowDeleteModal(true);
  };

  const { mutate: deleteRecord } = useDeleteRecords();

  const handleClickDeleteBtn = () => {
    if (deleteTarget?.status === 'READING') {
      deleteRecord({ status: 'READING', recordId: deleteTarget.recordId });
    }
    if (deleteTarget?.status === 'FINISHED') {
      deleteRecord({ status: 'FINISHED', bookshelfId: deleteTarget.bookshelfId });
    }
    setShowDeleteModal(false);
  };

  const handleClickAddIndex = (isbn: string) => {
    router.push(`/addIndex?isbn=${isbn}`);
  };

  return (
    <div className='relative'>
      <Suspense fallback={null}>
        <ReadPageContent setBook={setBook} />
      </Suspense>
      <div className='fixed w-full h-[90px] px-[205px] py-5 flex justify-between border-b-2 bg-background border-b-gray-200 z-20'>
        <button
          type='button'
          onClick={() => router.back()}
        >
          <img
            src='/icons/arrowLeft.svg'
            alt='뒤로가기 아이콘'
          />
        </button>
      </div>
      <div className='w-[820px] mx-auto mb-14 pt-[90px]'>
        <section className='relative w-full'>
          <div className='relative h-[528px] flex flex-col justify-center items-center bg-background-input rounded-3xl mt-14 group'>
            <h2 className='font-sans font-semibold text-2xl text-gray-900 mb-2 truncate max-w-[600px]'>
              {book?.title}
            </h2>
            <p className='font-sans font-medium text-base text-gray-700 mb-4'>{book?.author}</p>
            <div className='w-[224px] h-[327px] rounded-lg overflow-hidden mb-4'>
              <img
                src={book?.coverImageUrl}
                alt='도서 표지'
                className='w-full h-full object-cover'
              />
            </div>
            <span className='font-sans font-normal text-sm text-gray-500'>
              {book?.category} &middot; {book?.publisher} &middot;{' '}
              {book?.publishedDate.split('-')[0]}
            </span>
          </div>
        </section>
        <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mt-[112px] mb-6'>
          독서 상태
        </h2>
        <div
          className={`w-[190px] h-[50px] flex justify-center items-center font-sans font-semibold leading-[30px] text-base rounded-lg mr-8 ${
            book?.status === 'READING'
              ? 'bg-[#E6F2E6] text-primary'
              : 'bg-primary-lightblue text-[#94A8D2]'
          }`}
        >
          {book?.status === 'READING' ? '읽는 중' : '다 읽음'}
        </div>
        <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mt-14 mb-6'>
          기록
        </h2>
        {allRecords?.map((item) => (
          <div
            key={item.recordId}
            className='w-full bg-background-input rounded-2xl px-8 py-6 mb-8'
          >
            <div className='flex justify-between'>
              <div className='flex items-center'>
                {item.status === 'READING' ? (
                  item.page ? (
                    <p className='h-[30px] bg-gray-200 rounded-sm font-sans font-medium text-xs text-gray-700 flex justify-center items-center mr-4 px-4 py-2'>
                      {item.page} P
                    </p>
                  ) : (
                    <p className='h-[30px] bg-gray-200 rounded-sm font-sans font-medium text-xs text-gray-700 flex justify-center items-center mr-4 px-4 py-2'>
                      페이지 없음
                    </p>
                  )
                ) : null}
                <p className='font-sans text-xs text-gray-500'>{item.createdAt.slice(0, 10)}</p>
              </div>
              <div className='flex'>
                <div className='relative group mr-4'>
                  <button
                    type='button'
                    className='p-2'
                    onClick={() =>
                      handleClickUpdateBtn(
                        item.recordId,
                        book!.bookshelfId,
                        item.status,
                        book!.isbn,
                      )
                    }
                  >
                    <img
                      src='/icons/updateIcon.svg'
                      alt='수정 아이콘'
                    />
                  </button>
                  <div
                    role='tooltip'
                    className='absolute -top-7 -left-1 bg-gray-900 text-background-input text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-10'
                  >
                    수정
                    <span
                      className='absolute top-full left-1/2 -translate-x-1/2 
                   border-4 border-transparent border-t-gray-900'
                    />
                  </div>
                </div>
                <div className='relative group'>
                  <button
                    type='button'
                    className='p-2'
                    onClick={() =>
                      handleClickDeleteConfirm(item.status, item.recordId, book!.bookshelfId)
                    }
                  >
                    <img
                      src='/icons/deleteIcon.svg'
                      alt='삭제 아이콘'
                    />
                  </button>
                  <div
                    role='tooltip'
                    className='absolute -top-7 -left-1 bg-gray-900 text-background-input text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-10'
                  >
                    삭제
                    <span
                      className='absolute top-full left-1/2 -translate-x-1/2 
                   border-4 border-transparent border-t-gray-900'
                    />
                  </div>
                </div>
              </div>
            </div>
            {showDeleteModal && (
              <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-30'>
                <div className='w-[413px] h-[288px] flex flex-col items-center justify-center bg-background-input rounded-2xl px-14 py-12'>
                  <h2 className='font-sans font-semibold text-xl text-gray-900 mb-4'>
                    기록을 삭제하시겠어요?
                  </h2>
                  <button
                    type='button'
                    className='w-[300px] h-[50px] bg-state-error rounded-lg font-sans font-medium text-base text-background-input mb-2'
                    onClick={handleClickDeleteBtn}
                  >
                    삭제
                  </button>
                  <button
                    type='button'
                    className='w-[300px] h-[50px] bg-gray-200 rounded-lg font-sans text-base text-gray-500'
                    onClick={() => setShowDeleteModal(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

            <div className='mt-4 grid grid-cols-5 grid-rows-1 gap-x-[23px]'>
              {item.emotions.map((emo, index) => {
                const emotion = emotions.find((item) => item.id === emo.emotionId);
                return (
                  <div
                    key={index}
                    className='w-[133px] h-[76px] flex justify-center items-center bg-gray-100 rounded-lg'
                  >
                    <img
                      src={emotion?.icon}
                      alt='감정 이모지'
                      className='w-[44px] mr-4'
                    />
                    <div className='flex flex-col font-sans font-medium text-sm'>
                      <p className='text-gray-900'>{emo.emotionName}</p>
                      <p className='text-gray-700'>{emo.score}점</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {item.content ? (
              <p className='mt-4 font-sans text-gray-900 text-base'>{item.content}</p>
            ) : (
              ''
            )}
            {item.finalNote ? (
              <div className='font-sans text-gray-900'>
                <h2 className='font-semibold text-2xl my-6'>노트</h2>
                <p className='py-4 px-6 text-base leading-[25px] bg-gray-100 rounded-sm'>
                  {item.finalNote}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
        {book?.status === 'READING' ? (
          <button
            type='button'
            className='w-[172px] h-[46px] flex items-center justify-center bg-gray-700 mb-4 rounded-lg cursor-pointer'
            onClick={() => handleClickAddIndex(book.isbn)}
          >
            <img
              src='/icons/plusIcon.svg'
              alt='플러스 아이콘'
            />
            <p className='font-sans font-medium leading-[30px] text-base text-background-input ml-2'>
              인덱스 추가하기
            </p>
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
