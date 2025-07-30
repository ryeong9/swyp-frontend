export default function DeskSection() {
  const data = [
    { type: 'recommend', book: { id: 1, title: '추천1' } },
    { type: 'recommend', book: { id: 2, title: '추천2' } },
    { type: 'reading', book: { id: 3, title: '읽는 중1' } },
    { type: 'reading', book: { id: 4, title: '읽는 중2' } },
    { type: 'reading', book: { id: 5, title: '읽는 중3' } },
  ];

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
        <div className='flex justify-between items-center mb-6 px-10'>
          {data.map((item) => {
            return (
              <div
                key={item.book.id}
                className='relative w-[172px] h-[246px] bg-gray-500 rounded-lg cursor-pointer'
              >
                {item.book.title}
                {item.type === 'recommend' ? (
                  <div
                    className='absolute flex justify-center w-[50px] h-[80px] top-[-10px] right-[10px] bg-[#D2DEF4]/80 z-10 rounded-t-[2px]'
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                    }}
                  />
                ) : (
                  ''
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
