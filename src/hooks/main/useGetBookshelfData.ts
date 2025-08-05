import { getBookshelfData } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetBookshelfData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['bookshelfData'],
    queryFn: getBookshelfData,
  });
  return { data, isLoading };
};

export default useGetBookshelfData;
