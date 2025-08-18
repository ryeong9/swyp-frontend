import { getOnlyDeskData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetOnlyDeskData = () => {
  return useQuery({
    queryKey: ['OnlyDeskData'],
    queryFn: getOnlyDeskData,
    // staleTime: 1000 * 60 * 5, // 5분 동안은 새로고침 안 함
    // gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
  });
};

export default useGetOnlyDeskData;
