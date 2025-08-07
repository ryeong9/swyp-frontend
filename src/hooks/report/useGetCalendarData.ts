import { getCalendarData } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetCalendarData = (year: number, month: number) => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading } = useQuery({
    queryKey: ['calendarData', year, month],
    queryFn: () => getCalendarData(year, month),
    enabled: isLogin,
  });
  return { data, isLoading };
};

export default useGetCalendarData;
