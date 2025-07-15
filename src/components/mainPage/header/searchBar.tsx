'use client';

import { useState } from 'react';
import FilterDropDown from './filterDropDown';
import EmojiDropDown from './emojiDropDown';

export default function SearchBar() {
  const [category, setCategory] = useState('감정');
  const [keyword, setKeyword] = useState('');
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [showEmojiDropDown, setShowEmojiDropDown] = useState(false);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category === '도서명') setKeyword(e.target.value);
  };

  console.log(category);
  console.log(keyword);

  return (
    <div className='relative w-[715px] h-[50px] rounded-[60px] bg-background-input py-[16px] px-[24px] flex items-center'>
      <button
        className='flex items-center'
        onClick={() => setShowFilterDropDown(true)}
      >
        <p className='w-[45px] mr-[18px] font-sans font-semibold text-gray-900 text-sm text-left'>
          {category}
        </p>
        {showFilterDropDown ? (
          <img
            src='/icons/arrowUp.svg'
            alt='아래 화살표 아이콘'
          />
        ) : (
          <img
            src='/icons/arrowDown.svg'
            alt='아래 화살표 아이콘'
          />
        )}
      </button>
      {showFilterDropDown && (
        <FilterDropDown
          category={category}
          setCategory={setCategory}
          showFilterDropDown={showFilterDropDown}
          setShowFilterDropDown={setShowFilterDropDown}
        />
      )}
      <img
        src='/icons/bar.svg'
        className='mx-3.5 block'
      />
      <input
        className='w-[540px] outline-none leading-none text-sm placeholder-gray-500'
        type='text'
        placeholder={
          category === '감정' ? '감정으로 책을 찾아볼 수 있어요.' : '책 이름으로 검색해주세요.'
        }
        readOnly={category === '감정'}
        onFocus={() => {
          if (category === '감정') setShowEmojiDropDown(true);
        }}
        onChange={handleKeywordChange}
      />
      {showEmojiDropDown && <EmojiDropDown />}
      <button className='ml-3.5'>
        <img
          src='/icons/search.svg'
          alt='돋보기 아이콘'
          className='w-[14px] block'
        />
      </button>
    </div>
  );
}
