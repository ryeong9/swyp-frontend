'use client';

import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
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
        // 현재 찜한 상태 → 찜 해제 (204 응답 예상)
        await deleteMutation.mutateAsync(isbn);

        toast.success('찜 목록에서 제거되었습니다.');
      } else {
        // 현재 찜하지 않은 상태 → 찜 추가 (200 응답)
        await addMutation.mutateAsync(isbn);

        toast.success('찜 목록에 추가되었습니다!');
      }
    } catch (error: any) {
      console.log('에러 상세:', error);
      const errorData = error.response?.data;

      if (isBookHeart) {
        // 찜 해제 실패 - 404: 찜 목록에 없는 도서
        if (errorData?.status === 404) {
          toast.warning('이미 찜 목록에서 제거된 책입니다.');
        } else {
          toast.error('찜 해제 중 오류가 발생했습니다.');
        }
      } else {
        if (errorData?.status === 400) {
          toast.error('잘못된 요청입니다.');
        } else if (errorData?.status === 404) {
          toast.error('존재하지 않는 도서입니다.');
        } else {
          toast.error('찜하기 처리 중 오류가 발생했습니다.');
        }
      }
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
