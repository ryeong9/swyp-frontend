import { authInstance } from '@/lib/axios';
import { Book } from '@/types';

// 책상 api 호출
export const getDeskData = async (): Promise<Book[]> => {
  const response = await authInstance.get('/api/desk/reading');
  return response.data;
};
