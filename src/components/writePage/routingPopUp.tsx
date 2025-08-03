interface RoutingPopUpProps {
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RoutingPopUp({ setShowSuccessModal }: RoutingPopUpProps) {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
      <div className='w-[413px] h-[288px] flex flex-col items-center justify-center bg-background-input rounded-2xl px-14 py-12'>
        <h2 className='font-sans font-semibold text-xl text-gray-900 mb-4'>기록 등록 완료!</h2>
        <p className='font-sans font-medium text-sm text-gray-700 leading-[20px] mb-6'>
          다른 페이지로 이동하시겠어요?
        </p>
        <button className='w-[300px] h-[50px] bg-primary rounded-lg font-sans font-medium text-base text-background-input mb-2'>
          다른 책 기록하기
        </button>
        <button className='w-[300px] h-[50px] bg-gray-200 rounded-lg font-sans font-medium text-base text-gray-700'>
          랜딩 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
