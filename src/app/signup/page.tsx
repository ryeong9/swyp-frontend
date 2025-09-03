'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/button/page';
import Input from '@/components/input/page';

import { useVerificationTimer } from '@/hooks/signup/useVerificationTimer';
import {
  useCheckVerificationCode,
  useEmailCheck,
  useNicknameCheck,
  useSendVerificationCode,
  useSignup,
} from '@/hooks/signup/useAuth';

const schema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: '사용자 이름은 최소 2자 이상이어야 합니다.' })
      .max(10, { message: '사용자 이름은 최대 10자 이하여야 합니다.' }),
    email: z.string().email({ message: '이메일 형식을 다시 확인해주세요.' }),
    password: z
      .string()
      .min(8, { message: '8자 이상 입력해주세요.' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: '대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
      }),
    verificationCode: z
      .string()
      .min(1, { message: '인증코드를 다시 입력해주세요.' })
      .regex(/^\d+$/, { message: '숫자만 입력해주세요.' }),
    confirmPassword: z.string().min(8, { message: '비밀번호를 다시 확인해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

// 상태 통합을 위한 타입 정의
interface ValidationState {
  nickname: {
    isChecked: boolean;
    hasError: boolean;
    message: string | null;
  };
  email: {
    isChecked: boolean;
    hasError: boolean;
    message: string | null;
  };
  verification: {
    isVerified: boolean;
    message: string | null;
  };
}

const initialValidationState: ValidationState = {
  nickname: { isChecked: false, hasError: false, message: null },
  email: { isChecked: false, hasError: false, message: null },
  verification: { isVerified: false, message: null },
};

export default function SignUpPage() {
  const router = useRouter();
  const { timeLeft, isActive, startTimer, stopTimer, formatTime } = useVerificationTimer(300);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [validationState, setValidationState] = useState<ValidationState>(initialValidationState);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      verificationCode: '',
      confirmPassword: '',
    },
  });

  // 필요한 필드만 watch (성능 최적화)
  const nickname = watch('nickname');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const verificationCode = watch('verificationCode');

  // react-query hooks
  const { refetch: refetchNicknameCheck } = useNicknameCheck(nickname, false);
  const { refetch: refetchEmailCheck } = useEmailCheck(email, false);
  const sendVerificationMutation = useSendVerificationCode();
  const checkVerificationMutation = useCheckVerificationCode();
  const signupMutation = useSignup();

  // 디바운싱을 위한 타이머 상태
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // 상태 업데이트 헬퍼 함수들 (메모화)
  const updateNicknameValidation = useCallback((updates: Partial<ValidationState['nickname']>) => {
    setValidationState((prev) => ({
      ...prev,
      nickname: { ...prev.nickname, ...updates },
    }));
  }, []);

  const updateEmailValidation = useCallback((updates: Partial<ValidationState['email']>) => {
    setValidationState((prev) => ({
      ...prev,
      email: { ...prev.email, ...updates },
    }));
  }, []);

  const updateVerificationState = useCallback(
    (updates: Partial<ValidationState['verification']>) => {
      setValidationState((prev) => ({
        ...prev,
        verification: { ...prev.verification, ...updates },
      }));
    },
    [],
  );

  /**닉네임 중복 확인 (디바운싱 적용) */
  const handleNicknameDuplication = useCallback(async () => {
    if (!nickname || errors.nickname) return;

    // 기존 타이머 취소
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // 500ms 후에 API 호출
    const timer = setTimeout(async () => {
      try {
        const { data } = await refetchNicknameCheck();
        if (!data) return;

        const available = data.available;
        updateNicknameValidation({
          isChecked: true,
          hasError: !available,
          message: available ? null : '중복되는 닉네임입니다',
        });
      } catch (error) {
        console.error('닉네임 중복 확인 실패:', error);
        updateNicknameValidation({
          hasError: true,
          message: '중복 확인 중 오류 발생',
        });
      }
    }, 500);

    setDebounceTimer(timer);
  }, [nickname, errors.nickname, refetchNicknameCheck, debounceTimer, updateNicknameValidation]);

  /**이메일 중복 확인 (메모화) */
  const handleEmailDuplication = useCallback(async () => {
    if (!email || errors.email) return;

    try {
      const { data } = await refetchEmailCheck();
      if (!data) return;

      const available = data.available;
      updateEmailValidation({
        isChecked: true,
        hasError: !available,
        message: available ? null : '이미 사용 중인 이메일입니다',
      });
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      updateEmailValidation({
        hasError: true,
        message: '이메일 확인 중 오류 발생',
      });
    }
  }, [email, errors.email, refetchEmailCheck, updateEmailValidation]);

  /**이메일 인증코드 발송 (메모화) */
  const handleSendVerificationCode = useCallback(async () => {
    if (
      !email ||
      errors.email ||
      !validationState.email.isChecked ||
      validationState.email.hasError
    )
      return;

    try {
      const result = await sendVerificationMutation.mutateAsync(email);
      updateVerificationState({
        isVerified: false,
        message: null,
      });
      startTimer();
    } catch (error) {
      console.error('Send Verification Error:', error);
      updateVerificationState({
        message: '인증코드 전송 중 오류 발생',
      });
    }
  }, [
    email,
    errors.email,
    validationState.email,
    sendVerificationMutation,
    startTimer,
    updateVerificationState,
  ]);

  //인증코드 확인 (메모화)
  const handleCheckVerificationCode = useCallback(async () => {
    if (!email || !verificationCode || errors.verificationCode) return;

    try {
      const status = await checkVerificationMutation.mutateAsync({
        email,
        authCode: verificationCode,
      });

      if (status === 200) {
        updateVerificationState({
          isVerified: true,
          message: null,
        });
        stopTimer();
      } else {
        updateVerificationState({
          message: '인증코드를 다시 확인해주세요',
        });
      }
    } catch (error) {
      console.error('Check Verification Error:', error);
      updateVerificationState({
        message: '인증코드 확인 중 오류 발생',
      });
    }
  }, [
    email,
    verificationCode,
    errors.verificationCode,
    checkVerificationMutation,
    stopTimer,
    updateVerificationState,
  ]);

  /**폼 제출 (메모화) */
  const onSubmit = useCallback(
    async (data: any) => {
      const { email, password, nickname } = data;
      try {
        await signupMutation.mutateAsync({ email, password, nickname });

        router.push('/login');
      } catch (error) {
        setShowErrorModal(true);
      }
    },
    [signupMutation, router],
  );

  // 정리 함수 - 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return (
    <div className='flex flex-col items-center justify-center h-screen font-sans'>
      <h1 className='text-2xl font-semibold mb-6'>회원가입</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 p-4 mx-auto'
      >
        {/* 닉네임 */}
        <div className='w-[610px] flex flex-col gap-2'>
          <label htmlFor='nickname'>닉네임</label>
          <div className='flex items-center justify-between'>
            <Input
              id='nickname'
              type='text'
              placeholder='특수문자 및 공백 제외 2~10자'
              inputSize='md'
              {...register('nickname')}
              hasError={validationState.nickname.hasError || !!errors.nickname}
              isSuccess={
                validationState.nickname.isChecked &&
                !!nickname &&
                !errors.nickname &&
                !validationState.nickname.message
              }
              showStatusIcon
              onDelete={() => {
                setValue('nickname', '');
                clearErrors('nickname');
                updateNicknameValidation({ isChecked: false, hasError: false, message: null });
              }}
            />
            <Button
              type='button'
              size='sm'
              disabled={!nickname || !!errors.nickname}
              onClick={handleNicknameDuplication}
              className='cursor-pointer'
            >
              중복 확인
            </Button>
          </div>
          {errors.nickname && <p className='text-state-error text-sm'>{errors.nickname.message}</p>}
          {validationState.nickname.message && (
            <p className='text-state-error text-sm'>{validationState.nickname.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>이메일 주소</label>
          <div className='flex items-center justify-between'>
            <Input
              id='email'
              type='email'
              placeholder='이메일 주소를 입력해주세요'
              inputSize='md'
              autoComplete='email'
              autoFocus
              {...register('email')}
              hasError={validationState.email.hasError || !!errors.email}
              isSuccess={
                validationState.email.isChecked &&
                !!email &&
                !errors.email &&
                !validationState.email.message &&
                !validationState.email.hasError
              }
              showStatusIcon
              onDelete={() => {
                setValue('email', '');
                clearErrors('email');
                updateEmailValidation({ isChecked: false, hasError: false, message: null });
              }}
            />
            <Button
              type='button'
              size='sm'
              disabled={!email || !!errors.email}
              onClick={handleEmailDuplication}
              className='cursor-pointer'
            >
              중복 확인
            </Button>
          </div>
          {errors.email && <p className='text-state-error text-sm'>{errors.email.message}</p>}
          {validationState.email.message && (
            <p className='text-state-error text-sm'>{validationState.email.message}</p>
          )}

          {/* 인증코드 */}
          <div className='flex items-center justify-between gap-2 relative'>
            <Input
              id='verificationCode'
              type='text'
              placeholder='인증코드를 입력해주세요.'
              inputSize='md'
              {...register('verificationCode')}
              hasError={!!errors.verificationCode}
              isSuccess={validationState.verification.isVerified}
              showStatusIcon
              showTimer
              isActive={isActive && !validationState.verification.isVerified}
              timeLeft={timeLeft}
              formatTime={formatTime}
              onDelete={() => {
                setValue('verificationCode', '');
                clearErrors('verificationCode');
                updateVerificationState({ isVerified: false, message: null });
              }}
            />
            <Button
              type='button'
              size='sm'
              disabled={
                !validationState.email.isChecked ||
                validationState.email.hasError ||
                validationState.verification.isVerified
              }
              onClick={handleSendVerificationCode}
              className='cursor-pointer'
            >
              인증코드 발송
            </Button>
          </div>
          <div className='flex justify-between w-[400px]'>
            <p className='text-sm text-state-error'>
              {errors.verificationCode?.message || validationState.verification.message || '\u00A0'}
            </p>

            <p
              className='text-sm text-gray-700 cursor-pointer underline'
              onClick={handleSendVerificationCode}
            >
              재전송
            </p>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <Input type='hidden' />
            <Button
              type='button'
              size='sm'
              disabled={!verificationCode || !!errors.verificationCode}
              onClick={handleCheckVerificationCode}
              className='cursor-pointer'
            >
              확인
            </Button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>비밀번호</label>
          <Input
            id='password'
            type='password'
            placeholder='영문(대소문자) + 숫자 포함 8자 이상'
            inputSize='lg'
            {...register('password')}
            hasError={!!errors.password}
            isSuccess={!!password && !errors.password}
          />
          {errors.password && <p className='text-state-error text-sm'>{errors.password.message}</p>}

          <Input
            id='confirmPassword'
            type='password'
            placeholder='비밀번호를 다시 한 번 적어주세요.'
            inputSize='lg'
            {...register('confirmPassword')}
            hasError={!!errors.confirmPassword}
            isSuccess={!!confirmPassword && !errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className='text-state-error text-sm'>{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={!isValid}
          className='cursor-pointer'
        >
          가입하기
        </Button>
      </form>
    </div>
  );
}
