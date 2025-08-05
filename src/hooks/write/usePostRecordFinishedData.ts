import { postRecordFinishedData } from '@/apis/book/bookApi';
import { useMutation } from '@tanstack/react-query';

const usePostRecordFinishedData = (onSuccessModalOpen: () => void) => {
  return useMutation({
    mutationFn: postRecordFinishedData,
    onSuccess: () => {
      onSuccessModalOpen();
    },
    onError(error) {
      console.log(error);
    },
  });
};

export default usePostRecordFinishedData;
