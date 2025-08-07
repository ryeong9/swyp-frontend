import { getBookshelfData } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetBookshelfData = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading } = useQuery({
    queryKey: ['bookshelfData'],
    queryFn: getBookshelfData,
    enabled: isLogin,
  });
  return { data, isLoading };
};

export default useGetBookshelfData;
