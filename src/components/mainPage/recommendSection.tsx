import { emotions } from '@/constants/emotion';
import useGetRecommendBooks from '@/hooks/main/useGetRecommendBooks';
import { useRouter } from 'next/navigation';

export default function RecommendSection() {
  const router = useRouter();
  const { data: recommendBooks, isLoading } = useGetRecommendBooks();

  const bgColorMap: Record<string, string> = {
    positive: 'bg-[#E6F2E6]',
    negative: 'bg-[#B3CAFB]',
    neutrality: 'bg-[#EEF2FA]',
    thought: 'bg-[#9BC99F]',
  };

  // 을/를 조사 구분
  const getPostposition = (word: string) => {
    const lastChar = word.charCodeAt(word.length - 1); // 마지막 글자 유니코드
    const hasFinalConsonant = (lastChar - 0xac00) % 28 !== 0; // 받침 있는지 체크
    return hasFinalConsonant ? '을' : '를';
  };

  const handleClickBook = (isbn: string) => {
    router.push(`/detail?isbn=${isbn}`);
  };

  return (
    <>
      <div className='mb-8'>
        <h1 className='font-sans font-semibold text-2xl leading-[30px] mb-2 text-gray-900'>
          나의 감정과 어울리는 책
        </h1>
        <div className='flex items-center justify-between'>
          <p className='font-sans leading-[25px] tracking-wide text-gray-700'>
            가장 크게 느낀 감정을 바탕으로 추천했어요.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-3 grid-rows-1 gap-x-[35px] mb-40'>
        {recommendBooks?.map((item) => {
          const emotion = emotions.find((emo) => emo.name === item.emotionName);
          const postposition = getPostposition(item.emotionName);
          return (
            <div
              key={item.isbn}
              className={`relative w-[320px] h-[410px] flex flex-col items-center p-8 rounded-2xl overflow-hidden`}
              onClick={() => handleClickBook(item.isbn)}
            >
              <div className={`absolute inset-0 ${emotion ? bgColorMap[emotion.type] : ''}`} />
              {emotion?.type === 'negative' && <div className='absolute inset-0 bg-black/20' />}
              <div className='relative z-10 w-full flex flex-col items-center'>
                <div className='w-full flex justify-between mb-8'>
                  <div className='flex flex-col font-sans font-normal'>
                    <p className='text-base text-gray-900'>
                      {item.emotionName}
                      {postposition}
                      <br /> 바탕으로 추천해드려요.
                    </p>
                    <p className='text-sm text-gray-700'>{item.title}</p>
                  </div>
                  <img
                    src={emotion?.icon}
                    alt='감정 아이콘'
                    className='w-[60px] h-[60px]'
                  />
                </div>
                <img
                  src={item.coverImageUrl}
                  alt='도서 표지'
                  className='w-[172px] h-[246px]'
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
