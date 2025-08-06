import { getRecordedData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetRecordedData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['recordedData'],
    queryFn: getRecordedData,
  });
  return { data, isLoading };
};

export default useGetRecordedData;
