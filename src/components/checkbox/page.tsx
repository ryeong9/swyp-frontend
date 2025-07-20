'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function AutoLoginCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <label className='flex justify-center items-center gap-3 cursor-pointer w-[400px]'>
      <input
        type='checkbox'
        className='hidden'
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div
        className={`w-[23px] h-[23px] flex items-center justify-center rounded-md transition-all ${
          checked ? 'bg-state-success' : 'bg-[#ffffff] border-1 border-gray-300'
        }`}
      >
        {checked && (
          <Check
            size={18}
            strokeWidth={3}
            color='white'
          />
        )}
      </div>
      <span className='text-gray-700 text-base'>자동 로그인/로그인 상태 유지</span>
    </label>
  );
}
