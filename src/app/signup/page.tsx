'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/button/page';
import Input from '@/components/input/page';
import { useVerificationTimer } from '@/hooks/signup/useVerificationTimer';

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

  const onSubmit = (data: FormData) => {
    console.log('회원가입 데이터:', data);
  };

  const handleSendVerificationCode = () => {
    // API 호출 로직
    startTimer();
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
              size='md'
              {...register('nickname')}
              hasError={!!errors.nickname}
              isSuccess={!!nickname && !errors.nickname}
              onDelete={() => {
                setValue('nickname', '');
                clearErrors('nickname');
              }}
              onChange={(e) => register('nickname').onChange(e)}
            />
            <Button
              type='button'
              size='sm'
              disabled={!nickname || !!errors.nickname}
            >
              중복 확인
            </Button>
          </div>
          {errors.nickname && <p className='text-state-error text-sm'>{errors.nickname.message}</p>}
        </div>

        {/* 이메일 */}
        <div className='flex flex-col w-[610px] gap-2'>
          <label htmlFor='email'>이메일 주소</label>
          <div className='flex items-center justify-between '>
            <Input
              id='email'
              type='email'
              placeholder='이메일 주소를 입력해주세요'
              size='md'
              autoComplete='email'
              autoFocus
              {...register('email')}
              hasError={!!errors.email}
              isSuccess={!!email && !errors.email}
              onDelete={() => {
                setValue('email', '');
                clearErrors('email');
              }}
              onChange={(e) => register('email').onChange(e)}
            />
            <Button
              type='button'
              size='sm'
              disabled={!email || !!errors.email}
              onClick={handleSendVerificationCode}
            >
              인증코드 전송
            </Button>
          </div>
          {errors.email && <p className='text-state-error text-sm'>{errors.email.message}</p>}

          {/* 인증코드 */}
          <div className='flex items-center justify-between gap-2 relative'>
            <Input
              id='verificationCode'
              type='text'
              placeholder='인증코드를 입력해주세요.'
              size='md'
              {...register('verificationCode')}
              hasError={!!errors.verificationCode}
              isSuccess={!!verificationCode && !errors.verificationCode}
              onDelete={() => {
                setValue('verificationCode', '');
                clearErrors('verificationCode');
              }}
              onChange={(e) => register('verificationCode').onChange(e)}
            />
            {isActive && (
              <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-[#F03E3E]'>
                {formatTime(timeLeft)}
              </span>
            )}
            <Button
              type='button'
              size='sm'
              disabled={!verificationCode || !!errors.verificationCode}
            >
              확인
            </Button>
          </div>
          <div className='flex flex-row items-center justify-between w-[400px] gap-2'>
            <p className='text-sm text-state-error'>
              {errors.verificationCode?.message || '\u00A0'}
            </p>
            <p className='text-sm text-gray-700 cursor-pointer underline'>재전송</p>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>비밀번호</label>
          <Input
            id='password'
            type='password'
            placeholder='영문(대소문자) + 숫자 포함 8자 이상'
            size='lg'
            {...register('password')}
            hasError={!!errors.password}
            isSuccess={!!password && !errors.password}
            onDelete={() => {
              setValue('password', '');
              clearErrors('password');
            }}
            onChange={(e) => register('password').onChange(e)}
          />
          {errors.password && <p className='text-state-error text-sm'>{errors.password.message}</p>}

          <Input
            id='confirmPassword'
            type='password'
            placeholder='비밀번호를 다시 한 번 적어주세요.'
            size='lg'
            {...register('confirmPassword')}
            hasError={!!errors.confirmPassword}
            isSuccess={!!confirmPassword && !errors.confirmPassword}
            onDelete={() => {
              setValue('confirmPassword', '');
              clearErrors('confirmPassword');
            }}
            onChange={(e) => register('confirmPassword').onChange(e)}
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
