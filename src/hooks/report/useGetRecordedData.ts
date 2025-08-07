import { getRecordedData } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetRecordedData = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading } = useQuery({
    queryKey: ['recordedData'],
    queryFn: getRecordedData,
    enabled: isLogin,
  });
  return { data, isLoading };
};

export default useGetRecordedData;
