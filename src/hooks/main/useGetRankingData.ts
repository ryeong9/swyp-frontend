import { getRankingData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetRankingData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['rankingData'],
    queryFn: getRankingData,
  });
  return { data, isLoading };
};

export default useGetRankingData;
