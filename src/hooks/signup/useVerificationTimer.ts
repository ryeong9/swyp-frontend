import { useState, useEffect, useCallback, useRef } from 'react';

export function useVerificationTimer(duration: number = 300) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer(); // 기존 타이머 제거
    setTimeLeft(duration);
    setIsActive(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [duration]);

  const stopTimer = useCallback(() => {
    clearTimer();
    setIsActive(false);
    setTimeLeft(0);
  }, []);

  useEffect(() => {
    return () => {
      clearTimer(); // 컴포넌트 언마운트 시 정리
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    formatTime,
  };
}
