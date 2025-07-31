// 일반 로그인, 회원가입 관련 get/post.. api들 모음

import { defaultInstance, authInstance } from '@/lib/axios';
import { DuplicationCheck, User, VerificationCheck } from '@/types';
import { useQuery } from '@tanstack/react-query';
// 로그인 유저 확인
export const fetchUser = async (): Promise<User> => {
  const res = await authInstance.get('/api/users/me');
  return res.data;
};

//닉네임 중복 확인
export const nicknameAvailable = async (nickname: string): Promise<DuplicationCheck> => {
  const res = await defaultInstance.get('/api/auth/check/nickname', {
    params: { nickname },
  });
  return res.data;
};

// 이메일 중복 확인
export const emailAvailable = async (email: string): Promise<DuplicationCheck> => {
  const res = await defaultInstance.get('/api/auth/check/email', {
    params: { email },
  });
  return res.data;
};

//이메일 인증코드 발송
export const sendVerificationCode = async (email: string) => {
  const res = await defaultInstance.post('/api/auth/verification/send-code', { email });
  return res.data;
};

//이메일 인증코드 검증
export const checkVerificationCode = async (email: string, authCode: string): Promise<number> => {
  const res = await defaultInstance.post('/api/auth/verification/verify-code', {
    email,
    authCode,
  });
  return res.status;
};

//회원가입
export const postSignup = async (email: string, password: string, nickname: string) => {
  const res = await defaultInstance.post('/api/auth/signup', { email, password, nickname });
  return res.data;
};

//로그인
export const postLogin = async (email: string, password: string) => {
  const res = await defaultInstance.post('/api/auth/login', { email, password });
  return res.data;
};
