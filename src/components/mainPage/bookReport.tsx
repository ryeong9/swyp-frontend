import { emotions } from '@/constants/emotion';
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import '../../lib/chart';
import { TooltipItem, ScriptableScaleContext, ChartOptions } from 'chart.js';
import useGetRankingData from '@/hooks/main/useGetRankingData';
import useGetGraphData from '@/hooks/main/useGetGraphData';
import ReportSkeleton from '../skeleton/reportSkeleton';

export default function BookReport() {
  const router = useRouter();
  const handleClickMoreBtn = () => {
    router.push('/report');
  };

  const { data: emotionRanking, isLoading } = useGetRankingData();
  const { data: graphData, isLoading: loading } = useGetGraphData();

  const isReportLoading = isLoading || loading;
  if (isReportLoading) return <ReportSkeleton />;

  // 감정 랭킹 감정 아이콘 매칭하여 데이터에 추가
  const mappedEmotions = emotionRanking?.map((item) => {
    const emotionInfo = emotions.find((e) => e.id === item.emotionId);

    return {
      ...item,
      icon: emotionInfo?.icon || '',
    };
  });

  // 막대 그래프 관련 코드
  const labels = graphData?.map((item) => `${item.month}월`) ?? [];
  const chartDataArray = graphData?.map((item) => item.readingDays) ?? [];

  const maxValue = Math.max(...chartDataArray);
  const maxIndex = chartDataArray.indexOf(maxValue);
  const maxMonthLabel = labels[maxIndex];

  const barData = {
    labels,
    datasets: [
      {
        data: chartDataArray,
        backgroundColor: ['#CDE5CD', '#E6F2E6', '#9BC99F', '#9BC99F', '#E6F2E6', '#CDE5CD'],
        hoverBackgroundColor: ['#CDE5CD', '#E6F2E6', '#9BC99F', '#9BC99F', '#E6F2E6', '#CDE5CD'],
        borderRadius: 8,
        barPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'bar'>) => {
            return `${ctx.raw}일`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: (context: ScriptableScaleContext) => {
            const index = context.index!;
            return index === maxIndex ? '#000000' : '#666666';
          },
        },
      },
      y: { display: false },
    },
  };

  return (
    <div className='flex flex-col mb-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>
          독서 리포트
        </h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금까지의 기록들을 바탕으로 리포트를 작성해보았어요
          </p>
          <button
            type='button'
            className='flex cursor-pointer'
            onClick={handleClickMoreBtn}
          >
            <p className='font-sans text-xs text-gray-500 mr-2'>더 보기</p>
            <img
              src='/icons/arrowRight.svg'
              alt='오른쪽 화살표'
            />
          </button>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <section className='box-border flex flex-col w-[499px] h-[302px] py-8 px-12 bg-background-input rounded-3xl mr-8'>
          <h2 className='font-sans font-medium text-base text-gray-900 mb-6'>감정 랭킹</h2>
          <div className='grid grid-cols-3 grid-rows-1 gap-x-[27.5px]'>
            {mappedEmotions?.map((item, index) => (
              <div
                key={index}
                className='relative flex flex-col justify-center items-center w-[116px] h-[139px] px-8 py-6 bg-gray-100 rounded-lg'
              >
                <p className='absolute top-[13px] left-[13px] font-sans text-xs text-gray-700'>
                  {index + 1}
                </p>
                <img
                  src={item.icon}
                  alt='감정 이모지'
                  className='w-[44px] h-[44px] mb-2'
                />
                <p className='font-sans font-medium text-sm text-gray-900 mb-2'>
                  {item.emotionName}
                </p>
                <p className='font-sans text-xs text-gray-700'>{item.score}점</p>
              </div>
            ))}
          </div>
          <p className='font-sans text-base text-gray-700 text-center mt-8'>
            가장 많이 기록한 감정은{' '}
            <span className='font-sans font-medium text-primary-dark'>
              {mappedEmotions?.[0]?.emotionName}
            </span>
            이에요.
          </p>
        </section>
        <section className='w-[499px] h-[302px] py-8 px-12 bg-background-input rounded-3xl'>
          <h2 className='font-sans font-medium text-base text-gray-900 mb-6'>월별 독서 그래프</h2>
          <div className='flex-1'>
            <Bar
              data={barData}
              options={options}
            />
          </div>
          <p className='font-sans text-base text-gray-700 text-center mt-[25px]'>
            가장 많이 기록한 달은{' '}
            <span className='font-sans font-medium text-primary-dark'>{maxMonthLabel}</span>
            이에요.
          </p>
        </section>
      </div>
    </div>
  );
}
