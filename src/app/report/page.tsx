import BackButton from '@/components/backButton/backButton';
import Header from '@/components/header/header';
import Calendar from '@/components/reportPage/calendar';
import MyBookHistory from '@/components/reportPage/myBookHistory';

export default function ReportPage() {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='w-[1030px] flex justify-start'>
        <BackButton />
      </div>
      <div className='w-[1030px] flex flex-col mx-auto pb-14'>
        <Calendar />
        <div className='flex flex-col mb-7'>
          <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>
            내 독서
          </h1>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            감정과 함께 독서 데이터를 정리해 드렸어요.
          </p>
        </div>
        <MyBookHistory />
      </div>
    </div>
  );
}
