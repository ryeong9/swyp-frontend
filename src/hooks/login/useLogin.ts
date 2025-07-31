import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth/authApi';
import { Login } from '@/types';

type ModalType = 'none' | 'loginError' | 'loginAlready' | 'loginDuplicate';

export const useLogin = (onModalChange: (type: ModalType) => void) => {
  return useMutation<Login, Error, Login>({
    mutationFn: ({ email, password }: Login) => postLogin(email, password),
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '';
      if (errorMessage.includes('이메일 또는 비밀번호')) {
        onModalChange('loginError');
      } else if (errorMessage.includes('기존 로그인 방식')) {
        onModalChange('loginAlready');
      } else if (errorMessage.includes('이미 가입한 계정')) {
        onModalChange('loginDuplicate');
      } else {
        onModalChange('loginError');
      }
    },
  });
};
