import { putFinishedForm } from '@/apis/book/bookApi';
import { UpdateFormFinished } from '@/types';
import { useMutation } from '@tanstack/react-query';

const usePutUpdateFinishedForm = (onSuccessModalOpen: () => void) => {
  return useMutation({
    mutationFn: ({
      updateForm,
      bookshelfId,
    }: {
      updateForm: UpdateFormFinished;
      bookshelfId: number;
    }) => putFinishedForm(updateForm, bookshelfId),
    onSuccess: () => {
      onSuccessModalOpen();
    },
    onError(error) {
      console.log(error);
    },
  });
};

export default usePutUpdateFinishedForm;
