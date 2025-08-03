import { postRecordData } from '@/apis/book/bookApi';
import { useMutation } from '@tanstack/react-query';

const usePostRecordData = (onSuccessModalOpen: () => void) => {
  return useMutation({
    mutationFn: postRecordData,
    onSuccess: () => {
      onSuccessModalOpen();
    },
    onError(error) {
      console.log(error);
    },
  });
};

export default usePostRecordData;
