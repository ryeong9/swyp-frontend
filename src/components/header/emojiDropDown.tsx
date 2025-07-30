interface KeywordSelectProps {
  keyword: string;
  setKeyword: (item: string) => void;
  showEmojiDropDown: boolean;
  setShowEmojiDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmojiDropDown({
  keyword,
  setKeyword,
  showEmojiDropDown,
  setShowEmojiDropDown,
}: KeywordSelectProps) {
  const emotionList = [
    '감동',
    '설렘',
    '희망',
    '공감',
    '위로',
    '슬픔',
    '분노',
    '혼란',
    '불안',
    '답답함',
    '차분함',
    '공허함',
    '아쉬움',
    '평온함',
    '충격',
    '깨달음',
    '통찰',
    '의문',
    '영감',
    '반성',
  ];

  const handleClickEmotion = (item: string) => {
    setKeyword(item);
    setShowEmojiDropDown(!showEmojiDropDown);
  };

  return (
    <div className='absolute grid grid-cols-6 grid-rows-3 gap-x-[22.8px] gap-y-[15.5px] top-14 right-14 w-[540px] bg-background-input drop-shadow-sm rounded-lg z-10 px-6 py-4'>
      {emotionList.map((item, index) => (
        <div
          key={index}
          className='group flex flex-col w-full items-center justify-center'
        >
          <img
            src='/icons/imgExam.svg'
            alt='감정 이모지'
            className='w-[63px] h-[63px] group-hover:bg-gray-200 cursor-pointer'
            onClick={() => handleClickEmotion(item)}
          />
          <p
            className={`font-sans text-sm text-gray-500 mt-2 group-hover:text-gray-900 ${keyword === item ? 'text-gray-900' : 'text-gray-500'}`}
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
