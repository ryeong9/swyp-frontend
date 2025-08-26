interface CategorySelectProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setShowFilterDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setShowEmojiDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterDropDown({
  category,
  setCategory,
  setShowFilterDropDown,
  setKeyword,
  setShowEmojiDropDown,
}: CategorySelectProps) {
  const categoryList = ['도서명/저자', '감정'];

  const handleSelectCategory = (item: string) => {
    setShowFilterDropDown(false);
    setCategory(item);
    setKeyword('');
    setShowEmojiDropDown(false);
  };

  return (
    <div className='absolute flex flex-col items-center top-14 left-0 w-[146px] h-[104px] bg-background-input drop-shadow-sm rounded-lg p-4 z-10'>
      {categoryList.map((item, index) => (
        <li
          key={index}
          className={`w-[114px] list-none font-sans font-semibold text-sm px-4 py-2 cursor-pointer  hover:bg-gray-200 rounded-[4px] ${category === item ? 'text-gray-900' : 'text-gray-500'}`}
          onClick={() => handleSelectCategory(item)}
        >
          {item}
        </li>
      ))}
    </div>
  );
}
