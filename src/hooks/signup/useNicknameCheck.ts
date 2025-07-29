import { useQuery } from '@tanstack/react-query';
import { nicknameAvailable } from '@/apis/auth/authApi';

export const useNicknameCheck = (nickname: string, enabled = false) => {
  return useQuery({
    queryKey: ['nicknameAvailable', nickname],
    queryFn: () => nicknameAvailable(nickname),
    enabled,
    retry: false,
  });
};
