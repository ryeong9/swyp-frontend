'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CheckIcon from '@/assets/icons/check.svg';
import ErrorIcon from '@/assets/icons/error.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

interface InputProps {
  hasError?: boolean;
  isSuccess?: boolean;
  showStatusIcon?: boolean;
  type?: 'text' | 'email' | 'password';
  size?: 'md' | 'lg';
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}

export default function Input({
  hasError = false,
  isSuccess = false,
  showStatusIcon = false,
  className = '',
  size = 'md',
  value: controlledValue,
  onChange: controlledOnChange,
  onDelete,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(controlledValue || '');

  useEffect(() => {
    setLocalValue(controlledValue || '');
  }, [controlledValue]);

  const sizeClass =
    size === 'lg' ? 'w-[610px] h-[50px]' : size === 'md' ? 'w-[400px] h-[50px]' : '';
  const baseStyle = 'text-base rounded-lg border p-[10px] px-[24px] bg-[#FFFFFF]';

  const borderColor =
    localValue.length === 0
      ? 'border-gray-300'
      : hasError
        ? 'border-state-error'
        : isSuccess
          ? 'border-state-success'
          : 'border-gray-300';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    controlledOnChange?.(e);
  };

  const handleDelete = () => {
    setLocalValue('');
    controlledOnChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    onDelete?.();
  };

  const showDeleteIcon = isFocused || localValue.length > 0;
  const showRightIcon = showDeleteIcon || showStatusIcon;

  return (
    <div className={`relative ${className}`}>
      <input
        {...props}
        value={controlledValue !== undefined ? controlledValue : localValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${sizeClass} ${baseStyle} ${borderColor} ${showRightIcon ? 'pr-10' : ''}`}
      />

      {showRightIcon && (
        <>
          {showStatusIcon ? (
            hasError ? (
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
            ) : null
          ) : (
            showDeleteIcon && (
              <Image
                src={DeleteIcon}
                alt='delete'
                onClick={handleDelete}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                width={20}
                height={20}
              />
            )
          )}
        </>
      )}
    </div>
  );
}
