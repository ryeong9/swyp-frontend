// src/lib/axios.ts
import axios from 'axios';
import { BASE_URL } from '@/constants/env';

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
    const testToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzU0MTk2NDQ4LCJleHAiOjQ5MDc3OTY0NDh9.CYUSytXdd5u8dID5APUX-GB33NXUiwFFPscySsttpIk';
    const accessToken = localStorage.getItem('accessToken') || testToken;

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

        // 원래 요청 재시도
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return authInstance(error.config);
      } catch (refreshError) {
        // 재로그인 유도
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default { defaultInstance, authInstance };
