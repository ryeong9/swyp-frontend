import { getGraphData } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetGraphData = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading } = useQuery({
    queryKey: ['GraphData'],
    queryFn: getGraphData,
    enabled: isLogin,
  });
  return { data, isLoading };
};

export default useGetGraphData;
