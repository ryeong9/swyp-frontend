import { useQuery } from '@tanstack/react-query';
import { emailAvailable } from '@/apis/auth/authApi';

export const useEmailCheck = (email: string, enabled = false) => {
  return useQuery({
    queryKey: ['emailAvailable', email],
    queryFn: () => emailAvailable(email),
    enabled,
    retry: false,
  });
};
