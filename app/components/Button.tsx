'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
};

export default function Button({ primary = false, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        px-4 py-2 
        rounded 
        text-xs font-semibold 
        cursor-pointer
        ${primary ? 'text-white bg-[var(--primary-600)]' : 'text-primary-light bg-[var(--neutral-300)]'}
        `}
    >
      {children}
    </button>
  );
}
