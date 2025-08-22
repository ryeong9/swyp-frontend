import { deleteFinishedRecord, deleteReadingRecord } from '@/apis/book/bookApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type DeleteParams =
  | { status: 'READING'; recordId: number }
  | { status: 'FINISHED'; bookshelfId: number };

const useDeleteRecords = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (params: DeleteParams) => {
      if (params.status === 'READING') {
        return deleteReadingRecord(params.recordId);
      }
      return deleteFinishedRecord(params.bookshelfId);
    },
    onSuccess: (_, variables) => {
      if (variables.status === 'READING') {
        queryClient.invalidateQueries({ queryKey: ['allRecords'] });
      }
      if (variables.status === 'FINISHED') {
        router.push('/');
      }
    },
  });
};

export default useDeleteRecords;
