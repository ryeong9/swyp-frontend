export default function BookshelfSkeleton() {
  return (
    <div className='flex flex-col my-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책장</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금까지 읽었던 책들이 책장에 꽂혀 있어요
          </p>
          <button
            type='button'
            className='flex cursor-pointer'
          >
            <p className='font-sans text-xs text-gray-500 mr-2'>더 보기</p>
            <img
              src='/icons/arrowRight.svg'
              alt='오른쪽 화살표'
            />
          </button>
        </div>
      </div>
      <div className='w-full h-[596px] grid grid-cols-5 grid-rows-2 gap-x-[22.5px] gap-y-6 bg-background-input rounded-3xl p-10'>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className='w-[172px] h-[246px] rounded-lg bg-gray-200'
          ></div>
        ))}
      </div>
    </div>
  );
}
