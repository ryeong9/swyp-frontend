'use client';

import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  usePostBookHeart,
  useDeleteBookHeart,
  useGetBookHeartStatus,
} from '@/hooks/detail/useBookHeart';

interface BookHeartButtonProps {
  isbn: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const BookHeartButton: React.FC<BookHeartButtonProps> = ({
  isbn,
  onClick,
  disabled = false,
}) => {
  const addMutation = usePostBookHeart();
  const deleteMutation = useDeleteBookHeart();
  const { data: bookHeartStatus, isLoading: statusLoading } = useGetBookHeartStatus(isbn);

  const isBookHeart = bookHeartStatus?.wished || false;
  const isLoading = addMutation.isPending || deleteMutation.isPending || statusLoading;

  const handleBookmark = async () => {
    if (disabled || isLoading) return;

    try {
      if (isBookHeart) {
        await deleteMutation.mutateAsync(isbn);

        toast.success('찜 목록에서 제거되었습니다.', {
          position: 'top-center',
          autoClose: 300,
          hideProgressBar: true,
          closeButton: false,
          style: {
            marginTop: '86px',
            borderRadius: '8px',
            border: '1px solid #9BC99F',
            padding: '24px 32px',
            width: 'fit-content',
            color: '#000000',
            boxShadow: 'none',
          },
        });
      } else {
        await addMutation.mutateAsync(isbn);

        toast.success('찜 목록에 추가되었습니다!', {
          position: 'top-center',
          autoClose: 300,
          hideProgressBar: true,
          closeButton: false,
          style: {
            marginTop: '86px',
            borderRadius: '8px',
            border: '1px solid #9BC99F',
            padding: '24px 32px',
            width: 'fit-content',
            color: '#000000',
            boxShadow: 'none',
          },
        });
      }
    } catch (error: any) {
      console.log('에러 상세:', error);
      const errorData = error.response?.data;
    }

    onClick?.();
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={disabled || isLoading}
      className={`w-[118px] h-[50px] flex flex-row items-center justify-center px-4 py-2 gap-2.5 text-base rounded-sm ${
        isBookHeart ? 'bg-primary-verylight text-gray-700' : 'bg-gray-200 text-gray-700'
      } ${
        disabled || isLoading
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:bg-opacity-80'
      }`}
    >
      <FaBookmark
        className={`w-[17.41px] h-[24.58px] ${
          isBookHeart ? 'text-state-success' : 'text-gray-300'
        }`}
      />
      찜하기
    </button>
  );
};
