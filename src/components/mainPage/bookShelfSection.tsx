import { useRouter } from 'next/navigation';
import useGetBookshelfData from '@/hooks/main/useGetBookshelfData';
import BookshelfSkeleton from '../skeleton/bookshelfSkeleton';
import { Book } from '@/types';
import Swiper from '../swiper/swiper';

export default function BookShelfSection() {
  const router = useRouter();
  const { data: bookshelfData, isLoading } = useGetBookshelfData();

  if (isLoading) return <BookshelfSkeleton />;

  const handleClickGotoRead = (item: Book) => {
    const encodedBook = encodeURIComponent(JSON.stringify(item));
    router.push(`/read?book=${encodedBook}`);
  };

  return (
    <div className='w-[1030px] flex flex-col my-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책장</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금까지 읽었던 책들이 책장에 꽂혀 있어요.
          </p>
        </div>
      </div>
      {bookshelfData?.length === 0 ? (
        <div className='flex flex-col h-[246px] justify-center items-center'>
          <img
            src='/icons/noEmotionData.svg'
            alt='nodata 아이콘'
            className='w-[101px] mb-6'
          />
          <p className='font-serif font-bold text-gray-700 text-center leading-[25px]'>
            최근에 어떤 책을 재미있게 읽었나요?
            <br />
            검색을 통해 읽었던 책을 책장에 꽂아주세요.
          </p>
        </div>
      ) : (
        <div className='w-full h-[336px] bg-background-input rounded-2xl pt-[45px]'>
          <div className='flex justify-center w-full h-[280px]'>
            <Swiper
              items={bookshelfData!}
              renderItem={(item: Book) => (
                <div
                  key={item.isbn}
                  className='flex-shrink-0 w-[172px] h-[246px] cursor-pointer'
                  onClick={() => handleClickGotoRead(item)}
                >
                  <img
                    src={item.coverImageUrl}
                    alt='도서 이미지'
                    className='w-full h-full rounded-lg'
                  />
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
