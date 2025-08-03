import { getBooksSearch } from '@/apis/auth/authApi';
import { useQuery } from '@tanstack/react-query';
export const useTitleSearch = () => {
  return useQuery({
    queryKey: ['bookSearch'],
    queryFn: getBooksSearch,
  });
};
