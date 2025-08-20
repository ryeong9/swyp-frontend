'use client';

import useGetRecordInfo from '@/hooks/update/useGetRecordInfo';
import { EmotionData, Emotions, IdState, RecordDataState } from '@/types';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

function UpdatePageContent({
  setFormData,
  setId,
}: {
  setFormData: React.Dispatch<React.SetStateAction<RecordDataState>>;
  setId: React.Dispatch<React.SetStateAction<IdState>>;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const recordId = searchParams.get('recordId');
    const bookshelfId = searchParams.get('bookshelfId');
    const status = searchParams.get('status');
    const isbn = searchParams.get('isbn');
    if (recordId && status && isbn) {
      setId({ recordId: Number(recordId), bookshelfId: Number(bookshelfId) });
      setFormData((prev) => ({ ...prev, isbn: isbn, status: status }));
    }
  }, [searchParams, setFormData, setId]);

  return null;
}

export default function UpdatePage() {
  const [id, setId] = useState<IdState>({
    recordId: 0,
    bookshelfId: 0,
  });

  const [formData, setFormData] = useState<RecordDataState>({
    isbn: '',
    status: '',
    page: undefined,
    content: '',
    finalNote: '',
  });
  const [emotionData, setEmotionData] = useState<Emotions[]>([]);

  const { data: recordInfo } = useGetRecordInfo(formData.status, id.recordId, id.bookshelfId);

  useEffect(() => {
    if (recordInfo) {
      setFormData((prev) => ({
        ...prev,
        page: recordInfo.page,
        content: recordInfo.content,
        finalNote: recordInfo.finalNote,
      }));
      setEmotionData(
        recordInfo.emotions.map((e: EmotionData) => ({
          emotionId: e.emotionId,
          score: e.score,
        })),
      );
    }
  }, [recordInfo]);

  return (
    <>
      <Suspense fallback={null}>
        <UpdatePageContent
          setFormData={setFormData}
          setId={setId}
        />
      </Suspense>
    </>
  );
}
