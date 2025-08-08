import { postAddDesk } from '@/apis/book/bookApi';
import { useMutation } from '@tanstack/react-query';

const usePostAddDesk = () => {
  return useMutation({
    mutationFn: (isbn: string) => postAddDesk(isbn),
  });
};

export default usePostAddDesk;
