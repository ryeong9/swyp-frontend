import { useEffect } from 'react';
interface ModalProps {
  onClose: () => void;
}

export const SignupErrorModal = ({ onClose }: ModalProps) => {
  const preventOffModal = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 flex justify-center items-center w-full h-full bg-gray-500/50'
    >
      <div
        onClick={preventOffModal}
        className='bg-white w-[412px] h-[250px] rounded-2xl flex flex-col items-center justify-center px-6'
      >
        <p className='font-semibold text-[20px] mb-4 text-center'>회원가입에 실패했어요</p>

        <div className='text-gray-700 text-sm text-center leading-relaxed mb-6'>
          <p>일시적인 오류가 발생했어요</p>
          <p>네트워크 연결을 확인하거나 다시 시도해주세요</p>
        </div>

        <button
          type='button'
          onClick={onClose}
          className='w-[300px] h-[50px] rounded-lg bg-state-success text-white'
        >
          회원가입 화면 돌아가기
        </button>
      </div>
    </div>
  );
};
