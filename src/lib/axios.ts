// src/lib/axios.ts
import axios from 'axios';
import { BASE_URL } from '@/constants/env';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 기반 인증 시 반드시 필요
});

export default instance;
