import { getDeskData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetDeskData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['deskData'],
    queryFn: getDeskData,
  });
  return { data, isLoading };
};

export default useGetDeskData;
