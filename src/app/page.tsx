import EntryAuthModal from '@/components/mainPage/entryAuthModal';
import MainPage from '@/components/mainPage/mainPage';

export default function Home() {
  const isLogin = true;
  return (
    <>
      <MainPage />
      {!isLogin && <EntryAuthModal />}
    </>
  );
}
