import { postAddBookHeart } from '@/apis/book/bookApi';
import { useMutation } from '@tanstack/react-query';

const usePostBookHeart = () => {
  return useMutation({
    mutationFn: (isbn: string) => postAddBookHeart(isbn),
  });
};

export default usePostBookHeart;
