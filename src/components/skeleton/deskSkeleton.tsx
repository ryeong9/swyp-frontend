export default function DeskSkeleton() {
  return (
    <div className='flex flex-col'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책상</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금 읽고 있는 책과 추천 책을 책상 위에 올려놔 보았어요
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
      <div>
        <div className='grid grid-cols-5 grid-rows-1 gap-x-[22.5px] mb-6 px-10'>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className='w-[172px] h-[246px] rounded-lg bg-gray-200'
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
