import './mainSwiper.css';
import DeskSkeleton from '../skeleton/deskSkeleton';
import { useRouter } from 'next/navigation';
import useGetOnlyDeskData from '@/hooks/write/useGetOnlyDeskData';
import { Book } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export default function DeskSection() {
  const router = useRouter();
  const { data: deskData, isLoading } = useGetOnlyDeskData();

  if (isLoading) return <DeskSkeleton />;

  const isEmpty = deskData?.length === 0;

  const handleClickGotoRead = (item: Book) => {
    const encodedBook = encodeURIComponent(JSON.stringify(item));
    router.push(`/read?book=${encodedBook}`);
  };

  return (
    <div className='flex flex-col'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책상</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금 읽고 있는 책과 추천 책을 책상 위에 올려놔 보았어요
          </p>
        </div>
      </div>
      <div className='relative px-5 w-full h-[280px]'>
        {isEmpty ? (
          <div className='flex flex-col h-[246px] justify-center items-center'>
            <img
              src='/icons/noEmotionData.svg'
              alt='nodata 아이콘'
              className='w-[101px] mb-6'
            />
            <p className='font-serif font-bold text-gray-700 text-center leading-[25px]'>
              어떤 책을 읽고 계신가요?
              <br />
              검색을 통해 읽고 있는 책을 책상 위에 올려주세요.
            </p>
          </div>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={5}
              spaceBetween={24}
              pagination={(deskData?.length ?? 0) > 1 ? { clickable: true } : false}
              navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
              }}
              className='max-w-[956px] h-[280px]'
            >
              {deskData?.map((item) => {
                return (
                  <SwiperSlide key={item.isbn}>
                    <div
                      className='relative w-[172px] h-[246px] cursor-pointer'
                      onClick={() => handleClickGotoRead(item)}
                    >
                      <img
                        src={item.coverImageUrl}
                        alt='도서 이미지'
                        className='w-full h-full rounded-lg'
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className='custom-prev absolute left-2 top-[40%] cursor-pointer'>
              <img
                src='/icons/arrowLeft.svg'
                alt='왼쪽 화살표'
              />
            </div>
            <div className='custom-next absolute right-2 top-[40%] cursor-pointer'>
              <img
                src='/icons/arrowLeft.svg'
                alt='오른쪽 화살표'
                className='rotate-180'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
