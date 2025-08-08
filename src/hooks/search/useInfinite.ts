import { useInfiniteQuery } from '@tanstack/react-query';
import { getBooksSearch, getEmotionSearch } from '@/apis/book/bookApi';
import { TitleSearch } from '@/types';

export const useInfiniteTitleSearch = (keyword: string) => {
  return useInfiniteQuery<TitleSearch, Error>({
    queryKey: ['infiniteBookSearch', keyword],
    queryFn: ({ pageParam = 1 }) => getBooksSearch(keyword, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = lastPage?.totalResults || 0;
      const loadedItems = allPages.flatMap((page) => page.books || []).length;
      if (lastPage.books?.length === 0) return undefined; // 빈 페이지면 중단
      return loadedItems < totalResults ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!keyword,
  });
};

export const useInfiniteEmotionSearch = (keyword: string) => {
  return useInfiniteQuery<TitleSearch, Error>({
    queryKey: ['infiniteEmotionSearch', keyword],
    queryFn: ({ pageParam = 1 }) => getEmotionSearch(keyword, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = lastPage?.totalResults || 0;
      const loadedItems = allPages.flatMap((page) => page.books || []).length;
      if (lastPage.books?.length === 0) return undefined; // 빈 페이지면 중단
      return loadedItems < totalResults ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!keyword,
  });
};
