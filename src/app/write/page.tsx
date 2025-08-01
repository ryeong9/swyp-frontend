'use client';

import BookModal from '@/components/writePage/bookModal';
import IndexRecord from '@/components/writePage/indexRecord';
import { Emotions, RecordDataState } from '@/types';
import { useCallback, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function WritePage() {
  const [formData, setFormData] = useState<RecordDataState>({
    isbn: '',
    status: '독서 상태',
    page: undefined,
    content: '',
    finalNote: '',
  });

  const [emotionData, setEmotionData] = useState<Emotions>({
    emotionId: 0,
    score: 10,
  });

  console.log(formData);
  console.log(emotionData);

  const [selectedBook, setSelectedBook] = useState(true);
  const [showSelectModal, setShowSelectModal] = useState(false);

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

  return (
    <>
      <div className='w-full px-[205px] py-5 flex justify-end border-b-2 border-b-gray-200'>
        <button
          type='submit'
          className='w-[190px] h-[50px] rounded-lg font-sans font-medium bg-primary text-background-input disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer'
          disabled
        >
          등록하기
        </button>
      </div>
      <div className='w-[1030px] mx-auto'>
        {/* 기록할 책 선택하기 */}
        <section className='relative w-full h-[177px] flex flex-col justify-center items-center mt-14 bg-gray-200 rounded-3xl'>
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
          {showSelectModal && (
            <BookModal
              setSelectedBook={setSelectedBook}
              setShowSelectModal={setShowSelectModal}
            />
          )}
          <p className='font-sans text-base text-gray-500'>
            나의 책상에서 기록할 책을 추가해주세요
          </p>
        </section>
        {/* 독서 상태 선택하기 */}
        <section className='w-full bg-background-input rounded-3xl mt-14 py-14 px-[105px]'>
          <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>
            독서 상태
          </h2>
          <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider'>
            독서 상태를 선택해주세요.
          </p>
          <div className='flex items-center mt-8 mb-[56px]'>
            <div
              className={`w-[190px] h-[50px] flex justify-center items-center font-sans font-semibold leading-[30px] text-base rounded-lg mr-8 ${
                !selectedBook
                  ? 'bg-gray-100 text-gray-300'
                  : formData.status === '읽는 중'
                    ? 'bg-[#E6F2E6] text-primary'
                    : formData.status === '다 읽음'
                      ? 'bg-primary-lightblue text-[#94A8D2]'
                      : 'bg-gray-100 text-gray-300'
              }`}
            >
              {formData.status}
            </div>
            <label
              htmlFor='reading'
              className='flex font-sans font-medium text-gray-300 cursor-pointer'
            >
              <input
                id='reading'
                type='radio'
                name='status'
                value='읽는 중'
                className='mr-2 reading'
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
                className='mr-2 finished'
                disabled={!selectedBook}
                onChange={handleChange}
              />
              <span>다 읽음</span>
            </label>
          </div>
          {formData.status === '읽는 중' ? (
            <div className='w-full bg-background-input'>
              <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>
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
                className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-[190px] h-[50px] rounded-lg bg-gray-100 pl-[79px] text-gray-900  pr-6 outline-none border-2 border-gray-300 hover:border-primary mb-[56px]'
                placeholder='페이지 입력'
                onChange={handleChange}
                value={formData.page ?? ''}
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
                <p className='absolute bottom-[18px] right-[32px] text-sm text-gray-500'>
                  {formData.finalNote?.length}/1500
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </section>
      </div>
    </>
  );
}
