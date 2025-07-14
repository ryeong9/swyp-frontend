'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/button/page';
import Input from '@/components/input/page';

// Zod 스키마 정의
const schema = z.object({
  nickname: z.string().min(3, { message: '사용자 이름은 최소 3자 이상이어야 합니다.' }),
  email: z.string().email({ message: '유효한 이메일 주소를 입력하세요.' }),
  password: z
    .string()
    .min(8, { message: '8자 이상 입력해주세요.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: '대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
    }),
  verificationCode: z.string().min(1, { message: '인증코드를 다시 입력해주세요.' }),
  confirmPassword: z.string().min(8, { message: '비밀번호를 다시 확인해주세요.' }),
});

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log('회원가입 데이터:', data);
  };

  const isNicknameValid = () => {
    const nickname = getValues('nickname');
    return (nickname?.length ?? 0) >= 2 && nickname?.length <= 10 && !errors.nickname;
  };

  const isEmailValid = () => {
    const email = getValues('email');
    return email?.includes('@') && !errors.email;
  };

  const isVerificationCodeValid = () => {
    const code = getValues('verificationCode');
    return code?.length > 0 && !errors.verificationCode;
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#F9F7F0] font-sans'>
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
              register={register('nickname')}
              hasError={!!errors.nickname}
              isSuccess={isNicknameValid()}
            />
            <Button
              type='button'
              size='md'
              disabled={!isNicknameValid()}
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
              register={register('email')}
              hasError={!!errors.email}
              isSuccess={isEmailValid()}
            />
            <Button
              type='button'
              size='md'
              disabled={!isEmailValid()}
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
              register={register('verificationCode')}
              hasError={!!errors.verificationCode}
              isSuccess={isVerificationCodeValid()}
            />
            <Button
              type='button'
              size='md'
              disabled={!isVerificationCodeValid()}
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
            register={register('password')}
            hasError={!!errors.password}
          />
          {errors.password && <p className='text-state-error text-sm'>{errors.password.message}</p>}

          <label htmlFor='confirmPassword'>비밀번호 확인</label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='비밀번호를 다시 한 번 적어주세요.'
            size='lg'
            register={register('confirmPassword')}
            hasError={!!errors.confirmPassword}
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
