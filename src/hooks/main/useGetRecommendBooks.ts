import { getRecommendBooks } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetRecommendBooks = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  return useQuery({
    queryKey: ['recommendData'],
    queryFn: getRecommendBooks,
    enabled: isLogin,
  });
};

export default useGetRecommendBooks;
