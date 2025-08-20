import { getFinishedRecordForBook, getReadingRecordForBook } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';

const useGetRecordInfo = (status: string, recordId?: number, bookshelfId?: number) => {
  return useQuery({
    queryKey: ['recordInfo', status, recordId, bookshelfId],
    queryFn: () => {
      if (status === '읽는 중' && recordId) return getReadingRecordForBook(recordId);
      if (status === '다 읽음' && bookshelfId) return getFinishedRecordForBook(bookshelfId);
    },
    enabled: !!status,
  });
};

export default useGetRecordInfo;
