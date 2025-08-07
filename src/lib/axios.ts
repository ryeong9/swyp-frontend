// src/lib/axios.ts
import axios from 'axios';
import { BASE_URL } from '@/constants/env';
import useAuthStore from '@/stores/useAuthStore';

// 기본 instance
export const defaultInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Auth 전용 instance
export const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 기반 인증 시 반드시 필요
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && error.response.data?.code === 'TOKEN_EXPIRED') {
      try {
        const res = await authInstance.post(`${BASE_URL}/api/auth/refresh`);
        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        useAuthStore.getState().setIsLogin(true);

        // 원래 요청 재시도
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return await authInstance(error.config);
      } catch (refreshError) {
        // 로그아웃 처리
        authInstance.post('/logout');
        localStorage.removeItem('accessToken');
        useAuthStore.getState().setIsLogin(false);
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  },
);

export default { defaultInstance, authInstance };
