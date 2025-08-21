'use client';

interface indexRecordProps {
  emotionData: Emotions[];
  setEmotionData: React.Dispatch<React.SetStateAction<Emotions[]>>;
  onChange: (data: Partial<RecordDataState>) => void;
  formData: RecordDataState;
}

import { emotions } from '@/constants/emotion';
import { Emotions, RecordDataState } from '@/types';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function IndexRecord({
  emotionData,
  setEmotionData,
  onChange,
  formData,
}: indexRecordProps) {
  const [showSelectEmotion, setShowSelectEmotion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 감정 선택 버튼 클릭 시
  const handleClickSelectBtn = (index: number) => {
    if (selectedIndex === index && showSelectEmotion) {
      setShowSelectEmotion(false);
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
      setShowSelectEmotion(true);
    }
  };

  // 감정 추가하기 버튼 클릭 시
  const handleClickPlusBtn = () => {
    if (emotionData.length >= 5) return;
    const newIndex = emotionData.length;

    setEmotionData((prev) => [...prev, { emotionId: 0, score: 10 }]);
    setSelectedIndex(newIndex);
  };

  // 감정 클릭 시
  const handleClickEmotion = (id: number) => {
    if (selectedIndex === null) return;
    if (emotionData.some((emotion) => emotion.emotionId === id)) {
      return;
    }
    setEmotionData((prev) =>
      prev.map((item, index) => (index === selectedIndex ? { ...item, emotionId: id } : item)),
    );
    setShowSelectEmotion(false);
    setSelectedIndex(null);
  };

  // 슬라이더 점수 변경
  const handleChangeScore = (index: number, newScore: number) => {
    setEmotionData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, score: newScore } : item)),
    );
  };

  // 글자 제한
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 1000) {
      e.target.value = e.target.value.substring(0, 1000);
    }
    onChange({ [e.target.name]: e.target.value });
  };

  //emotionId에 맞는 감정 데이터 반환
  const getEmotionById = (id: number) => emotions.find((emo) => emo.id === id);

  return (
    <div className='w-full bg-background-input'>
      <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2 pt-[56px]'>
        인덱스
      </h2>
      <p className='font-sans text-base text-gray-500 leading-[25px] tracking-wider mb-6'>
        인상 깊었던 부분에 감정 이모지를 추가해 점수를 선택해주세요. (최대 5개)
      </p>
      <div className='flex flex-col'>
        {emotionData.map((item, index) => {
          const emotionInfo = getEmotionById(item.emotionId);
          return (
            <div
              key={index}
              className='relative flex items-center px-8 py-6 bg-gray-100 rounded-2xl mb-6'
            >
              <button
                type='button'
                className='w-[83px] flex flex-col justify-center items-center pr-[18px] border-r-1 border-r-gray-300'
                onClick={() => handleClickSelectBtn(index)}
              >
                {item.emotionId === 0 ? (
                  <>
                    <img
                      src='/icons/plusIcon.svg'
                      alt='플러스 아이콘'
                      className='w-[44px] h-[44px] p-3 rounded-full bg-gray-300 mb-2'
                    />
                    <p className='font-sans text-sm text-gray-500'>감정 선택</p>
                  </>
                ) : (
                  <>
                    <img
                      src={emotionInfo?.icon || '/icons/plusIcon.svg'}
                      alt={emotionInfo?.name || '감정'}
                      className='w-[44px] h-[44px] mb-2'
                    />
                    <p className='font-sans text-sm text-gray-900'>{emotionInfo?.name}</p>
                  </>
                )}
              </button>
              {showSelectEmotion && selectedIndex === index && (
                <div className='absolute box-border top-0 left-[103px] w-[528px] h-[460px] bg-background-input drop-shadow-sm rounded-lg z-10 pl-6 pr-[17.5px] py-4 flex flex-col justify-between'>
                  <div className='w-full flex justify-between items-start'>
                    <div className='flex flex-col'>
                      <p className='flex items-center justify-center font-sans font-medium text-base text-gray-700 text-center w-[56px] h-[85px] mb-5'>
                        긍정
                      </p>
                      <p className='flex items-center justify-center font-sans font-medium text-base text-gray-700 text-center w-[56px] h-[85px] mb-5'>
                        부정
                      </p>
                      <p className='flex items-center justify-center font-sans font-medium text-base text-gray-700 text-center w-[56px] h-[85px] mb-5'>
                        중립
                      </p>
                      <p className='flex items-center justify-center font-sans font-medium text-base text-gray-700 text-center w-[56px] h-[85px]'>
                        사고기반
                      </p>
                    </div>
                    <div className='grid grid-cols-5 grid-rows-4 gap-x-[9px] gap-y-2'>
                      {emotions.map((item) => {
                        return (
                          <button
                            type='button'
                            key={item.id}
                            onClick={() => handleClickEmotion(item.id)}
                            className='w-[76px] h-[101px] flex flex-col items-center justify-center hover:bg-[#E6F2E6] rounded-lg group'
                          >
                            <img
                              src={item.icon}
                              alt='아이콘'
                              className='w-[60px] h-[60px] mb-2'
                            />
                            <p className='font-sans text-sm text-gray-500 group-hover:text-gray-900'>
                              {item.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              <div className='w-[601px] px-6'>
                <input
                  type='range'
                  min='1'
                  max='10'
                  name='score'
                  value={item.score}
                  onChange={(e) => handleChangeScore(index, Number(e.target.value))}
                  className='slider-custom'
                  style={{
                    background: `linear-gradient(to right, ${
                      formData.status === '읽는 중' ? '#CDE5CD' : '#D2DEF4'
                    } ${((item.score - 1) / 9) * 100}%, #F0F0F0 ${((item.score - 1) / 9) * 100}%)`,
                  }}
                />
                <div className='w-full flex justify-between mt-[2px] pl-2 pr-[18px] translate-x-[6px]'>
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`font-sans text-sm ${item.score === i + 1 ? 'font-medium text-gray-900' : 'font-normal text-gray-500'}`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
              <div className='w-[84px] h-[51px] bg-[#EEF2FA] rounded-lg flex justify-center items-center'>
                <p className='font-sans font-medium text-base text-gray-700'>
                  {item.score}
                  <span className='font-sans text-base font-normal text-gray-700'>점</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type='button'
        className={`w-[158px] h-[46px] flex items-center justify-center rounded-lg ${emotionData.length >= 5 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-700 cursor-pointer'}`}
        onClick={handleClickPlusBtn}
        disabled={emotionData.length >= 5}
      >
        <img
          src={emotionData.length >= 5 ? '/icons/plusIconDisabled.svg' : '/icons/plusIcon.svg'}
          alt='플러스 아이콘'
          className='mr-2'
        />
        <p
          className={`font-sans font-medium ${
            emotionData.length >= 5 ? 'text-gray-500' : 'text-background-input'
          }`}
        >
          감정 추가하기
        </p>
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
        <p className='absolute bottom-6 right-8 text-sm text-gray-500'>
          {formData.content?.length}/1000
        </p>
      </div>
    </div>
  );
}
