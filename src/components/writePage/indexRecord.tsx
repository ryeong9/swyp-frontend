'use client';

interface indexRecordProps {
  emotionData: Emotions;
  setEmotionData: React.Dispatch<React.SetStateAction<Emotions>>;
  onChange: (data: Partial<RecordDataState>) => void;
  formData: RecordDataState;
}

import { Emotions, RecordDataState } from '@/types';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function IndexRecord({
  emotionData,
  setEmotionData,
  onChange,
  formData,
}: indexRecordProps) {
  const positive = ['감동', '설렘', '유쾌한', '공감', '위로'];
  const negative = ['슬픔', '분노', '혼란', '불쾌한', '공포'];
  const neutrality = ['놀람', '당황한', '답답한', '아쉬운', '어색한'];
  const thought = ['깨달음', '통찰', '의문', '영감', '성찰'];

  const [showSelectEmotion, setShowSelectEmotion] = useState(false);

  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmotionData((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 1000) {
      e.target.value = e.target.value.substring(0, 1000);
    }
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className='w-full bg-background-input'>
      <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>인덱스</h2>
      <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider mb-6'>
        인상 깊었던 부분에 감정 이모지를 추가해 점수를 선택해주세요. (최대 5개)
      </p>
      <div className='relative flex items-center px-8 py-6 bg-gray-100 rounded-2xl'>
        <button
          type='button'
          className='flex flex-col justify-center items-center pr-6 border-r-1 border-r-gray-300'
          onClick={() => setShowSelectEmotion((prev) => !prev)}
        >
          <img
            src='/icons/plusIcon.svg'
            alt='플러스 아이콘'
            className='w-[44px] h-[44px] p-3 rounded-full bg-gray-300 mb-2'
          />
          <p className='font-sans text-sm text-gray-500'>감정 선택</p>
        </button>
        {showSelectEmotion && (
          <div className='absolute top-0 left-[129px] w-[530px] h-[460px] bg-background-input drop-shadow-sm rounded-lg z-10 p-6 flex flex-col justify-between'>
            <div className='flex justify-between items-center'>
              <p className='font-sans font-medium text-base text-gray-700 text-center w-[56px] h-[24px]'>
                긍정
              </p>
              {positive.map((item, index) => (
                <button
                  type='button'
                  key={index}
                >
                  <img
                    src='/icons/emotion/positiveIcon.svg'
                    alt='긍정 아이콘'
                    className='w-[60px] h-[60px] px-3 py-1 bg-primary-lightblue rounded-full border-1 border-primary-light mb-2'
                  />
                  <p className='font-sans text-sm text-gray-500'>{item}</p>
                </button>
              ))}
            </div>
            <div className='flex justify-between items-center'>
              <p className='font-sans font-medium text-base text-gray-700 text-center w-[56px] h-[24px]'>
                부정
              </p>
              {negative.map((item, index) => (
                <button
                  type='button'
                  key={index}
                >
                  <img
                    src='/icons/emotion/negativeIcon.svg'
                    alt='부정 아이콘'
                    className='w-[60px] h-[60px] px-3 py-1 bg-primary-lightblue rounded-full border-1 border-primary-light mb-2'
                  />
                  <p className='font-sans text-sm text-gray-500'>{item}</p>
                </button>
              ))}
            </div>
            <div className='flex justify-between items-center'>
              <p className='font-sans font-medium text-base text-gray-700 text-center w-[56px] h-[24px]'>
                중립
              </p>
              {neutrality.map((item, index) => (
                <button
                  type='button'
                  key={index}
                >
                  <img
                    src='/icons/emotion/neutralityIcon.svg'
                    alt='중립 아이콘'
                    className='w-[60px] h-[60px] px-3 py-1 bg-primary-lightblue rounded-full border-1 border-primary-light mb-2'
                  />
                  <p className='font-sans text-sm text-gray-500'>{item}</p>
                </button>
              ))}
            </div>
            <div className='flex justify-between items-center'>
              <p className='font-sans font-medium text-base text-gray-700'>사고기반</p>
              {thought.map((item, index) => (
                <button
                  type='button'
                  key={index}
                >
                  <img
                    src='/icons/emotion/thoughtIcon.svg'
                    alt='사고기반 아이콘'
                    className='w-[60px] h-[60px] px-3 py-1 bg-primary-lightblue rounded-full border-1 border-primary-light mb-2'
                  />
                  <p className='font-sans text-sm text-gray-500'>{item}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className='w-[595px] px-5'>
          <input
            type='range'
            min='1'
            max='10'
            name='score'
            value={emotionData.score}
            onChange={handleChangeScore}
            className='slider-custom'
            style={{
              background: `linear-gradient(to right,#9BC99F ${
                ((emotionData.score - 1) / 9) * 100
              }%, #F0F0F0 ${((emotionData.score - 1) / 9) * 100}%)`,
            }}
          />
          <div className='w-full flex justify-between mt-[9px] pl-2 pr-[18px] translate-x-[7px]'>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`font-sans text-sm ${emotionData.score === i + 1 ? 'font-medium text-gray-900' : 'font-normal text-gray-500'}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div className='w-[84px] h-[51px] bg-[#EEF2FA] rounded-lg flex justify-center items-center'>
          <p className='font-sans font-medium text-base text-gray-900'>
            {emotionData.score}
            <span className='font-sans text-base font-normal text-gray-700'>점</span>
          </p>
        </div>
      </div>
      <button
        type='button'
        className='w-[158px] h-[46px] flex items-center justify-center bg-gray-700 rounded-lg mt-6'
      >
        <img
          src='/icons/plusIcon.svg'
          alt='플러스 아이콘'
          className='mr-2'
        />
        <p className='font-sans font-medium text-background-input'>감정 추가하기</p>
      </button>
      <div className='relative mt-10'>
        <TextareaAutosize
          cacheMeasurements
          minRows={6}
          placeholder='추가한 감정을 느낀 구절이나 생각을 남겨주세요.'
          className='w-full bg-gray-100 text-gray-900 rounded-2xl outline-none border-2 py-7 px-8 border-gray-300 hover:border-primary resize-none overflow-hidden'
          name='content'
          onChange={handleChangeContent}
          value={formData.content}
        />
        <p className='absolute bottom-[24px] right-[32px] text-sm text-gray-500'>
          {formData.content.length}/1000
        </p>
      </div>
    </div>
  );
}
