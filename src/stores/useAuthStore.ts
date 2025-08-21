import { create } from 'zustand';

interface AuthState {
  isLogin: boolean;
  isLoading: boolean;
  setIsLogin: (value: boolean) => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  isLoading: true,

  setIsLogin: (value) => set({ isLogin: value }),

  checkAuth: () => {
    const token = typeof window !== 'undefined' && localStorage.getItem('accessToken');
    set({ isLogin: !!token, isLoading: false });
  },
}));

export default useAuthStore;
