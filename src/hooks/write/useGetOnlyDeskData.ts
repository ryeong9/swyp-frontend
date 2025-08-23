import { getOnlyDeskData } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetOnlyDeskData = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  return useQuery({
    queryKey: ['OnlyDeskData'],
    queryFn: getOnlyDeskData,
    enabled: isLogin,
  });
};

export default useGetOnlyDeskData;
