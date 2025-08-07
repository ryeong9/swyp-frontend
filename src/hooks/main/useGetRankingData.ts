import { getRankingData } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetRankingData = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading } = useQuery({
    queryKey: ['rankingData'],
    queryFn: getRankingData,
    enabled: isLogin,
  });
  return { data, isLoading };
};

export default useGetRankingData;
