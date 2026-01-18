import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={
        'w-53 h-10 px-4 rounded-full border border-gray-300 outline-nonefocus:border-gray-500 focus:ring-1 focus:ring-gray-300 placeholder:text-[14px]'
      }
    />
  );
});

Input.displayName = 'Input';

export default Input;
