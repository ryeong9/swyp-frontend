//bookApi.ts
import { authInstance } from '@/lib/axios';
import { Book, RecordData, TitleSearch } from '@/types';

// 책상 api 호출
export const getDeskData = async (): Promise<Book[]> => {
  const response = await authInstance.get('/api/desk/reading');
  return response.data;
};

// 기록하기 api 호출
export const postRecordData = async (recordData: RecordData): Promise<RecordData> => {
  const response = await authInstance.post('/api/records/pages', recordData);
  return response.data;
};

//검색결과-제목
export const getBooksSearch = async (keyword: string, startIndex: number): Promise<TitleSearch> => {
  const res = await authInstance.get('/api/books/search/title', {
    params: {
      keyword,
      startIndex,
    },
  });
  return res.data;
};

//검색-감정
export const getEmotionSearch = async (
  keyword: string,
  startIndex: number,
): Promise<TitleSearch> => {
  const res = await authInstance.get('/api/books/search/emotion', {
    params: {
      keyword,
      startIndex,
    },
  });
  return res.data;
};
