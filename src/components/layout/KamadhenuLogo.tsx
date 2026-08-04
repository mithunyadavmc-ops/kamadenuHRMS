import React from 'react';

import kamadhenuLogo from '../../../assets/logo/WhatsApp Image 2026-07-27 at 7.33.31 PM.jpeg';

interface KamadhenuLogoProps {
  variant?: 'full' | 'compact' | 'header';
  className?: string;
  imageClassName?: string;
}

export const KamadhenuLogo: React.FC<KamadhenuLogoProps> = ({
  variant = 'full',
  className = '',
  imageClassName = ''
}) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={kamadhenuLogo}
          alt="Kamadhenu HR Consultancy"
          className={`h-10 w-auto max-w-[11rem] object-contain ${imageClassName}`}
        />
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={kamadhenuLogo}
          alt="Kamadhenu HR Consultancy"
          className={`h-40 w-auto max-w-full object-contain md:h-56 lg:h-72 ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm max-w-4xl mx-auto ${className}`}>
      <img
        src={kamadhenuLogo}
        alt="Kamadhenu HR Consultancy"
        className={`w-full h-auto object-contain ${imageClassName}`}
      />
    </div>
  );
};
