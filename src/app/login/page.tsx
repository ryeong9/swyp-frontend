'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/button/page';
import Input from '@/components/input/page';
import AutoLoginCheckbox from '@/components/checkbox/page';
import { BASE_URL } from '@/constants/env';
import { useLogin } from '@/hooks/login/useLogin';
import { LoginErrorModal, LoginAlreadyModal } from '@/components/modal/login/page';

const schema = z.object({
  email: z.string().email({ message: '이메일을 다시 확인해주세요' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다' })
    .regex(/[A-Z]/, { message: '비밀번호에 대문자가 포함되어야 합니다' })
    .regex(/[a-z]/, { message: '비밀번호에 소문자가 포함되어야 합니다' })
    .regex(/[0-9]/, { message: '비밀번호에 숫자가 포함되어야 합니다' }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [isEmailDeleted, setIsEmailDeleted] = useState(false);
  const [isPasswordDeleted, setIsPasswordDeleted] = useState(false);
  const [isShowLoginError, setIsShowLoginError] = useState(true);
  const [modalType, setModalType] = useState<
    'none' | 'loginError' | 'loginAlready' | 'loginDuplicate'
  >('none');

  const handleSocialLogin = (provider: 'google' | 'kakao' | 'naver') => {
    const authUrl = `${BASE_URL}/oauth2/authorization/${provider}`;
    window.location.href = authUrl;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    clearErrors,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = watch('email');
  const password = watch('password');
  const loginMutation = useLogin(setModalType);

  //로그인 폼 제출
  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      router.push('/');
    } catch (error) {
      //에러상황 useLogin에서 구현
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <form
        className='flex flex-col w-[400px] h-full gap-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-center h-[58px] font-serif text-xl'>
          <p>찰나의 감정을 오래 꺼내볼 수 있도록 기록해요</p>
          <p>인덱스가 그 순간들을 모아드릴게요</p>
        </div>

        <div className='flex flex-col gap-2'>
          <Input
            id='email'
            type='email'
            placeholder='이메일 주소를 입력해주세요'
            inputSize='md'
            autoComplete='email'
            autoFocus
            {...register('email')}
            className='placeholder:text-gray-300 font-normal text-base font-sans'
            hasError={!!errors.email}
            isSuccess={!!email && !errors.email}
            onDelete={() => {
              setIsEmailDeleted(true);
              setValue('email', '');
              clearErrors('email');
            }}
            onChange={(e) => {
              setIsEmailDeleted(false);
              register('email').onChange(e);
            }}
          />
          {errors.email && <p className='text-state-error text-sm'>{errors.email.message}</p>}
        </div>

        <div className='flex flex-col gap-2'>
          <Input
            id='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            inputSize='md'
            autoComplete='current-password'
            className='placeholder:text-gray-300 font-normal text-base font-sans'
            {...register('password')}
            hasError={!!errors.password}
            isSuccess={!!password && !errors.password}
            onDelete={() => {
              setIsPasswordDeleted(true);
              setValue('password', '');
              clearErrors('password');
            }}
            onChange={(e) => {
              setIsPasswordDeleted(false);
              register('password').onChange(e);
            }}
          />
          {errors.password && <p className='text-state-error text-sm'>{errors.password.message}</p>}
        </div>

        <div className='flex flex-col justify-center items-center gap-4'>
          <AutoLoginCheckbox />
          <a
            href='./signup'
            className='text-gray-700 underline'
          >
            회원이 아니신가요?
          </a>
        </div>

        <Button
          type='submit'
          disabled={!isValid}
          size='md'
        >
          로그인
        </Button>

        {modalType === 'loginError' && <LoginErrorModal onClose={() => setModalType('none')} />}
        {modalType === 'loginAlready' && <LoginAlreadyModal onClose={() => setModalType('none')} />}

        <div className='flex items-center justify-center gap-4'>
          <hr className='flex-grow border-t border-gray-700' />
          <span className='text-sm text-gray-700'>또는</span>
          <hr className='flex-grow border-t border-gray-700' />
        </div>

        <button
          type='button'
          onClick={() => handleSocialLogin('google')}
          className='flex items-center justify-center gap-3 bg-[#F2F2F2] text-black w-[400px] h-[50px] text-base rounded-lg'
        >
          <img
            src='/icons/google.svg'
            alt='google icon'
            width={20}
            height={20}
          />
          <span>구글로 시작하기</span>
        </button>

        <button
          type='button'
          onClick={() => handleSocialLogin('kakao')}
          className='flex items-center justify-center gap-3 bg-[#FFE812] text-black w-[400px] h-[50px] text-base rounded-lg'
        >
          <img
            src='/icons/kakao.svg'
            alt='kakao icon'
            width={20}
            height={20}
          />
          <span>카카오로 시작하기</span>
        </button>

        <button
          type='button'
          onClick={() => handleSocialLogin('naver')}
          className='flex items-center justify-center gap-3 bg-[#00DE5A] text-black w-[400px] h-[50px] text-base rounded-lg'
        >
          <img
            src='/icons/naver.svg'
            alt='naver icon'
            width={20}
            height={20}
          />
          <span>네이버로 시작하기</span>
        </button>
      </form>
    </div>
  );
}
