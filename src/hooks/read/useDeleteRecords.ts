import { deleteFinishedRecord, deleteReadingRecord } from '@/apis/book/bookApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type DeleteParams =
  | { status: 'READING'; recordId: number }
  | { status: 'FINISHED'; bookshelfId: number };

const useDeleteRecords = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteParams) => {
      if (params.status === 'READING') {
        return deleteReadingRecord(params.recordId);
      }
      return deleteFinishedRecord(params.bookshelfId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRecords'] });
    },
  });
};

export default useDeleteRecords;
