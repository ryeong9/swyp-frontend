import useUser from '@/hooks/login/useUser';
import useGetCalendarData from '@/hooks/report/useGetCalendarData';
import HeroSkeleton from '../skeleton/heroSkeleton';
import useAuthStore from '@/stores/useAuthStore';

export default function HeroSection() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const { user, loading } = useUser(isLogin);
  const { data: calendarData, isLoading } = useGetCalendarData(year, month);
  const totalBooks = calendarData
    ? (() => {
        // isbn 중복 제거
        const uniqueIsbn = new Set<string>();

        calendarData.forEach((day) => {
          day.books.forEach((book) => {
            uniqueIsbn.add(book.isbn);
          });
        });

        return uniqueIsbn.size;
      })()
    : 0;

  const isHeroLoading = loading || isLoading;

  if (isHeroLoading) return <HeroSkeleton />;

  return (
    <section className='flex flex-col justify-end w-full h-[462px] bg-[url(/icons/heroHeader.svg)] bg-cover rounded-3xl mt-[88px] mb-14 px-12 pt-10 pb-[89px]'>
      <div className='flex flex-col w-[400px]'>
        <h1 className='mb-4 font-serif font-bold text-[32px]'>
          {user?.nickname}님, 이번 달에는 <br /> 총 {totalBooks}권의 책을 읽었어요.
        </h1>
        <p className='font-sans font-normal text-xl text-gray-900 tracking-wider leading-[30px]'>
          흐릿해지는 기억 속에서도 감정은 선명히 남아요 <br />
          인덱스가 그 감정의 순간들을 모아드릴게요
        </p>
      </div>
    </section>
  );
}
