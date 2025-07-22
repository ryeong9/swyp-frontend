// src/lib/axios.ts
import axios from 'axios';
import { BASE_URL } from '@/constants/env';

// 기본 instance
const defaultInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Auth 전용 instance
const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 기반 인증 시 반드시 필요
});

export default { defaultInstance, authInstance };
