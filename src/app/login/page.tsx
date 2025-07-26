'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/button/page';
import Input from '@/components/input/page';
import AutoLoginCheckbox from '@/components/checkbox/page';
import { BASE_URL } from '@/constants/env';
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
  const [isEmailDeleted, setIsEmailDeleted] = useState(false);
  const [isPasswordDeleted, setIsPasswordDeleted] = useState(false);

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

  const onSubmit = (data: FormData) => {
    console.log('로그인 데이터:', data);
    // 로그인 요청 처리 추가 가능
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <form className='flex flex-col w-[400px] h-full gap-6'>
        <div className='text-center h-[58px] font-serif text-xl'>
          <p>찰나의 감정을 오래 꺼내볼 수 있도록 기록해요</p>
          <p>인덱스가 그 순간들을 모아드릴게요</p>
        </div>

        <div className='flex flex-col gap-2'>
          <Input
            id='email'
            type='email'
            placeholder='이메일 주소를 입력해주세요'
            size='md'
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
            size='md'
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
          onClick={handleSubmit(onSubmit)}
        >
          로그인
        </Button>

        <div className='flex items-center justify-center gap-4'>
          <hr className='flex-grow border-t border-gray-700' />
          <span className='text-sm text-gray-700'>또는</span>
          <hr className='flex-grow border-t border-gray-700' />
        </div>

        <button
          type='button'
          onClick={() => (window.location.href = `${BASE_URL}/oauth2/authorization/google`)}
          className='flex items-center justify-center gap-3 bg-[#F2F2F2] text-black w-[400px] h-[50px] text-base rounded-lg'
        >
          <Image
            src='/icons/google.svg'
            alt='google icon'
            width={20}
            height={20}
          />
          <span>구글로 시작하기</span>
        </button>

        <button
          type='button'
          onClick={() => (window.location.href = `${BASE_URL}/oauth2/authorization/kakao`)}
          className='flex items-center justify-center gap-3 bg-[#FFE812] text-black w-[400px] h-[50px] text-base rounded-lg'
        >
          <Image
            src='/icons/kakao.svg'
            alt='kakao icon'
            width={20}
            height={20}
          />
          <span>카카오로 시작하기</span>
        </button>

        <button
          type='button'
          onClick={() => {
            window.location.href = `${BASE_URL}/oauth2/authorization/naver`;
          }}
          className='flex items-center justify-center gap-3 bg-[#00DE5A] text-black w-[400px] h-[50px] text-base rounded-lg'
        >
          <Image
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
