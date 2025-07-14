type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'md' | 'lg';
  onClick?: () => void;
};
export default function Button({
  children,
  size = 'md',
  disabled = true,
  type = 'submit',
  onClick,
}: ButtonProps) {
  const buttonClass =
    size === 'lg' ? 'w-[610px] h-[50px]' : size === 'md' ? 'w-[190px] h-[50px]' : '';
  const activeStyle = 'bg-state-success text-background-input';
  const disabledStyle = 'bg-state-disabled cursor-not-allowed text-gray-700';
  return (
    <button
      type={type}
      className={` ${buttonClass} text-sm rounded-2xl ${disabled ? disabledStyle : activeStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
