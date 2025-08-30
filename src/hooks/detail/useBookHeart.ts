import { postAddBookHeart, deleteBookHeart, getBookHeartStatus } from '@/apis/book/bookApi';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

export const usePostBookHeart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isbn: string) => postAddBookHeart(isbn),
    onSuccess: (data, isbn) => {
      queryClient.invalidateQueries({ queryKey: ['bookHeartStatus', isbn] });
    },
  });
};

export const useDeleteBookHeart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isbn: string) => deleteBookHeart(isbn),
    onSuccess: (data, isbn) => {
      queryClient.invalidateQueries({ queryKey: ['bookHeartStatus', isbn] });
    },
  });
};

export const useGetBookHeartStatus = (isbn: string) => {
  return useQuery({
    queryKey: ['bookHeartStatus', isbn],
    queryFn: () => getBookHeartStatus(isbn),
    enabled: !!isbn, // isbn이 있을 때만 쿼리 실행
  });
};
