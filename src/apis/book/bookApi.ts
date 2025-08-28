//bookApi.ts
import { authInstance } from '@/lib/axios';

import {
  Book,
  CalendarData,
  GraphData,
  BookDetail,
  RankingData,
  RecordedData,
  RecordFinishedData,
  RecordReadingData,
  TitleSearch,
  BookStatus,
  AddDeskData,
  ReadRecordList,
  ReadRecordData,
  UpdateFormReading,
  UpdateFormFinished,
  BookHeartData,
} from '@/types';

// 책장 api
export const getBookshelfData = async (): Promise<Book[]> => {
  const response = await authInstance.get<Book[]>('/api/bookshelf/finished');
  return response.data;
};

// 책상 api
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

// 내 독서 기록 api
export const getRecordedData = async (): Promise<RecordedData> => {
  const response = await authInstance.get<RecordedData>('/api/reports');
  return response.data;
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

// 책상에 등록 api
export const postAddDesk = async (isbn: string): Promise<AddDeskData> => {
  const response = await authInstance.post('/api/addBookshelf', {
    isbn,
  });
  return response.data;
};

// 하나의 도서에 대한 모든 기록 조회
export const getAllRecordForBook = async (bookshelfId: number): Promise<ReadRecordList> => {
  const response = await authInstance.get(`/api/bookshelf/${bookshelfId}/records`);
  return response.data;
};

// 모든 기록 안에서 하나의 기록 조회 (읽는중)
export const getReadingRecordForBook = async (recordId: number): Promise<ReadRecordData> => {
  const response = await authInstance.get(`/api/records/pages/${recordId}`);
  return response.data;
};
// 모든 기록 안에서 하나의 기록 조회 (완독)
export const getFinishedRecordForBook = async (bookshelfId: number): Promise<ReadRecordData> => {
  const response = await authInstance.get(`/api/records/completion/${bookshelfId}`);
  return response.data;
};

// 하나의 기록 수정 (읽는 중)
export const putReadingForm = async (updateForm: UpdateFormReading, recordId: number) => {
  const response = await authInstance.put<UpdateFormReading>(
    `/api/records/pages/${recordId}`,
    updateForm,
  );
  return response.data;
};
// 하나의 기록 수정 (완독)
export const putFinishedForm = async (updateForm: UpdateFormFinished, bookshelfId: number) => {
  const response = await authInstance.put<UpdateFormFinished>(
    `/api/records/completion/${bookshelfId}`,
    updateForm,
  );
  return response.data;
};

// 하나의 기록 삭제 (읽는 중)
export const deleteReadingRecord = async (recordId: number) => {
  const response = await authInstance.delete(`/api/records/pages/${recordId}`);
  return response.data;
};
// 하나의 기록 삭제 (다 읽음)
export const deleteFinishedRecord = async (bookshelfId: number) => {
  const response = await authInstance.delete(`/api/records/completion/${bookshelfId}`);
  return response.data;
};

//찜목록에 도서 추가
export const postAddBookHeart = async (isbn: string) => {
  const response = await authInstance.post<BookHeartData>('/api/wishlist', { isbn });
  return response;
};
