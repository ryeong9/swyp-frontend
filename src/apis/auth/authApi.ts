// 일반 로그인, 회원가입 관련 get/post.. api들 모음
import { authInstance } from '@/lib/axios';
import { DuplicationCheck, User } from '@/types';
import { useQuery } from '@tanstack/react-query';
// 로그인 유저 확인
export const fetchUser = async (): Promise<User> => {
  const res = await authInstance.get('/api/users/me');
  return res.data;
};

//닉네임 중복 확인
export const nicknameAvailable = async (nickname: string): Promise<DuplicationCheck> => {
  const res = await authInstance.get('/api/auth/check/nickname', {
    params: { nickname },
  });
  return res.data;
};

// 이메일 인증코드
export const emailAvailable = async (email: string): Promise<DuplicationCheck> => {
  const res = await authInstance.get('/api/auth/check/email', {
    params: { email },
  });
  return res.data;
};
