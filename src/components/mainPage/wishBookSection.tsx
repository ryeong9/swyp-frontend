import useGetWishlist from '@/hooks/main/useGetWishlist';

import { useRouter } from 'next/navigation';
import DeskSkeleton from '../skeleton/deskSkeleton';
import Swiper from '../swiper/swiper';
import { WishlistItem } from '@/types';

export default function WishBookSection() {
  const router = useRouter();

  const { data: wishlist, isLoading } = useGetWishlist();

  const handleClickBook = (isbn: string) => {
    router.push(`/detail?isbn=${isbn}`);
  };

  if (isLoading) {
    return <DeskSkeleton />;
  }

  return (
    <div className='flex flex-col mb-14'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>
          내가 찜한 책
        </h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            언젠가 읽고 싶은 책들을 여기에 모아뒀어요.
          </p>
        </div>
      </div>
      {wishlist?.length === 0 ? (
        <div className='flex flex-col h-[246px] justify-center items-center'>
          <img
            src='/icons/noEmotionData.svg'
            alt='nodata 아이콘'
            className='w-[101px] mb-6'
          />
          <p className='font-serif font-bold text-gray-700 text-center leading-[25px]'>
            읽고 싶은 책이 있다면 찜을 해주세요.
          </p>
        </div>
      ) : (
        <div className='flex justify-center w-full h-[295px]'>
          <Swiper
            items={wishlist!}
            renderItem={(item: WishlistItem) => (
              <div
                key={item.isbn}
                className='relative flex flex-col justify-end w-[172px] h-[258px] cursor-pointer'
                onClick={() => handleClickBook(item.isbn)}
              >
                <div className='w-[172px] h-[246px]'>
                  <img
                    src={item.coverImageUrl}
                    alt='도서 이미지'
                    className='w-full h-full rounded-lg bg-gray-200'
                  />
                  <div
                    className='absolute flex justify-center w-[46px] h-[65px] top-0 right-4 bg-[#D2DEF4]/80 z-10 rounded-t-[2px]'
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                    }}
                  />
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
