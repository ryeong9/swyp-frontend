'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/button/page';
import Input from '@/components/input/page';

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <form className=' w-[400px] h-[658px] '>
        <div className='text-center  mb-8 font-serif text-xl'>
          <p>찰나의 감정을 오래 꺼내볼 수 있도록 기록해요</p>
          <p>인덱스가 그 순간들을 모아드릴게요</p>
        </div>

        {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 p-4 mx-auto max-w-[400px] w-full'
      > */}
        {/* 이메일 */}
        <div className='flex flex-col gap-2'>
          <Input
            id='email'
            type='email'
            placeholder='이메일 주소를 입력해주세요'
            size='md'
            autoComplete='email'
            autoFocus
            {...register('email')}
            className='pb-[24px]'
            hasError={!!errors.email}
            isSuccess={!!email && !errors.email}
            onDelete={() => setIsEmailDeleted(true)}
            onChange={(e) => {
              setIsEmailDeleted(false);
              register('email').onChange(e);
            }}
          />
          {errors.email && <p className='text-state-error text-sm'>{errors.email.message}</p>}
        </div>

        {/* 비밀번호 */}
        <div className='flex flex-col gap-2'>
          <Input
            id='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            autoComplete='current-password'
            autoFocus
            size='md'
            {...register('password')}
            hasError={!!errors.password}
            isSuccess={!!password && !errors.password}
          />
          {errors.password && <p className='text-state-error text-sm'>{errors.password.message}</p>}
        </div>

        <Button
          type='submit'
          disabled={!isValid}
          size='md'
        >
          로그인
        </Button>
      </form>
    </div>
  );
}
