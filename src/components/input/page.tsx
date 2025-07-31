'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import Image from 'next/image';
import CheckIcon from '@/assets/icons/check.svg';
import ErrorIcon from '@/assets/icons/error.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  isSuccess?: boolean;
  showStatusIcon?: boolean;
  showTimer?: boolean;
  timeLeft?: number;
  isActive?: boolean;
  formatTime?: (seconds: number) => string;
  inputSize?: 'md' | 'lg';
  onDelete?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      hasError = false,
      isSuccess = false,
      showStatusIcon = false,
      showTimer = false,
      timeLeft = 0,
      isActive = false,
      formatTime = () => '',
      className = '',
      inputSize = 'md',
      onDelete,
      value: controlledValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const isControlled = controlledValue !== undefined;
    const [localValue, setLocalValue] = useState(isControlled ? controlledValue : '');

    useEffect(() => {
      if (isControlled) {
        setLocalValue(controlledValue);
      }
    }, [controlledValue, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setLocalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleDelete = () => {
      if (!isControlled) {
        setLocalValue('');
      }
      onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      onDelete?.();
    };

    const value = isControlled ? controlledValue : localValue;

    const sizeClass =
      inputSize === 'lg' ? 'w-[610px] h-[50px]' : inputSize === 'md' ? 'w-[400px] h-[50px]' : '';
    const baseStyle = 'text-base rounded-lg border p-[10px] px-[24px] bg-[#FFFFFF]';

    const borderColor =
      (value as string).length === 0
        ? 'border-gray-300'
        : hasError
          ? 'border-state-error'
          : isSuccess
            ? 'border-state-success'
            : 'border-gray-300';

    const showDeleteIcon = isFocused || (value as string).length > 0;
    const showRightIcon = showDeleteIcon || showStatusIcon || (showTimer && isActive);
    const showTimerAbove = showTimer && isActive;
    return (
      <div className={`relative ${className}`}>
        <input
          {...props}
          ref={ref}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${sizeClass} ${baseStyle} ${borderColor} ${showRightIcon ? 'pr-10' : ''} outline-none`}
        />

        {showRightIcon && (
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center'>
            {showStatusIcon && (
              <>
                {hasError ? (
                  <Image
                    src={ErrorIcon}
                    alt='error'
                    width={20}
                    height={20}
                  />
                ) : isSuccess ? (
                  <Image
                    src={CheckIcon}
                    alt='check'
                    width={20}
                    height={20}
                  />
                ) : null}
              </>
            )}
            {showTimer && isActive && (
              <span className='text-sm font-medium text-state-error'>{formatTime(timeLeft)}</span>
            )}
            {showDeleteIcon && (
              <Image
                src={DeleteIcon}
                alt='delete'
                onClick={handleDelete}
                className='cursor-pointer'
                width={20}
                height={20}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
