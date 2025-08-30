export default function RecommendationSkeleton() {
  return (
    <>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>
          나의 감정과 어울리는 책
        </h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            가장 크게 느낀 감정을 바탕으로 추천했어요.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-3 grid-rows-1 gap-x-[35px] mb-40'>
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className='w-[320px] h-[410px] rounded-2xl bg-gray-200'
          ></div>
        ))}
      </div>
    </>
  );
}
