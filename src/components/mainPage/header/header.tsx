import SearchBar from './searchBar';

export default function Header() {
  return (
    <div className='w-full h-[50px] mt-6 flex'>
      <img
        src='/'
        alt='로고?'
        className='w-[190px] h-[50px] bg-gray-200 mr-5'
      />
      <SearchBar />
      <div className='flex ml-[23px] pr-[23px] items-center'>
        <img
          src='/icons/notification.svg'
          alt='알림함 아이콘'
          className='w-[20px] h-[20px] mr-[18px]'
        />
        <img
          src='/icons/profile.svg'
          alt='프로필 아이콘'
          className='w-[20px] h-[20px]'
        />
      </div>
    </div>
  );
}
