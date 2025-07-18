import BookReport from './bookReport';
import BookShelfSection from './bookShelfSection';
import DeskSection from './deskSection';
import Header from '../header/header';
import HeroSection from './heroSection';

export default function MainPage() {
  return (
    <div>
      <div className='w-[1030px] flex flex-col mx-auto'>
        <Header />
        <HeroSection />
        <DeskSection />
        <BookShelfSection />
        <BookReport />
      </div>
      <div className='w-full h-[323px] bg-[#383838]'></div>
    </div>
  );
}
