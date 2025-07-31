import { useEffect } from 'react';
import Button from '@/components/button/page';
interface ModalProps {
  onClose: () => void;
}
//로그인 실패 팝업
export const LoginErrorModal = ({ onClose }: ModalProps) => {
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
        <p className='font-semibold text-xl mb-4 text-center'>로그인에 실패했어요</p>

        <div className='text-gray-700 text-sm text-center leading-relaxed mb-6'>
          <p>일시적인 오류가 발생했어요</p>
          <p>다시 시도하거나 다른 로그인 방법을 이용해주세요</p>
        </div>

        <button
          type='button'
          onClick={onClose}
          className='w-[300px] h-[50px] rounded-lg bg-state-success text-white'
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
};
//기존 로그인 방식으로 유도 팝업
export const LoginAlreadyModal = ({ onClose }: ModalProps) => {
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
        className='bg-white w-[412px] h-[230px] rounded-2xl flex flex-col items-center justify-center px-6'
      >
        <p className='font-semibold text-xl mb-4 text-center'>이미 로그인한 계정이 있어요</p>

        <div className='text-gray-700 text-sm text-center leading-relaxed mb-6'>
          <p>기존 로그인 방식으로 다시 시도해주세요</p>
        </div>

        <button
          type='button'
          onClick={onClose}
          className='w-[300px] h-[50px] rounded-lg bg-state-success text-white'
        >
          로그인 화면 돌아가기
        </button>
      </div>
    </div>
  );
};
//계정 중복 모달
export const LoginDuplicationModal = ({ onClose }: ModalProps) => {
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
        className='bg-white w-[412px] h-[288px] rounded-2xl flex flex-col items-center justify-center px-6'
      >
        <p className='font-semibold text-xl mb-4 text-center'>이미 가입한 계정이 있어요</p>

        <div className='text-gray-700 text-sm text-center leading-relaxed mb-6'>
          <p>기존 가입한 게정으로 로그인할까요?</p>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <button
            type='button'
            onClick={onClose}
            className='w-[300px] h-[50px] rounded-lg bg-state-success text-white'
          >
            네, 기존 계정으로 로그인 할게요
          </button>
          <button
            type='button'
            onClick={onClose}
            className='w-[300px] h-[50px] rounded-lg bg-gray-200 text-gray-500'
          >
            아니오, 다른 계정으로 로그인할 할래요
          </button>
        </div>
      </div>
    </div>
  );
};
