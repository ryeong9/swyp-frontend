import { postLogOut } from '@/apis/auth/authApi';
import useAuthStore from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function ProfileDropDown() {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: postLogOut,
    onSuccess: () => {
      useAuthStore.getState().setIsLogin(false);
      router.push('/login');
    },
  });

  const handleClickLogOutBtn = () => {
    mutate();
  };

  return (
    <div className='absolute top-14 -right-[19px] mt-[10px] drop-shadow-sm z-10'>
      <img
        src='/icons/polygon.svg'
        alt='삼각형'
        className='absolute -top-[18px] right-[40px] w-[24px] h-[20px]'
      />
      <div className='flex flex-col items-center w-[104px] h-[50px] bg-background-input rounded-[10px] px-2 py-[7px]'>
        {/* <button
          type='button'
          className='w-[88px] font-sans font-semibold text-sm text-gray-900 px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-[4px]'
        >
          내 정보
        </button> */}
        <button
          type='button'
          className='w-[88px] font-sans font-semibold text-sm text-gray-500 px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-[4px]'
          onClick={handleClickLogOutBtn}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
