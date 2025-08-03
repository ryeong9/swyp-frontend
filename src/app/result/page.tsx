'use client';
import ProfileDropDown from '@/components/header/profileDropDwon';
import SearchBar from '@/components/header/searchBar';
import Image from 'next/image';
import { useTitleSearch } from '@/hooks/search/useSearch';
export default function ResultSearchPage() {
  const { data, error, isLoading, isError } = useTitleSearch();

  if (isLoading) return <div> 로딩 중....</div>;
  if (isError) return <div> 오류 발생: {error?.message}</div>;

  return (
    <div className='pt-6 pb-6 width-[1030px] max-h-full'>
      <div className='flex flex-row gap-5'>
        <Image
          src='/icons/logo.svg'
          alt='logo'
          width={190}
          height={38}
        />
        <SearchBar />
        <Image
          src='/icons/notification.svg'
          alt='notification'
          width={20}
          height={20}
        />
        <Image
          src='/icons/profile.svg'
          alt='profile'
          width={20}
          height={20}
        />
      </div>
      <div className='flex flex-col pt-14'>
        <p>도서명 검색결과 '{data?.totalResults}'건</p>

        <div className='bg-white w-[506px] h-[284px] rounded-[10px] p-5 flex flex-row gap-4'>
          <div className='bg-gray-300 w-[170px] h-[240px] rounded-lg' />
          {/* 여기서 책 세부사항 추가, 예: */}
          <div className='flex flex-col justify-between'>
            {/* 책 제목, 저자 등 스크린샷 기반 */}
            <div>
              <h2 className='font-semibold text-base'>책 제목</h2>
              <p>저자</p>
              <p>출판사 - 0000.00.00</p>
            </div>
            <p>"이 책에 00명이 감정을 기록했어요"</p>
            <div className='flex flex-row gap-4'>
              <div className='text-center'>
                <p>50%</p>
                {/* 위로 아이콘 */}
                <p>위로</p>
              </div>
              <div className='text-center'>
                <p>35%</p>
                {/* 슬픔 아이콘 */}
                <p>슬픔</p>
              </div>
              <div className='text-center'>
                <p>15%</p>
                {/* 평온함 아이콘 */}
                <p>평온함</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
