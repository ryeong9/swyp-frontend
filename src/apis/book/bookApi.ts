import { authInstance } from '@/lib/axios';
import { Book, CalendarData, RecordFinishedData, RecordReadingData } from '@/types';

// 책상 api
export const getDeskData = async (): Promise<Book[]> => {
  const response = await authInstance.get<Book[]>('/api/desk/reading');
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
