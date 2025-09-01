// 로그인 유저 확인
export type User = {
  nickname: string;
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

// 공통 기록 응답값
export type BaseRecord = {
  isbn: string;
  status: 'READING' | 'FINISHED';
  content?: string | null;
  finalNote?: string | null;
  emotions: Emotions[];
};

// 프론트 상태 관리용 (감정 제외)
export type RecordDataState = {
  isbn: string;
  status: string;
  page?: number;
  content?: string;
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

// 도서관련 공통 응답값
export type BaseBook = {
  isbn: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  category: string;
  publishedDate: string;
};

// 도서 응답값
export type Book = BaseBook & {
  bookshelfId: number;
  status: string;
};

//제목 검색
export type TitleSearch = {
  page: number;
  totalResults: number;
  books: Array<
    BaseBook & {
      totalEmotionCount?: number;
      userCount?: number;
      emotions?: Emotion[];
    }
  >;
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
export type RankingData = EmotionData[];

// 월별 그래프 api
export type GraphData = {
  year: number;
  month: number;
  readingDays: number;
}[];

// 내 독서 section 타입
export type EmotionState = {
  emotionId: number;
  emotionName: string;
  percentage: number;
};
export type RecordedData = Array<
  BaseBook & {
    status: string;
    createdAt: string;
    finishedAt: string | null;
    currentPage: number | null;
    emotionStats: EmotionState[];
  }
>;

//상세페이지
export type Emotion = {
  id: number;
  name: string;
  scoreSum: number;
  percentage: number;
};

export type BookDetail = BaseBook & {
  description: string;
  totalEmotionCount: number;
  emotions: Emotion[];
};

export type BookStatus = {
  status: 'NONE' | 'WISH' | 'READING' | 'FINISHED';
};

// 책상에 올리기
export type AddDeskData = {
  bookshelfId: number;
  status: string;
  createdAt: string;
  finishedAt: string | null;
  finalNote: string;
  book: BaseBook & {
    description: string;
    totalEmotionCount: number;
  };
};
export const mapAddDeskToBook = (d: AddDeskData): Book => ({
  bookshelfId: d.bookshelfId,
  status: d.status,
  ...d.book,
});

// 하나의 도서에 대한 내 모든 기록 조회
export type ReadRecordData = {
  recordId: number;
  status: 'READING' | 'FINISHED';
  createdAt: string;
  emotions: EmotionData[];
  page?: number;
  content?: string;
  finalNote?: string;
};
export type ReadRecordList = ReadRecordData[];

// Id 관리
export type IdState = {
  recordId: number;
  bookshelfId: number;
};

// 감정관련
export type EmotionData = {
  emotionId: number;
  emotionName: string;
  score: number;
};

// 읽는 중 책 기록 수정
export type UpdateFormReading = {
  page: number | null;
  content: string | null;
  emotions: Emotions[];
};
// 다 읽음 책 기록 수정
export type UpdateFormFinished = {
  content: string | null;
  finalNote: string | null;
  emotions: Emotions[];
};

// 추천 도서 목록 응답값
export type RecommendBook = BaseBook & {
  emotionName: string;
};
export type RecommendBooks = RecommendBook[];

// 찜한 도서 목록 응답값
export type WishlistItem = BaseBook;
export type Wishlist = WishlistItem[];

export type BookHeartData = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
};

export type BookHeartStatus = {
  wished: boolean;
};
