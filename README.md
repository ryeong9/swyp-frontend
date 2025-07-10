## 📚 INDEX

- Next.js 기반의 프론트엔드 프로젝트

### ⚒️ 기술스택

- Framework: **Next.js (App Router)**
- Styling: **TailwindCSS**
- State Management: **Zustand**
- Data Fetching: **Tanstack Query (react-query)**
- HTTP Client: **Axios**

### 📦 개발 환경 세팅

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 파일 생성 (.env.local)
# 루트에 .env.local 생성 후 다음과 같이 작성:
NEXT_PUBLIC_API_URL=백엔드서버주소

# 3. Gitmoji CLI 설치 (처음 1회만)
npm install -g gitmoji-cli
gitmoji -i

# 4. 개발 서버 실행
npm run dev
```

### 🚀 브랜치 전략

- 작업 전 항상 main에서 새로운 브랜치를 생성

```bash
git checkout main
git pull origin main
git checkout -b feature/login (예시)
```

- 브랜치는 병합 후 삭제
- 다음 작업은 다시 main에서 새 브랜치 생성

### Fonts

Pretendard is licensed under the SIL Open Font License 1.1.  
https://github.com/orioncactus/pretendard
