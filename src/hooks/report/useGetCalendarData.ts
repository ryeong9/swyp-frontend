import { getCalendarData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetCalendarData = (year: number, month: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['calendarData', year, month],
    queryFn: () => getCalendarData(year, month),
  });
  return { data, isLoading };
};

export default useGetCalendarData;
