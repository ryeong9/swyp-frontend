export default function HeroSection() {
  const { nickName, count } = {
    nickName: '용감한모험가',
    count: 5,
  };

  return (
    <section className='relative mt-4 mb-14 px-12 py-10 w-full h-[462px] bg-gray-200 rounded-3xl'>
      <div className='absolute bottom-[40px] flex flex-col w-[400px]'>
        <h1 className='mb-4 font-serif font-bold text-[32px]'>
          {nickName}님, 이번 달에는 <br /> 총 {count}권의 책을 읽었어요.
        </h1>
        <p className='font-sans font-normal text-xl text-gray-900 tracking-wider leading-[30px]'>
          흐릿해지는 기억 속에서도 감정은 선명히 남아요 <br />
          인덱스가 그 감정의 순간들을 모아드릴게요
        </p>
      </div>
    </section>
  );
}
