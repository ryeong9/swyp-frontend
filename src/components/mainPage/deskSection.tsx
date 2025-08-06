import useGetDeskData from '@/hooks/main/useGetDeskDataWithRec';
import DeskSkeleton from '../skeleton/deskSkeleton';
import { useRouter } from 'next/navigation';
import { DeskBookItem } from '@/types';

export default function DeskSection() {
  const router = useRouter();
  const { data: deskData, isLoading } = useGetDeskData();

  if (isLoading) return <DeskSkeleton />;

  const mergedBooks: DeskBookItem[] = deskData
    ? [
        ...deskData.recommendedBooks.map((book) => ({
          type: 'recommend' as const,
          book,
        })),
        ...deskData.readingBooks.map((book) => ({
          type: 'reading' as const,
          book,
        })),
      ]
    : [];

  const handleClickCoverImg = (item: DeskBookItem) => {
    if (item.type === 'reading') {
      const encodedBook = encodeURIComponent(JSON.stringify(item.book));
      router.push(`/write?book=${encodedBook}`);
    }
  };

  const isEmpty = mergedBooks.length === 0;

  return (
    <div className='flex flex-col'>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>책상</h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            지금 읽고 있는 책과 추천 책을 책상 위에 올려놔 보았어요
          </p>
          <button
            type='button'
            className='flex cursor-pointer'
          >
            <p className='font-sans text-xs text-gray-500 mr-2'>더 보기</p>
            <img
              src='/icons/arrowRight.svg'
              alt='오른쪽 화살표'
            />
          </button>
        </div>
      </div>
      <div>
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
          <div className='grid grid-cols-5 grid-rows-1 gap-x-[22.5px] px-10'>
            {mergedBooks.map((item) => {
              return (
                <div
                  key={item.book.isbn}
                  className='relative w-[172px] h-[246px] cursor-pointer'
                  onClick={() => handleClickCoverImg(item)}
                >
                  <img
                    src={item.book.coverImageUrl}
                    alt='도서 이미지'
                    className='w-full h-full rounded-lg'
                  />
                  {item.type === 'recommend' ? (
                    <div
                      className='absolute flex justify-center w-[50px] h-[80px] top-[-10px] right-[10px] bg-[#D2DEF4]/80 z-10 rounded-t-[2px]'
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
