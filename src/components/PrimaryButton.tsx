import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { VECTUZ_CONTACT } from '../constants';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  full?: boolean;
  className?: string;
  variant?: 'green' | 'white' | 'ghost';
  href?: string;
  isWhatsApp?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label = 'Start Your Project',
  full = false,
  className = '',
  variant = 'green',
  href,
  isWhatsApp = false,
  ...props
}) => {
  const baseClasses =
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold text-sm px-6 py-3.5 transition-all duration-300 active:scale-[0.98] select-none';

  let variantClasses = 'bg-[#00e87a] text-[#04140c] hover:bg-[#12f388] shadow-lg shadow-[#00e87a]/20';
  if (variant === 'white') {
    variantClasses = 'bg-white text-black hover:bg-white/90 shadow-md shadow-white/10';
  } else if (variant === 'ghost') {
    variantClasses = 'bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-[#00e87a]/50';
  }

  const content = (
    <>
      {isWhatsApp ? (
        <MessageCircle className="w-4 h-4 text-current transition-transform group-hover:scale-110" />
      ) : null}
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses} ${full ? 'w-full' : ''} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses} ${full ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;