'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/button/page';
import Input from '@/components/input/page';

export default function LoignPage() {
  const [isNicknameDeleted, setIsNicknameDeleted] = useState(false);
  const [isEmailDeleted, setIsEmailDeleted] = useState(false);
  const [isVerificationCodeDeleted, setIsVerificationCodeDeleted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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

  const onSubmit = (data: FormData) => {
    console.log('회원가입 데이터:', data);
  };

  const nickname = watch('nickname');
  const email = watch('email');
  const verificationCode = watch('verificationCode');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  return (
    <div className='flex flex-col items-center justify-center h-screen font-sans'>
      <h1 className='text-2xl font-semibold mb-6'>회원가입</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 p-4 mx-auto max-w-[610px] h-[581px]'
      >
        {/* 닉네임 */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='nickname'>닉네임</label>
          <div className='flex items-center gap-2'>
            <Input
              id='nickname'
              type='text'
              placeholder='특수문자 및 공백 제외 2~10자.'
              size='md'
              {...register('nickname')}
              hasError={!!errors.nickname}
              isSuccess={!!nickname && !errors.nickname}
              onDelete={() => {
                setIsNicknameDeleted(true);
              }}
              onChange={(e) => {
                setIsNicknameDeleted(false);
                register('nickname').onChange(e);
              }}
            />
            <Button
              type='button'
              size='md'
              disabled={!nickname || !!errors.nickname || isNicknameDeleted}
            >
              중복 확인
            </Button>
          </div>
          {errors.nickname && <p className='text-state-error text-sm'>{errors.nickname.message}</p>}
        </div>

        {/* 이메일 */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>이메일 주소</label>
          <div className='flex items-center gap-2'>
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
                setIsEmailDeleted(true);
              }}
              onChange={(e) => {
                setIsEmailDeleted(false);
                register('email').onChange(e);
              }}
            />
            <Button
              type='button'
              size='md'
              disabled={!email || !!errors.email || isEmailDeleted}
            >
              인증코드 전송
            </Button>
          </div>
          {errors.email && <p className='text-state-error text-sm'>{errors.email.message}</p>}

          {/* 인증코드 */}
          <div className='flex items-center gap-2'>
            <Input
              id='verificationCode'
              type='text'
              placeholder='인증코드를 입력해주세요.'
              size='md'
              {...register('verificationCode')}
              hasError={!!errors.verificationCode}
              isSuccess={!!verificationCode && !errors.verificationCode}
              onDelete={() => {
                setIsVerificationCodeDeleted(true);
              }}
              onChange={(e) => {
                setIsVerificationCodeDeleted(false);
                register('verificationCode').onChange(e);
              }}
            />
            <Button
              type='button'
              size='md'
              disabled={!verificationCode || !!errors.verificationCode || isVerificationCodeDeleted}
            >
              확인
            </Button>
          </div>
          {errors.verificationCode && (
            <p className='text-state-error text-sm'>{errors.verificationCode.message}</p>
          )}
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
          />
          {errors.password && <p className='text-state-error text-sm'>{errors.password.message}</p>}

          <label htmlFor='confirmPassword'>비밀번호 확인</label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='비밀번호를 다시 한 번 적어주세요.'
            size='lg'
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
      </form>
    </div>
  );
}
