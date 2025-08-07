import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth/authApi';
import { Login, LoginResponse } from '@/types';
import useAuthStore from '@/stores/useAuthStore';

type ModalType = 'none' | 'loginError' | 'loginAlready' | 'loginDuplicate';

export const useLogin = (onModalChange: (type: ModalType) => void) => {
  return useMutation<LoginResponse, Error, Login>({
    mutationFn: ({ email, password }: Login) => postLogin(email, password),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        useAuthStore.getState().setIsLogin(true);
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '';
      if (errorMessage.includes('이메일 또는 비밀번호')) {
        onModalChange('loginError');
      } else if (errorMessage.includes('기존 로그인 방식')) {
        onModalChange('loginAlready');
      } else {
        onModalChange('loginError');
      }
    },
  });
};
