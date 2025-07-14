'use client';
import { useState } from 'react';
import Image from 'next/image';
import CheckIcon from '@/assets/icons/check.svg';
import ErrorIcon from '@/assets/icons/error.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

interface InputProps {
  hasError?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
  type?: 'text' | 'email' | 'password';
  size?: 'md' | 'lg';
  id?: string;
  placeholder?: string;
  register?: any;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}

export default function Input({
  hasError = false,
  isSuccess = false,
  className = '',
  size = 'md',
  value,
  onChange: externalOnChange,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sizeClass =
    size === 'lg' ? 'w-[610px] h-[50px]' : size === 'md' ? 'w-[400px] h-[50px]' : '';
  const baseStyle = 'text-base rounded-lg border p-[10px] px-[24px] bg-[#FFFFFF]';
  const borderColor = hasError
    ? 'border-state-error'
    : isSuccess
      ? 'borde-state-success'
      : 'border-gray-300';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    externalOnChange?.(e);
  };

  const handleDelete = () => {
    setInputValue('');
  };

  const showIcon = isFocused || inputValue.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        {...props}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${sizeClass} ${baseStyle} ${borderColor} ${showIcon ? 'pr-10' : ''}`}
      />
      {showIcon && (
        <>
          {hasError ? (
            <Image
              src={ErrorIcon}
              alt='error'
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
              width={20}
              height={20}
            />
          ) : isSuccess ? (
            <Image
              src={CheckIcon}
              alt='check'
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
              width={20}
              height={20}
            />
          ) : (
            <Image
              src={DeleteIcon}
              alt='delete'
              onClick={handleDelete}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
              width={20}
              height={20}
            />
          )}
        </>
      )}
    </div>
  );
}
