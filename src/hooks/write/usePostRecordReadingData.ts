import { postRecordReadingData } from '@/apis/book/bookApi';
import { useMutation } from '@tanstack/react-query';

const usePostRecordReadingData = (onSuccessModalOpen: () => void) => {
  return useMutation({
    mutationFn: postRecordReadingData,
    onSuccess: () => {
      onSuccessModalOpen();
    },
    onError(error) {
      console.log(error);
    },
  });
};

export default usePostRecordReadingData;
