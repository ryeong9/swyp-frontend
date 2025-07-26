// 일반 로그인, 회원가입 관련 get/post.. api들 모음
import { authInstance } from '@/lib/axios';
import { User } from '@/types';

// 로그인 유저 확인
export const fetchUser = async (): Promise<User> => {
  const res = await authInstance.get('/api/users/me');
  return res.data;
};

// 이메일 중복 확인

// 이메일 인증코드
