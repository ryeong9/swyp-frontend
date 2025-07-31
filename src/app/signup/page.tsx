'use client';

import React, { useState } from 'react';
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
import { SignupErrorModal } from '@/components/modal/signup/page';

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

export default function SignUpPage() {
  const router = useRouter();
  const { timeLeft, isActive, startTimer, stopTimer, formatTime } = useVerificationTimer(300);
  const [showErrorModal, setShowErrorModal] = useState(true);
  const [nicknameStatus, setNicknameStatus] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [hasNicknameError, setHasNicknameError] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [isCheckVerification, setIsCheckVerification] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
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

  const nickname = watch('nickname');
  const email = watch('email');
  const verificationCode = watch('verificationCode');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // react-query hooks
  const { refetch: refetchNicknameCheck } = useNicknameCheck(nickname, false);
  const { refetch: refetchEmailCheck } = useEmailCheck(email, false);
  const sendVerificationMutation = useSendVerificationCode();
  const checkVerificationMutation = useCheckVerificationCode();
  const signupMutation = useSignup();
  /** 🔹 닉네임 중복 확인 */
  const handleNicknameDuplication = async () => {
    if (!nickname || errors.nickname) return;
    try {
      const { data } = await refetchNicknameCheck();
      if (!data) return;

      const available = data.available;
      setIsNicknameChecked(true);
      setHasNicknameError(!available);
      setNicknameStatus(available ? null : '중복되는 닉네임입니다');
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      setHasNicknameError(true);
      setNicknameStatus('중복 확인 중 오류 발생');
    }
  };

  /** 🔹 이메일 중복 확인 */
  const handleEmailDuplication = async () => {
    if (!email || errors.email) return;

    try {
      const { data } = await refetchEmailCheck();
      if (!data) return;

      const available = data.available;
      setIsEmailChecked(true);
      setHasEmailError(!available);
      setEmailStatus(available ? null : '이미 사용 중인 이메일입니다');
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      setHasEmailError(true);
      setEmailStatus('이메일 확인 중 오류 발생');
    }
  };

  /** 🔹 이메일 인증코드 발송 */
  const handleSendVerificationCode = async () => {
    if (!email || errors.email || !isEmailChecked || hasEmailError) return;

    try {
      const result = await sendVerificationMutation.mutateAsync(email);
      console.log('Send Verification Result:', result);
      setVerificationStatus('인증코드가 전송되었습니다');
      startTimer();
    } catch (error) {
      console.error('Send Verification Error:', error);
      setVerificationStatus('인증코드 전송 중 오류 발생');
    }
  };
  //인증코드 확인
  const handleCheckVerificationCode = async () => {
    if (!email || !verificationCode || errors.verificationCode) return;

    try {
      const status = await checkVerificationMutation.mutateAsync({
        email,
        authCode: verificationCode,
      });

      if (status === 200) {
        setVerificationStatus(null);
        setIsCheckVerification(true);
        stopTimer();
        console.log('인증이 완료되었습니다.');
      } else {
        setVerificationStatus('인증코드를 다시 확인해주세요');
      }
    } catch (error) {
      console.error('Check Verification Error:', error);
      setVerificationStatus('인증코드 확인 중 오류 발생');
    }
  };

  /** 🔹 폼 제출 */
  const onSubmit = async (data: any) => {
    const { email, password, nickname } = data;
    try {
      const result = await signupMutation.mutateAsync({ email, password, nickname });
      console.log('회원가입 성공: ', result);
      router.push('/');
    } catch (error) {
      console.log('회원가입 실패: ', error);
      setShowErrorModal(true);
    }
  };

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
              hasError={hasNicknameError || !!errors.nickname}
              isSuccess={isNicknameChecked && !!nickname && !errors.nickname && !nicknameStatus}
              showStatusIcon
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
              disabled={!nickname || !!errors.nickname}
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
                isEmailChecked && !!email && !errors.email && !emailStatus && !hasEmailError
              }
              showStatusIcon
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
              disabled={!email || !!errors.email}
              onClick={handleEmailDuplication}
            >
              중복 확인
            </Button>
          </div>
          {errors.email && <p className='text-state-error text-sm'>{errors.email.message}</p>}
          {emailStatus && <p className='text-state-error text-sm'>{emailStatus}</p>}

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
              <span className='absolute inset-x-80 top-1/2 transform -translate-y-1/2 flex gap-2 items-center text-sm font-medium text-state-error '>
                {formatTime(timeLeft)}
              </span>
            )}
            <Button
              type='button'
              size='sm'
              disabled={!isEmailChecked || hasEmailError}
              onClick={handleSendVerificationCode}
            >
              인증코드 발송
            </Button>
          </div>
          <div className='flex justify-between w-[400px]'>
            <p className='text-sm text-state-error'>
              {errors.verificationCode?.message || verificationStatus || '\u00A0'}
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
        >
          가입하기
        </Button>
        {showErrorModal && <SignupErrorModal onClose={() => setShowErrorModal(false)} />}
      </form>
    </div>
  );
}
