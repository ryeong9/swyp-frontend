import { getAllRecordForBook } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetAllRecords = (bookshelfId?: number) => {
  return useQuery({
    queryKey: ['allRecords'],
    queryFn: () => getAllRecordForBook(bookshelfId!),
    enabled: typeof bookshelfId === 'number',
  });
};

export default useGetAllRecords;
