import { fetchUser } from '@/apis/auth/authApi';
import { useQuery } from '@tanstack/react-query';

export function useUser(enabled: boolean) {
  const {
    data: user,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled,
  });

  if (isError) {
    console.error('유저 정보를 불러오지 못했습니다', error);
  }

  return { user, loading };
}

export default useUser;
