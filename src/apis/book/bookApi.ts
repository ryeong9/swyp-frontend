//bookApi.ts
import { authInstance, defaultInstance } from '@/lib/axios';
import {
  Book,
  CalendarData,
  DeskDataWithRec,
  GraphData,
  BookDetail,
  RankingData,
  RecordFinishedData,
  RecordReadingData,
  TitleSearch,
  BookStatus,
} from '@/types';

// 책상 api
export const getDeskData = async (): Promise<DeskDataWithRec> => {
  const response = await authInstance.get<DeskDataWithRec>('/api/desk/reading');
  return response.data;
};

// 책장 api
export const getBookshelfData = async (): Promise<Book[]> => {
  const response = await authInstance.get<Book[]>('/api/bookshelf/finished');
  return response.data;
};

// 책 추가하기 모달 api
export const getOnlyDeskData = async (): Promise<Book[]> => {
  const response = await authInstance.get<Book[]>('/api/desk/reading-only');
  return response.data;
};

// 읽는 중 기록하기 api
export const postRecordReadingData = async (
  recordData: RecordReadingData,
): Promise<RecordReadingData> => {
  const response = await authInstance.post<RecordReadingData>('/api/records/pages', recordData);
  return response.data;
};

// 다 읽음 기록하기 api
export const postRecordFinishedData = async (
  recordData: RecordFinishedData,
): Promise<RecordFinishedData> => {
  const response = await authInstance.post<RecordFinishedData>(
    '/api/records/completion',
    recordData,
  );
  return response.data;
};

// 달력 데이터 api
export const getCalendarData = async (year: number, month: number): Promise<CalendarData> => {
  const response = await authInstance.get<CalendarData>('/api/calendar', {
    params: {
      year: year,
      month: month,
    },
  });
  return response.data;
};

// 감정 랭킹 top3 api
export const getRankingData = async (): Promise<RankingData> => {
  const response = await authInstance.get<RankingData>('/api/reports/ranking');
  return response.data;
};

// 6개월 그래프 데이터 api
export const getGraphData = async (): Promise<GraphData> => {
  const response = await authInstance.get<GraphData>('/api/stats/monthly-reading-days');
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

//상세페이지
export const getDetail = async (isbn: string): Promise<BookDetail> => {
  const res = await authInstance.get(`/api/books/${isbn}`);
  return res.data;
};
//책 상태 값
export const getBookStatus = async (isbn: string): Promise<BookStatus> => {
  const res = await authInstance.get(`/api/books/${isbn}/me/status`);
  return res.data;
};
