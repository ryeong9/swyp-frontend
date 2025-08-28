'use client';

import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';
import usePostBookHeart from '@/hooks/detail/usePostBookHeart';

interface BookHeartButtonProps {
  isbn: string;
  onClick?: () => void;
  disabled?: boolean;
  isBookHeart: boolean;
}

export const BookHeartButton: React.FC<BookHeartButtonProps> = ({
  isbn,
  onClick,
  disabled = false,
  isBookHeart,
}) => {
  const mutation = usePostBookHeart();
  const [isBookHeartState, setIsBookHeartState] = useState(isBookHeart);

  const handleBookmark = async () => {
    if (disabled) return;

    try {
      const response = await mutation.mutateAsync(isbn);

      // 디버깅: 실제 응답 구조 확인
      console.log('Full response:', response);
      console.log('Response status:', response.status);

      // HTTP 상태 코드가 200이면 성공
      if (response.status === 200) {
        setIsBookHeartState(true);
        toast.success('찜하기에 성공적으로 추가되었습니다! 책상에서 확인하세요.');
      }
    } catch (error: any) {
      console.error('Error details:', error);
      console.log('Error response:', error.response);

      // 에러 응답에서 상태 코드 확인
      const statusCode = error.response?.status;

      if (statusCode === 409) {
        toast.warning('이미 책상에 올려져 있는 책이에요.');
        setIsBookHeartState(true);
      } else if (statusCode === 400) {
        console.error('입력값 오류가 발생했습니다. ISBN을 확인해주세요.');
      } else if (statusCode === 404) {
        console.error('존재하지 않는 도서입니다.');
      } else {
        toast.error('찜하기 처리 중 오류가 발생했습니다.');
      }
    }

    onClick?.();
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={disabled}
      className={`w-[118px] h-[50px] flex flex-row items-center justify-center px-4 py-2 gap-2.5 text-base rounded-sm ${
        isBookHeartState ? 'bg-primary-verylight text-gray-700' : 'bg-gray-200 text-gray-700'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-80'}`}
    >
      <FaBookmark
        className={`w-[17.41px] h-[24.58px] ${
          isBookHeartState ? 'text-state-success' : 'text-gray-300'
        }`}
      />
      찜하기
    </button>
  );
};
