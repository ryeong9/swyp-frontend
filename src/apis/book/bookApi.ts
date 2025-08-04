import { authInstance } from '@/lib/axios';
import { Book, RecordFinishedData, RecordReadingData } from '@/types';

// 책상 api 호출
export const getDeskData = async (): Promise<Book[]> => {
  const response = await authInstance.get('/api/desk/reading');
  return response.data;
};

// 책 추가하기 모달 api
export const getOnlyDeskData = async (): Promise<Book[]> => {
  const response = await authInstance.get('/api/desk/reading-only');
  return response.data;
};

// 읽는 중 기록하기 api 호출
export const postRecordReadingData = async (
  recordData: RecordReadingData,
): Promise<RecordReadingData> => {
  const response = await authInstance.post('/api/records/pages', recordData);
  return response.data;
};

// 다 읽음 기록하기 api 호출
export const postRecordFinishedData = async (
  recordData: RecordFinishedData,
): Promise<RecordFinishedData> => {
  const response = await authInstance.post('/api/records/completion', recordData);
  return response.data;
};
