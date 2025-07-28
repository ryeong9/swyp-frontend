import Header from '@/components/header/header';
import Calendar from '@/components/reportPage/calendar';

export default function ReportPage() {
  return (
    <div className='w-[1030px] flex flex-col mx-auto'>
      <Header />
      <Calendar />
    </div>
  );
}
