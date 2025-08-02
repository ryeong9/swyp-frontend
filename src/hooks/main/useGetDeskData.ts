import { getDeskData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetDeskData = () => {
  const { data } = useQuery({
    queryKey: ['deskData'],
    queryFn: getDeskData,
  });
  return { data };
};

export default useGetDeskData;
