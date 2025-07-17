export default function NotificationDropDown() {
  const data = [
    { id: 1, title: '알림1' },
    { id: 2, title: '알림2' },
    { id: 3, title: '알림3' },
    { id: 4, title: '알림4' },
  ];
  return (
    <div className='absolute top-14 -right-[19px] mt-[10px] w-[430px] h-[562px] drop-shadow-sm z-10 bg-background-input p-5 rounded-[14px]'>
      <img
        src='/icons/polygon.svg'
        alt='삼각형'
        className='absolute -top-[18px] right-[78px] w-[24px] h-[20px]'
      />
      <div className='flex flex-col'>
        <div className='flex justify-between mb-5'>
          <h1 className='font-sans font-medium text-xl text-gray-900'>알림</h1>
          <button className='font-sans text-xs text-gray-500'>모두 읽음</button>
        </div>
        <div className='grid grid-col-1 grid-row-4 gap-y-[10px]'>
          {data.map((item) => (
            <div
              key={item.id}
              className='w-[390px] h-[112px] rounded-[10px] bg-gray-200'
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
