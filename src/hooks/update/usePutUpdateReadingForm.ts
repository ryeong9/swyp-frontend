import { putReadingForm } from '@/apis/book/bookApi';
import { UpdateFormReading } from '@/types';
import { useMutation } from '@tanstack/react-query';

const usePutUpdateReadingForm = (onSuccessModalOpen: () => void) => {
  return useMutation({
    mutationFn: ({ updateForm, recordId }: { updateForm: UpdateFormReading; recordId: number }) =>
      putReadingForm(updateForm, recordId),
    onSuccess: () => {
      onSuccessModalOpen();
    },
    onError(error) {
      console.log(error);
    },
  });
};

export default usePutUpdateReadingForm;
