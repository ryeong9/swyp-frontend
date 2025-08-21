'use client';

import IndexRecord from '@/components/writePage/indexRecord';
import useGetRecordInfo from '@/hooks/update/useGetRecordInfo';
import usePutUpdateFinishedForm from '@/hooks/update/usePutUpdateFinishedForm';
import usePutUpdateReadingForm from '@/hooks/update/usePutUpdateReadingForm';
import { EmotionData, Emotions, IdState, RecordDataState } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function UpdatePageContent({
  setFormData,
  setId,
}: {
  setFormData: React.Dispatch<React.SetStateAction<RecordDataState>>;
  setId: React.Dispatch<React.SetStateAction<IdState>>;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const recordId = searchParams.get('recordId');
    const bookshelfId = searchParams.get('bookshelfId');
    const status = searchParams.get('status');
    const isbn = searchParams.get('isbn');
    if (recordId && bookshelfId && status && isbn) {
      const statusText = status === 'READING' ? '읽는 중' : '다 읽음';
      setId({ recordId: Number(recordId), bookshelfId: Number(bookshelfId) });
      setFormData((prev) => ({ ...prev, isbn: isbn, status: statusText }));
    }
  }, [searchParams, setFormData, setId]);

  return null;
}

export default function UpdatePage() {
  const router = useRouter();
  const [id, setId] = useState<IdState>({
    recordId: 0,
    bookshelfId: 0,
  });

  const [formData, setFormData] = useState<RecordDataState>({
    isbn: '',
    status: '',
    page: undefined,
    content: '',
    finalNote: '',
  });
  const [emotionData, setEmotionData] = useState<Emotions[]>([]);

  const { data: recordInfo } = useGetRecordInfo(formData.status, id.recordId, id.bookshelfId);

  useEffect(() => {
    if (recordInfo) {
      setFormData((prev) => ({
        ...prev,
        page: recordInfo.page,
        content: recordInfo.content ?? '',
        finalNote: recordInfo.finalNote ?? '',
      }));
      setEmotionData(
        recordInfo.emotions.map((e: EmotionData) => ({
          emotionId: e.emotionId,
          score: e.score,
        })),
      );
    }
  }, [recordInfo]);

  const [showGotoBackModal, setShowGotoBackModal] = useState(false);

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

  console.log(formData);
  console.log(emotionData);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { mutate: updateReadingForm } = usePutUpdateReadingForm(() => setShowSuccessModal(true));
  const { mutate: updateFinishedForm } = usePutUpdateFinishedForm(() => setShowSuccessModal(true));

  const handleClickUpdateBtn = () => {
    if (formData.status === '읽는 중') {
      updateReadingForm({
        updateForm: {
          page: formData.page ?? null,
          content: formData.content || null,
          emotions: emotionData.map((item) => ({
            emotionId: item.emotionId,
            score: item.score,
          })),
        },
        recordId: id.recordId,
      });
    }
    if (formData.status === '다 읽음') {
      updateFinishedForm({
        updateForm: {
          content: formData.content || null,
          finalNote: formData.finalNote || null,
          emotions: emotionData.map((item) => ({
            emotionId: item.emotionId,
            score: item.score,
          })),
        },
        bookshelfId: id.bookshelfId,
      });
    }
  };

  return (
    <div className='relative'>
      <Suspense fallback={null}>
        <UpdatePageContent
          setFormData={setFormData}
          setId={setId}
        />
      </Suspense>
      <div className='fixed w-full h-[90px] px-[205px] py-5 flex justify-between border-b-2 bg-background border-b-gray-200 z-10'>
        <button
          type='button'
          onClick={() => setShowGotoBackModal(true)}
        >
          <img
            src='/icons/arrowLeft.svg'
            alt='뒤로가기 아이콘'
          />
        </button>
        <button
          type='submit'
          className='w-[190px] h-[50px] rounded-lg font-sans font-medium bg-primary text-background-input cursor-pointer'
          onClick={handleClickUpdateBtn}
        >
          수정하기
        </button>
        {showGotoBackModal && (
          <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-30'>
            <div className='w-[413px] h-[288px] flex flex-col items-center justify-center bg-background-input rounded-2xl px-14 py-12'>
              <h2 className='font-sans font-semibold text-xl text-gray-900 mb-4'>
                아직 수정이 완료 되지 않았어요
              </h2>
              <p className='font-sans text-base text-gray-700 leading-[25px] mb-6'>
                페이지를 벗어나면 수정한 내용은 삭제돼요
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
                계속 수정하기
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='w-[1030px] mx-auto mb-14 pt-[90px]'>
        <div className='w-full bg-background-input rounded-3xl mt-[68px] pb-14 px-[105px]'>
          {formData.status === '읽는 중' ? (
            <div className='w-full bg-background-input'>
              <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2 pt-[56px]'>
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
        </div>
      </div>
      {showSuccessModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-30'>
          <div className='w-[413px] h-[288px] flex flex-col items-center justify-center bg-background-input rounded-2xl px-14 py-12'>
            <h2 className='font-sans font-semibold text-xl text-gray-900 mb-4'>수정 완료!</h2>
            <p className='font-sans font-medium text-sm text-gray-700 leading-[20px] mb-6'>
              이전 페이지로 이동하시겠어요?
            </p>
            <button
              type='button'
              className='w-[300px] h-[50px] bg-primary rounded-lg font-sans font-medium text-base text-background-input mb-2'
              onClick={() => router.back()}
            >
              확인
            </button>
            {/* <button
              type='button'
              className='w-[300px] h-[50px] bg-gray-200 rounded-lg font-sans text-base text-gray-500'
              onClick={handleClickGotoMain}
            >
              닫기
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
