import { create } from 'zustand';

interface AuthState {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,

  setIsLogin: (value) => set({ isLogin: value }),

  checkAuth: () => {
    const token = typeof window !== 'undefined' && localStorage.getItem('accessToken');
    set({ isLogin: !!token });
  },
}));

export default useAuthStore;
