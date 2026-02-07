'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimary({ children, className = '', ...props }: ButtonProps) {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
