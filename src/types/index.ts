// 로그인 유저 확인
export type User = {
  name: string;
  email: string;
};

//이메일&닉네임 중복확인
export type DuplicationCheck = {
  available: boolean;
};

//이메일 인증코드 검사
export type VerificationCheck = {
  email: string;
  authCode: string;
  success: boolean;
  status: number;
};
//로그인
export type Login = {
  email: string;
  password: string;
};
//제목 검색
export type TitleSearch = {
  page: number;
  totalResults: number;
  books: Array<{
    isbn?: string;
    title: string;
    author: string;
    coverImageUrl: string;
    publishedDate: string;
    publisher: string;
    totalEmotionCount?: number;
    emotions?: Array<{
      id: number;
      name: string;
      scoreSum?: number;
      percentage: number;
    }>;
  }>;
};
