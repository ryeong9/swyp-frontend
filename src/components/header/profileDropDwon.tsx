export default function ProfileDropDown() {
  return (
    <div className='absolute top-14 -right-[19px] mt-[10px] drop-shadow-sm z-10'>
      <img
        src='/icons/polygon.svg'
        alt='삼각형'
        className='absolute -top-[18px] right-[40px] w-[24px] h-[20px]'
      />
      <div className=' flex flex-col items-center w-[104px] h-[86px] bg-background-input rounded-[10px] px-2 py-[7px]'>
        <button className='w-[88px] font-sans font-semibold text-sm text-gray-900 px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-[4px]'>
          내 정보
        </button>
        <button className='w-[88px] font-sans font-semibold text-sm text-gray-500 px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-[4px]'>
          로그아웃
        </button>
      </div>
    </div>
  );
}
