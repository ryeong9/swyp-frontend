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

// 로컬 로그인 정보
export type LoginResponse = {
  accessToken: string;
  userResponse: {
    userId: number;
    email: string;
    nickname: string;
    provider: string;
  };
};

// 감정 제외 상태관리 타입
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

// 읽는 중인 책 기록 요청값
export type RecordReadingData = {
  isbn: string;
  page: number | null;
  content: string | null;
  emotions: Emotions[];
};
// 다 읽은 책 기록 요청값
export type RecordFinishedData = {
  isbn: string;
  content: string | null;
  finalNote: string | null;
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

// 달력 데이터 응답값
export type CalendarData = {
  date: string;
  books: {
    isbn: string;
    title: string;
    coverImage: string;
    status: 'READING' | 'COMPLETE';
    emotionsId: number[];
    startDate: boolean;
    finishDate: boolean;
  }[];
}[];

// ranking top3
export type RankingData = {
  emotionId: number;
  emotionName: string;
  score: number;
}[];

// 월별 그래프 api
export type GraphData = {
  year: number;
  month: number;
  readingDays: number;
}[];
