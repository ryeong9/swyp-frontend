import { getBookStatus, getDetail } from '@/apis/book/bookApi';
import { useQuery } from '@tanstack/react-query';
import { BookDetail, BookStatus } from '@/types';

export const useDetail = (isbn: string) => {
  return useQuery<BookDetail, Error>({
    queryKey: ['bookDetail', isbn],
    queryFn: () => getDetail(isbn),
    enabled: !!isbn, // isbn 있을 때만 쿼리 실행
  });
};

export const useBookStatus = (isbn: string) => {
  return useQuery<BookStatus, Error>({
    queryKey: ['bookState', isbn],
    queryFn: () => getBookStatus(isbn),
    enabled: !!isbn,
  });
};
