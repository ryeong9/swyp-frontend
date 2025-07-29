// 로그인 유저 확인
export type User = {
  name: string;
  email: string;
};

//이메일&닉네임 중복확인
export type DuplicationCheck = {
  available: boolean;
};
