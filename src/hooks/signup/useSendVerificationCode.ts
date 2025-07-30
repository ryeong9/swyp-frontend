import { useMutation } from '@tanstack/react-query';
import { sendVerificationCode } from '@/apis/auth/authApi';

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
  });
};
