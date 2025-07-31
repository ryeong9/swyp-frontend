import { useQuery, useMutation } from '@tanstack/react-query';
import {
  emailAvailable,
  nicknameAvailable,
  sendVerificationCode,
  checkVerificationCode,
  postSignup,
} from '@/apis/auth/authApi';

export const useNicknameCheck = (nickname: string, enabled = false) => {
  return useQuery({
    queryKey: ['nicknameAvailable', nickname],
    queryFn: () => nicknameAvailable(nickname),
    enabled,
    retry: false,
  });
};

export const useEmailCheck = (email: string, enabled = false) => {
  return useQuery({
    queryKey: ['emailAvailable', email],
    queryFn: () => emailAvailable(email),
    enabled,
    retry: false,
  });
};

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
  });
};

export const useCheckVerificationCode = () => {
  return useMutation({
    mutationFn: ({ email, authCode }: { email: string; authCode: string }) =>
      checkVerificationCode(email, authCode),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: ({
      email,
      password,
      nickname,
    }: {
      email: string;
      password: string;
      nickname: string;
    }) => postSignup(email, password, nickname),
  });
};
