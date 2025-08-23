export default function BookshelfSkeleton() {
  return (
    <div className='flex flex-col my-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책장</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금까지 읽었던 책들이 책장에 꽂혀 있어요
          </p>
        </div>
      </div>
      <div className='w-full h-[298px] grid grid-cols-5 grid-rows-1 gap-x-[22.5px] bg-background-input rounded-3xl p-10'>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className='w-[172px] h-[246px] rounded-lg bg-gray-200'
          ></div>
        ))}
      </div>
    </div>
  );
}
