import { authInstance } from '@/lib/axios';
import { Book, RecordData } from '@/types';

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
