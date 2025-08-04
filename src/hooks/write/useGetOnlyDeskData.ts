import { getOnlyDeskData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetOnlyDeskData = () => {
  const { data } = useQuery({
    queryKey: ['OnlyDeskData'],
    queryFn: getOnlyDeskData,
  });
  return { data };
};

export default useGetOnlyDeskData;
