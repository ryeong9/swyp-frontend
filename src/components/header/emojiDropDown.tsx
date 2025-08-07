import { emotions } from '@/constants/emotion';

interface KeywordSelectProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  showEmojiDropDown: boolean;
  setShowEmojiDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmojiDropDown({
  keyword,
  setKeyword,
  showEmojiDropDown,
  setShowEmojiDropDown,
}: KeywordSelectProps) {
  const handleClickEmotion = (item: string) => {
    setKeyword(item);
    setShowEmojiDropDown(!showEmojiDropDown);
  };

  return (
    <div className='absolute box-border top-14 right-17 w-[528px] h-[460px] bg-background-input drop-shadow-sm rounded-lg z-10 pl-6 pr-[17.5px] py-4 flex flex-col justify-between'>
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
                onClick={() => handleClickEmotion(item.name)}
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
  );
}
