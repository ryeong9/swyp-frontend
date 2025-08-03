'use client';
import ProfileDropDown from '@/components/header/profileDropDwon';
import SearchBar from '@/components/header/searchBar';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

type ReadingStatus = 'completed' | 'reading' | 'noIndex';
export default function DetailPage() {
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>('completed');
  const router = useRouter();
  const handleClickMain = () => {
    router.push('/');
  };

  const hasEmotion = false; //감정 순위 확인
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='pt-6 pb-6 w-[1030px] max-w-full flex flex-col gap-14'>
        <div className='flex flex-row gap-5'>
          <Image
            src='/icons/logo.svg'
            alt='logo'
            width={190}
            height={38}
            onClick={handleClickMain}
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
        {/* 책 소개 부분 */}
        <div className='bg-white w-[1030px] max-w-full h-[326px] rounded-2xl p-10 flex flex-row gap-4'>
          <div className='bg-state-disabled rounded-lg w-[172px] h-[246px]' />
          <div className='flex flex-col justify-between w-[762px] min-h-[246px]'>
            <p className='text-gray-500 text-xs'>국내도서&gt;소설/시/희곡&gt;독일소설</p>
            <p className='text-gray-900 text-base font-medium'>데미안</p>
            <p className='text-gray-700 text-xs font-medium'>헤르만 헤세 지음, 전영애 옮김</p>
            <p className='text-gray-500 text-xs'>민음사 • 2000.12.19</p>
            <p className='text-gray-700 text-sm line-clamp-4 overflow-hidden'>
              {/* description 텍스트 */}
              작품마다 치밀한 취재와 정교한 구성을 바탕으로 한 개성적인 캐릭터와 강렬하고도 서늘한
              서사로 평단과 독자의 주목을 고루 받으며 새로운 세대의 리얼리즘을 열어가고 있다
              평가받는 작가 성해나가 두번째 소설집 『혼모노』를 선보인다. 성해나는 2024·2025
              젊은작가상, 2024 이효석문학상 우수작품상, 2024 김만중문학상 신인상 등 다수의 문학상을
              연달아 수상하고 온라인 서점 예스24가 선정한 ‘2024 한국문학의 미래가 될 젊은 작가’
              투표에서 1위로 선정되는 등 이미 그 화제성을 증명한 바 있다.첫 소설집 『빛을 걷으면
              빛』(문학동네 2022)에서 타인을 이해하려는 시도를 부드럽고 따스한 시선으로 담아내고, 첫
              장편소설 『두고 온 여름』(창비 2023)에서 오해와 결별로 얼룩진 과거에 애틋한 인사를
              건네고자 했던 그가 『혼모노』에 이르러 더욱 예리해진 문제의식과 흡인력 넘치는 서사를
              통해 지역, 정치, 세대 등 우리를 가르는 다양한 경계를 들여다보며 세태의 풍경을 선명하게
              묘파해낸다. 특히 이번 소설집에는 지난해 끊임없이 호명되며 문단을 휩쓸었다 해도 과언이
              아닐 표제작 「혼모노」를 비롯해 작가에게 2년 연속 젊은작가상을 선사해준 「길티 클럽:
              호랑이 만지기」, 이 계절의 소설과 올해의 문제소설에 선정된 「스무드」 등이 수록되어
              더욱 눈길을 끈다. “작가의 ‘신명’이라 불”릴(추천사, 이기호) 만큼 “질투 나는
              재능”(추천사, 박정민)으로 빛나는 『혼모노』, 그토록 기다려왔던 한국문학의 미래가 바로
              지금 우리 앞에 도착해 있다.
            </p>
            <div className='flex flex-row justify-between'>
              {readingStatus === 'completed' ? (
                <button className='flex flex-row items-center w-[88px] h-[50px] bg-primary-lightblue rounded-lg px-5 py-2.5 gap-2.5 text-state-success'>
                  <Image
                    src='/icons/completeRead.svg'
                    alt='completeRead'
                    width={16.76}
                    height={24}
                  />
                  <span className='text-xs'>완료</span>
                </button>
              ) : readingStatus === 'reading' ? (
                <button className='flex flex-row items-center w-[88px] h-[50px] bg-primary-lightblue rounded-lg px-5 py-2.5 gap-2.5 text-state-success'>
                  <Image
                    src='/icons/completeRead.svg'
                    alt='completeRead'
                    width={16.76}
                    height={24}
                  />
                  <span className='text-xs'>읽는 중</span>
                </button>
              ) : (
                <button className='flex flex-row items-center w-[88px] h-[50px] bg-primary-lightblue rounded-lg px-5 py-2.5 gap-2.5 text-gray-500'>
                  <Image
                    src='/icons/noIndex.svg'
                    alt='noIndex'
                    width={16.76}
                    height={24}
                  />
                  <span className='text-xs'>인덱스 없음</span>
                </button>
              )}
              <button className='w-[300px] h-[50px] bg-state-success text-white px-4 py-2 gap-2.5 text-base rounded-sm'>
                기록하기
              </button>
            </div>
          </div>
        </div>

        {/* 감정 점수 순위 */}
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col max-w-full h-[64px] gap-2 justify-between'>
            <p className='font-semibold text-2xl leading-[30px]'>도서의 감정 점수 순위</p>
            <p className='text-gray-700 leading-[25px] text-base'>
              누적된 감정을 점수로 환산해 순위로 정리했어요.
            </p>
          </div>
          {hasEmotion ? (
            <div className='flex flex-row items-center justify-between'>
              <div className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-8 py-6 gap-2'>
                <p>순위</p> <p>이미지</p>
                <p>감정</p> <p>이름</p> <p>스코어</p>
              </div>
              <div className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-8 py-6 gap-2'>
                <p>순위</p> <p>이미지</p>
                <p>감정</p> <p>이름</p> <p>스코어</p>
              </div>
              <div className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-8 py-6 gap-2'>
                <p>순위</p> <p>이미지</p>
                <p>감정</p> <p>이름</p> <p>스코어</p>
              </div>
              <div className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-8 py-6 gap-2'>
                <p>순위</p> <p>이미지</p>
                <p>감정</p> <p>이름</p> <p>스코어</p>
              </div>
              <div className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-8 py-6 gap-2'>
                <p>순위</p> <p>이미지</p>
                <p>감정</p> <p>이름</p> <p>스코어</p>
              </div>
              <div className='bg-gray-100 w-[144px] h-[184px] rounded-[10px] px-8 py-6 gap-2'>
                <p>순위</p> <p>이미지</p>
                <p>감정</p> <p>이름</p> <p>스코어</p>
              </div>
            </div>
          ) : (
            <div className='bg-white w-full h-[184px] rounded-3xl p-10 flex flex-col justify-center items-center gap-2'>
              <Image
                src='/icons/emotion/neutralityIcon.svg'
                alt='emotionIcon'
                width={34.75}
                height={40.35}
              />
              <p className='text-gray-700 font-serif font-bold text-base'>
                이 책의 감정 기록이 아직 없어요.
              </p>
            </div>
          )}
          {hasEmotion ? (
            <div className='flex flex-row items-center justify-between'>
              <Image
                src='/icons/arrowLeft.svg'
                alt='arrowLeft'
                width={20}
                height={20}
              />
              <div className='flex flex-row w-[30px] h-[10px] gap-2 justify-between items-center'>
                <Image
                  src='/icons/paginationClick.svg'
                  alt='paginationClcik'
                  width={20}
                  height={20}
                />
                <Image
                  src='/icons/paginationNoClick.svg'
                  alt='paginationNoClcik'
                  width={20}
                  height={20}
                />
              </div>
              <Image
                src='/icons/arrowRight.svg'
                alt='arrowRight'
                width={20}
                height={20}
              />
            </div>
          ) : (
            <div className='invisible flex flex-row items-center justify-between'>
              <Image
                src='/icons/arrowLeft.svg'
                alt='arrowLeft'
                width={20}
                height={20}
              />
              <div className='flex flex-row w-[30px] h-[10px] gap-2 justify-between items-center'>
                <Image
                  src='/icons/paginationClick.svg'
                  alt='paginationClcik'
                  width={20}
                  height={20}
                />
                <Image
                  src='/icons/paginationNoClick.svg'
                  alt='paginationNoClcik'
                  width={20}
                  height={20}
                />
              </div>
              <Image
                src='/icons/arrowRight.svg'
                alt='arrowRight'
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
