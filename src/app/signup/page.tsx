'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/button/page';
import Input from '@/components/input/page';
import { useVerificationTimer } from '@/hooks/signup/useVerificationTimer';
import { useNicknameCheck } from '@/hooks/signup/useNicknameCheck';
import { useEmailCheck } from '@/hooks/signup/useEmailCheck';
import { useMutation, useQuery } from '@tanstack/react-query';
import { emailAvailable, sendVerificationCode } from '@/apis/auth/authApi';
import { useSendVerificationCode } from '@/hooks/signup/useSendVerificationCode';

const schema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: '사용자 이름은 최소 2자 이상이어야 합니다.' })
      .max(10, { message: '사용자 이름은 최대 10자 이하여야 합니다.' }),
    email: z.string().email({ message: '유효한 이메일 주소를 입력하세요.' }),
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

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const { timeLeft, isActive, startTimer, formatTime } = useVerificationTimer(300);
  const [nicknameStatus, setNicknameStatus] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [hasNicknameError, setHasNicknameError] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [showEmailTimer, setShowEmailTimer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    clearErrors,
  } = useForm<FormData>({
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

  const nickname = watch('nickname');
  const email = watch('email');
  const verificationCode = watch('verificationCode');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // 닉네임 중복 확인 훅
  const {
    data: nicknameCheckData,
    isLoading: nicknameLoading,
    refetch: refetchNicknameCheck,
  } = useNicknameCheck(nickname, false);

  // 이메일 중복 확인 훅
  const {
    data: emailCheckData,
    isLoading: emailLoading,
    refetch: refetchEmailCheck,
  } = useEmailCheck(email, false);

  // 이메일 인증코드 발송 mutation
  const sendVerificationMutation = useSendVerificationCode();

  // 중복 확인 결과 반영
  useEffect(() => {
    if (nicknameCheckData) {
      setIsNicknameChecked(true);
      if (!nicknameCheckData.available) {
        setNicknameStatus('중복되는 닉네임입니다');
        setHasNicknameError(true);
      } else {
        setNicknameStatus(null);
        setHasNicknameError(false);
      }
    }
  }, [nicknameCheckData]);

  useEffect(() => {
    if (emailCheckData) {
      setIsEmailChecked(true);
      if (!emailCheckData.available) {
        setEmailStatus('이미 사용 중인 이메일입니다');
        setHasEmailError(true);
      } else {
        setEmailStatus(null);
        setHasEmailError(false);
      }
    }
  }, [emailCheckData]);

  useEffect(() => {
    if (emailStatus === '인증코드가 전송되었습니다' && isActive) {
      setShowEmailTimer(true);
    } else if (!isActive) {
      setShowEmailTimer(false);
    }
  }, [emailStatus, isActive]);

  const handleNicknameDuplication = async () => {
    if (!nickname || errors.nickname) return;
    await refetchNicknameCheck();
  };

  const handleSendVerificationCode = async () => {
    if (!email || errors.email) return;

    try {
      // 1. 이메일 중복 확인
      console.log('Refetching email check...');
      const { data } = await refetchEmailCheck();
      console.log('Email Check Data:', data);

      // 2. 중복 확인 결과 체크
      if (data?.available) {
        console.log('Email is available, sending verification code...');
        // 3. 인증코드 발송
        const result = await sendVerificationMutation.mutateAsync(email);
        console.log('Send Verification Result:', result);
        setEmailStatus('인증코드가 전송되었습니다');
        startTimer(); // 타이머 시작
        console.log('Timer started:', { timeLeft, isActive });
      } else {
        console.log('Email is not available:', data);
        setEmailStatus('이미 사용 중인 이메일입니다');
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      setEmailStatus('인증코드 전송 중 오류 발생');
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('회원가입 데이터:', data);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen font-sans'>
      <h1 className='text-2xl font-semibold mb-6'>회원가입</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 p-4 mx-auto'
      >
        {/* 닉네임 */}
        <div className='flex flex-col w-[610px] gap-2'>
          <label htmlFor='nickname'>닉네임</label>
          <div className='flex items-center justify-between'>
            <Input
              id='nickname'
              type='text'
              placeholder='특수문자 및 공백 제외 2~10자'
              inputSize='md'
              {...register('nickname')}
              hasError={hasNicknameError || !!errors.nickname}
              isSuccess={isNicknameChecked && !!nickname && !errors.nickname && !nicknameStatus}
              showStatusIcon={true}
              onDelete={() => {
                setValue('nickname', '');
                clearErrors('nickname');
                setNicknameStatus(null);
                setIsNicknameChecked(false);
                setHasNicknameError(false);
              }}
            />
            <Button
              type='button'
              size='sm'
              disabled={!nickname || !!errors.nickname || nicknameLoading || !!nicknameStatus}
              onClick={handleNicknameDuplication}
            >
              중복 확인
            </Button>
          </div>
          {errors.nickname && <p className='text-state-error text-sm'>{errors.nickname.message}</p>}
          {nicknameStatus && <p className='text-state-error text-sm'>{nicknameStatus}</p>}
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
              hasError={hasEmailError || !!errors.email}
              isSuccess={
                isEmailChecked &&
                !!email &&
                !errors.email &&
                emailStatus === '인증코드가 전송되었습니다'
              }
              showStatusIcon={true}
              showTimer={showEmailTimer}
              timeLeft={timeLeft}
              isActive={isActive}
              formatTime={formatTime}
              onDelete={() => {
                setValue('email', '');
                clearErrors('email');
                setEmailStatus(null);
                setIsEmailChecked(false);
                setHasEmailError(false);
              }}
            />
            <Button
              type='button'
              size='sm'
              disabled={
                !email ||
                !!errors.email ||
                emailLoading ||
                sendVerificationMutation.isPending ||
                emailStatus === '인증코드가 전송되었습니다'
              }
              onClick={handleSendVerificationCode}
            >
              중복 확인
            </Button>
          </div>
          {errors.email && <p className='text-state-error text-sm'>{errors.email.message}</p>}
          {emailStatus && (
            <p
              className={
                emailStatus === '인증코드가 전송되었습니다'
                  ? 'text-green-500 text-sm'
                  : 'text-state-error text-sm'
              }
            >
              {emailStatus}
            </p>
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
              isSuccess={!!verificationCode && !errors.verificationCode}
              onDelete={() => {
                setValue('verificationCode', '');
                clearErrors('verificationCode');
              }}
            />
            {isActive && (
              <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-[#F03E3E]'>
                {formatTime(timeLeft)}
              </span>
            )}

            <Button
              type='button'
              size='sm'
              disabled={
                !email ||
                !!errors.email ||
                emailLoading ||
                sendVerificationMutation.isPending ||
                emailStatus === '인증코드가 전송되었습니다'
              }
            >
              인증코드 발송
            </Button>
          </div>
          <div className='flex flex-row items-center justify-between w-[400px] gap-2'>
            <p className='text-sm text-state-error'>
              {errors.verificationCode?.message || '\u00A0'}
            </p>
            <p className='text-sm text-gray-700 cursor-pointer underline'>재전송</p>
          </div>
          <div className='flex items-center justify-between gap-2 relative'>
            <Input type='hidden' />
            <Button
              type='button'
              size='sm'
              disabled={!verificationCode || !!errors.verificationCode}
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
            onDelete={() => {
              setValue('password', '');
              clearErrors('password');
            }}
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
            onDelete={() => {
              setValue('confirmPassword', '');
              clearErrors('confirmPassword');
            }}
          />
          {errors.confirmPassword && (
            <p className='text-state-error text-sm'>{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={!isValid}
        >
          가입하기
        </Button>
      </form>
    </div>
  );
}
