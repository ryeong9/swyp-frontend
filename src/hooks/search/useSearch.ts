import { getBooksSearch } from '@/apis/auth/authApi';
import { useQuery } from '@tanstack/react-query';
import { TitleSearch } from '@/types'; // 타입 임포트 (경로는 프로젝트 구조에 맞게 조정)

export const useTitleSearch = (keyword: string, startIndex: number) => {
  return useQuery<TitleSearch, Error>({
    queryKey: ['bookSearch', keyword, startIndex],
    queryFn: () => getBooksSearch(keyword, startIndex),
    enabled: !!keyword, // keyword가 있을 때만 쿼리 실행
  });
};
