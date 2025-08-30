import { getWishList } from '@/apis/book/bookApi';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

const useGetWishlist = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  return useQuery({
    queryKey: ['wishlistData'],
    queryFn: getWishList,
    enabled: isLogin,
  });
};

export default useGetWishlist;
