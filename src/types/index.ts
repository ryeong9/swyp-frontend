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

// 감정 제외 상태관리 타입
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
    isbn: string;
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
export type RecordedData = {
  title: string;
  author: string;
  isbn: string;
  coverImageUrl: string;
  publisher: string;
  category: string;
  pubDate: string;
  status: string;
  createdAt: string;
  finishedAt: string | null;
  currentPage: number | null;
  emotionStats: EmotionState[];
}[];

//상세페이지
export type Emotion = {
  id: number;
  name: string;
  scoreSum: number;
  percentage: number;
};

export type BookDetail = {
  isbn: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publishedDate: string;
  description: string;
  publisher: string;
  category: string;
  totalEmotionCount: number;
  emotions: Emotion[];
};

export type BookStatus = {
  status: 'NONE' | 'WISH' | 'READING' | 'FINISHED';
};

export type AddDeskData = {
  bookshelfId: number;
  status: string;
  createdAt: string;
  finishedAt: string | null;
  finalNote: string;
  book: {
    isbn: string;
    title: string;
    author: string;
    coverImageUrl: string;
    publishedDate: string;
    description: string;
    publisher: string;
    category: string;
    totalEmotionCount: number;
  };
};

export const mapAddDeskToBook = (d: AddDeskData): Book => ({
  bookshelfId: d.bookshelfId,
  status: d.status,
  isbn: d.book.isbn,
  title: d.book.title,
  author: d.book.author,
  coverImageUrl: d.book.coverImageUrl,
  publisher: d.book.publisher,
  category: d.book.category,
  publishedDate: d.book.publishedDate,
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

export type RecommendBooks = {
  emotionName: string;
  isbn: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  category: string;
  publishedDate: string;
}[];

export type Wishlist = {
  isbn: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  category: string;
  publishedDate: string;
}[];

export type BookHeartData = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
};

export type BookHeartStatus = {
  wished: boolean;
};
