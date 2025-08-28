'use client';

import BookModal from '@/components/writePage/bookModal';
import IndexRecord from '@/components/writePage/indexRecord';
import RoutingPopUp from '@/components/writePage/routingPopUp';
import usePostRecordFinishedData from '@/hooks/write/usePostRecordFinishedData';
import usePostRecordReadingData from '@/hooks/write/usePostRecordReadingData';
import { Book, Emotions, RecordDataState } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// useSearchParams를 사용하는 부분 분리
function WritePageContent({
  setSelectedBook,
  setFormData,
}: {
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
  setFormData: React.Dispatch<React.SetStateAction<RecordDataState>>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookParam = searchParams.get('book');
    if (bookParam) {
      const book = JSON.parse(decodeURIComponent(bookParam));
      setSelectedBook(book);
      setFormData((prev) => ({ ...prev, isbn: book.isbn }));

      router.replace('/write', { scroll: false });
    }
  }, [searchParams, router, setFormData, setSelectedBook]);

  return null;
}

export default function WritePage() {
  const router = useRouter();
  const [showGotoBackModal, setShowGotoBackModal] = useState(false);

  const [formData, setFormData] = useState<RecordDataState>({
    isbn: '',
    status: '독서 상태',
    page: undefined,
    content: '',
    finalNote: '',
  });

  const [emotionData, setEmotionData] = useState<Emotions[]>([{ emotionId: 0, score: 10 }]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onChange = useCallback((data: Partial<RecordDataState>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue = type === 'number' ? Number(value) : value;

    if (name === 'finalNote' && typeof newValue === 'string' && newValue.length > 1500) {
      newValue = newValue.substring(0, 1500);
    }

    onChange({ [name]: newValue });
  };

  const handleReset = () => {
    setSelectedBook(null);
    setFormData({
      isbn: '',
      status: '독서 상태',
      page: undefined,
      content: '',
      finalNote: '',
    });
    setEmotionData([{ emotionId: 0, score: 10 }]);
  };

  const isSubmitEnabled = formData.isbn !== '' && formData.status !== '독서 상태';

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { mutate: onSubmitReading } = usePostRecordReadingData(() => setShowSuccessModal(true));
  const { mutate: onSubmitFinished } = usePostRecordFinishedData(() => setShowSuccessModal(true));

  const handleClickSubmitBtn = () => {
    if (!isSubmitEnabled) return;
    if (formData.status === '읽는 중') {
      onSubmitReading({
        isbn: formData.isbn,
        page: formData.page ?? null,
        content: formData.content || null,
        emotions: emotionData.map((item) => ({
          emotionId: item.emotionId,
          score: item.score,
        })),
      });
    }
    if (formData.status === '다 읽음') {
      onSubmitFinished({
        isbn: formData.isbn,
        content: formData.content || null,
        finalNote: formData.finalNote || null,
        emotions: emotionData.map((item) => ({
          emotionId: item.emotionId,
          score: item.score,
        })),
      });
    }
  };

  return (
    <div className='relative flex flex-col items-center'>
      <Suspense fallback={null}>
        <WritePageContent
          setSelectedBook={setSelectedBook}
          setFormData={setFormData}
        />
      </Suspense>
      <div className='fixed w-full h-[90px] py-5 flex justify-between border-b-2 bg-background border-b-gray-200 z-30'>
        <div className='max-w-[1030px] w-full mx-auto flex justify-between items-center'>
          <button
            type='button'
            onClick={() => setShowGotoBackModal(true)}
            className='w-[75px] h-[22px] flex cursor-pointer'
          >
            <img
              src='/icons/arrowLeft.svg'
              alt='뒤로가기 아이콘'
            />
            <p className='font-sans text-base text-gray-500 ml-2'>뒤로가기</p>
          </button>
          <button
            type='submit'
            className={`w-[190px] h-[50px] rounded-lg font-sans font-medium ${
              isSubmitEnabled
                ? 'bg-primary text-background-input cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isSubmitEnabled}
            onClick={handleClickSubmitBtn}
          >
            등록하기
          </button>
        </div>
      </div>
      <div className='w-[1030px] mx-auto mb-14 pt-[90px]'>
        {/* 기록할 책 선택하기 */}
        <section className='relative w-full'>
          {!selectedBook ? (
            <div className='h-[177px] flex flex-col justify-center items-center mt-14 bg-gray-200 rounded-3xl'>
              <button
                type='button'
                onClick={() => setShowSelectModal((prev) => !prev)}
                className='w-[145px] h-[46px] flex items-center justify-center bg-gray-700 mb-4 rounded-lg cursor-pointer'
              >
                <img
                  src='/icons/plusIcon.svg'
                  alt='플러스 아이콘'
                />
                <p className='font-sans font-medium leading-[30px] text-base text-background-input ml-2'>
                  책 추가하기
                </p>
              </button>
              <p className='font-sans text-base text-gray-500'>
                나의 책상에서 기록할 책을 추가해주세요
              </p>
            </div>
          ) : (
            <div className='relative h-[528px] flex flex-col justify-center items-center bg-background-input rounded-3xl mt-14 group'>
              <button
                onClick={() => setShowDeleteModal(true)}
                className='absolute top-4 right-4 opacity-0 group-hover:opacity-100'
              >
                <img
                  src='/icons/closeIcon2.svg'
                  alt='닫기 아이콘'
                />
              </button>
              <h2 className='font-sans font-semibold text-2xl text-gray-900 mb-2 truncate max-w-[600px]'>
                {selectedBook.title}
              </h2>
              <p className='font-sans font-medium text-base text-gray-700 mb-4'>
                {selectedBook.author}
              </p>
              <div className='w-[224px] h-[327px] rounded-lg overflow-hidden mb-4'>
                <img
                  src={selectedBook.coverImageUrl}
                  alt='도서 표지'
                  className='w-full h-full object-cover'
                />
              </div>
              <span className='font-sans font-normal text-sm text-gray-500'>
                {selectedBook.category} &middot; {selectedBook.publisher} &middot;{' '}
                {selectedBook.publishedDate.split('-')[0]}
              </span>
            </div>
          )}
          {showDeleteModal && (
            <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-30'>
              <div className='w-[413px] h-[288px] flex flex-col items-center justify-center bg-background-input rounded-2xl px-14 py-12'>
                <h2 className='font-sans font-semibold text-xl text-gray-900 mb-4'>
                  책을 삭제하면 기록이 사라져요
                </h2>
                <p className='font-sans text-base text-gray-700 leading-[25px] mb-6'>
                  기록을 삭제하고 다른 책을 선택하시겠어요?
                </p>
                <button
                  type='button'
                  className='w-[300px] h-[50px] bg-state-error rounded-lg font-sans font-medium text-base text-background-input mb-2'
                  onClick={() => {
                    setSelectedBook(null);
                    setFormData({
                      isbn: '',
                      status: '독서 상태',
                      page: undefined,
                      content: '',
                      finalNote: '',
                    });
                    setEmotionData([{ emotionId: 0, score: 10 }]);
                    setShowDeleteModal(false);
                  }}
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
        </section>

        {showSelectModal && (
          <BookModal
            setSelectedBook={setSelectedBook}
            setShowSelectModal={setShowSelectModal}
            onChange={onChange}
          />
        )}
        {/* 독서 상태 선택하기 */}
        <section className='w-full bg-background-input rounded-3xl mt-14 py-14 px-[105px]'>
          <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>
            독서 상태
          </h2>
          <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider'>
            독서 상태를 선택해주세요.
          </p>
          <div className='flex items-center mt-8'>
            <label
              htmlFor='reading'
              className='flex font-sans font-medium text-gray-300 cursor-pointer'
            >
              <input
                id='reading'
                type='radio'
                name='status'
                value='읽는 중'
                checked={formData.status === '읽는 중'}
                className='mr-2 radio reading'
                disabled={!selectedBook}
                onChange={handleChange}
              />
              <span>읽는 중</span>
            </label>
            <label
              htmlFor='finished'
              className='flex ml-5 font-sans font-medium text-gray-300 cursor-pointer'
            >
              <input
                id='finished'
                type='radio'
                name='status'
                value='다 읽음'
                checked={formData.status === '다 읽음'}
                className='mr-2 radio finished'
                disabled={!selectedBook}
                onChange={handleChange}
              />
              <span>다 읽음</span>
            </label>
          </div>
          {formData.status === '읽는 중' ? (
            <div className='w-full bg-background-input'>
              <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2 mt-[56px]'>
                페이지
              </h2>
              <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider mb-6'>
                인덱스를 남기고 싶은 페이지를 입력해주세요.
              </p>
              <div className='relative'>
                <p className='absolute top-[13px] left-[21px] font-sans text-base text-gray-700 px-4 border-r-1 border-r-gray-300'>
                  P
                </p>
              </div>
              <input
                type='number'
                name='page'
                className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-[190px] h-[50px] rounded-lg bg-gray-100 pl-[79px] text-gray-900  pr-6 outline-none border-2 border-gray-300 hover:border-primary'
                placeholder='페이지 입력'
                onChange={handleChange}
                value={formData.page !== undefined ? String(formData.page) : ''}
              />
              <IndexRecord
                emotionData={emotionData}
                setEmotionData={setEmotionData}
                onChange={onChange}
                formData={formData}
              />
            </div>
          ) : formData.status === '다 읽음' ? (
            <>
              <IndexRecord
                emotionData={emotionData}
                setEmotionData={setEmotionData}
                onChange={onChange}
                formData={formData}
              />
              <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mt-[56px] mb-2'>
                노트
              </h2>
              <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider mb-6'>
                책을 다 읽은 뒤의 생각과 느낌을 자유롭게 적어주세요.
              </p>
              <div className='relative mt-6'>
                <TextareaAutosize
                  cacheMeasurements
                  minRows={6}
                  placeholder='책의 감상을 적어주세요.'
                  className='w-full bg-gray-100 text-gray-900 rounded-2xl outline-none border-2 py-7 px-8 border-gray-300 hover:border-primary resize-none overflow-hidden'
                  name='finalNote'
                  onChange={handleChange}
                  value={formData.finalNote}
                />
                <p className='absolute bottom-[18px] right-8 text-sm text-gray-500'>
                  {formData.finalNote?.length}/1500
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </section>
      </div>
      {showSuccessModal && (
        <RoutingPopUp
          setShowSuccessModal={setShowSuccessModal}
          handleReset={handleReset}
        />
      )}
      {showGotoBackModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
          <div className='w-[413px] h-[288px] flex flex-col items-center justify-center bg-background-input rounded-2xl px-14 py-12'>
            <h2 className='font-sans font-semibold text-xl text-gray-900 mb-4'>
              아직 작성이 완료 되지 않았어요
            </h2>
            <p className='font-sans text-base text-gray-700 leading-[25px] mb-6'>
              벗어나면 작성 중인 내용은 삭제돼요
            </p>
            <button
              type='button'
              className='w-[300px] h-[50px] bg-state-error rounded-lg font-sans font-medium text-base text-background-input mb-2'
              onClick={() => {
                setShowGotoBackModal(false);
                router.back();
              }}
            >
              확인
            </button>
            <button
              type='button'
              className='w-[300px] h-[50px] bg-gray-200 rounded-lg font-sans text-base text-gray-500'
              onClick={() => setShowGotoBackModal(false)}
            >
              계속 기록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
