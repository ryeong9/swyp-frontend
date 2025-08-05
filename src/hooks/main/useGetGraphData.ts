import { getGraphData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetGraphData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['GraphData'],
    queryFn: getGraphData,
  });
  return { data, isLoading };
};

export default useGetGraphData;
