'use client';

import { useState } from 'react';

export function useSwiper(
  totalItems: number,
  options?: { itemsPerView?: number; groupSize?: number },
) {
  const { itemsPerView = 5, groupSize } = options || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const pageCount = groupSize
    ? Math.ceil(totalItems / groupSize)
    : Math.ceil(totalItems / itemsPerView);

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, pageCount - 1));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return {
    currentIndex,
    setCurrentIndex,
    pageCount,
    next,
    prev,
  };
}
