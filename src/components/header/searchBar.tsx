'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropDown from './filterDropDown';
import EmojiDropDown from './emojiDropDown';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터에서 초기값 추출
  const initialKeyword = searchParams.get('keyword') || '';
  const initialType = searchParams.get('type') || 'title';
  const initialCategory = initialType === 'title' ? '도서명/저자' : '감정';

  const [category, setCategory] = useState(initialCategory);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [showEmojiDropDown, setShowEmojiDropDown] = useState(false);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category === '도서명/저자') setKeyword(e.target.value);
  };

  const handleSubmitSearchData = () => {
    if (!keyword) {
      return;
    }

    const query = new URLSearchParams({
      keyword: keyword,
      type: category === '도서명/저자' ? 'title' : 'emotion',
      startIndex: '1',
    }).toString();
    router.push(`/result?${query}`);
  };

  return (
    <div className='relative w-[715px] h-[50px] rounded-[60px] bg-background-input py-[16px] px-[24px] flex items-center'>
      <button
        className='flex items-center cursor-pointer'
        onClick={() => setShowFilterDropDown((prev) => !prev)}
      >
        <p className='w-[90px] mr-[16px] font-sans font-semibold text-gray-900 text-sm text-left'>
          {category}
        </p>
        {showFilterDropDown ? (
          <img
            src='/icons/arrowUp.svg'
            alt='위 화살표 아이콘'
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
          setShowFilterDropDown={setShowFilterDropDown}
          setKeyword={setKeyword}
          setShowEmojiDropDown={setShowEmojiDropDown}
        />
      )}
      <img
        src='/icons/bar.svg'
        className='ml-3 mr-5 block'
        alt='barIcon'
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
        value={keyword}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmitSearchData();
          }
        }}
      />
      {showEmojiDropDown && (
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={() => setShowEmojiDropDown(false)}
          />
          <EmojiDropDown
            keyword={keyword}
            setKeyword={setKeyword}
            showEmojiDropDown={showEmojiDropDown}
            setShowEmojiDropDown={setShowEmojiDropDown}
          />
        </>
      )}
      <button
        className='ml-3.5 cursor-pointer'
        onClick={handleSubmitSearchData}
      >
        <img
          src='/icons/search.svg'
          alt='돋보기 아이콘'
          className='w-[14px] block'
        />
      </button>
    </div>
  );
}
