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

export type Login = {
  email: string;
  password: string;
};

// 감정 제외 전부 전송 타입
export type RecordDataState = {
  isbn: string;
  status: string;
  page?: number;
  content: string;
  finalNote?: string;
};

// 감정 상태관리 타입
export type Emotions = {
  emotionId: number;
  score: number;
};

// 기록할 전체 데이터 타입
export type RecordData = RecordDataState & {
  emotions: Emotions[];
};

// 도서 응답값
export type Book = {
  bookshelfId: number;
  status: string;
  isbn: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  category: string;
  publishedDate: string;
};
