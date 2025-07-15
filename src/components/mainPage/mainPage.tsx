import FixedFooter from './fixedFooter';
import Header from './header';
import HeroSection from './heroSection';

export default function MainPage() {
  return (
    <div className='pb-[177px]'>
      <div className='w-[1030px] flex flex-col mx-auto'>
        <Header />
        <HeroSection />
      </div>
      <div className='w-full h-[323px] bg-[#383838]'></div>
      <FixedFooter />
    </div>
  );
}
