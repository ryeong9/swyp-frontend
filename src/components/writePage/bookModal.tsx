interface BookModalProps {
  setSelectedBook: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// 임의의 타입 지정이라 지울 예정
type deskData = {
  bookId: number;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  publisher: string;
  publishedDate: string;
}[];

// 목데이터
const data: deskData = [
  {
    bookId: 1,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 2,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 3,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 4,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 5,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 6,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },

  {
    bookId: 7,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 8,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 9,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 10,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
  {
    bookId: 11,
    title: '데미안',
    author: '헤르만 헤세',
    coverImage: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_2.jpg',
    genre: '국내도서>소설/시/희곡>독일소설',
    publisher: '민음사',
    publishedDate: '2000-12-19',
  },
];

export default function BookModal({ setSelectedBook, setShowSelectModal }: BookModalProps) {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-20'>
      <div className='w-[763px] h-[740px] bg-background-input rounded-2xl'>
        <div className='relative pt-[58px] px-[56px] pb-2 bg-background-input drop-shadow-sm rounded-t-2xl'>
          <button
            type='button'
            className='absolute top-[24px] right-[24px] cursor-pointer'
            onClick={() => setShowSelectModal((prev) => !prev)}
          >
            <img
              src='/icons/closeIcon.svg'
              alt='닫기 아이콘'
            />
          </button>
          <h2 className='font-sans font-semibold text-2xl text-gray-900 leading-[30px] mb-2'>
            책 선택
          </h2>
          <p className='font-sans text-base text-gray-500 leading-[25px]'>
            책상과 책바구니에 있는 책들 중에 기록할 책을 선택해주세요.
          </p>
        </div>
        <div className='h-[503px] overflow-y-scroll'>
          <div className='grid grid-cols-5 gap-x-[24px] gap-y-[24px] py-8 px-[56px] bg-background-input'>
            {data.map((item) => (
              <div
                key={item.bookId}
                className='cursor-pointer'
              >
                <img
                  src={item.coverImage}
                  alt='표지 사진'
                  className='w-[111px] h-[160px] mb-2'
                />
                <p className='font-sans font-medium text-base text-gray-900 mb-1'>{item.title}</p>
                <p className='font-sans font-medium text-sm text-gray-700'>{item.author}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center'>
          <button className='w-[300px] h-[50px] font-sans font-medium text-base text-background-input rounded-lg bg-primary mt-5 cursor-pointer'>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
