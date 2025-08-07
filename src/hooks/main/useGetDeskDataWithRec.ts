import { getDeskData } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetDeskData = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading } = useQuery({
    queryKey: ['deskData'],
    queryFn: getDeskData,
    enabled: isLogin,
  });
  return { data, isLoading };
};

export default useGetDeskData;
