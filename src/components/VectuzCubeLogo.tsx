import React from 'react';

interface VectuzCubeLogoProps {
  className?: string;
  size?: number;
}

export const VectuzCubeLogo: React.FC<VectuzCubeLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label="VECTUZ Logo"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:rotate-6 hover:scale-110"
      >
        {/* Isometric Cube Faces with signature VECTUZ colors */}
        {/* Top Face */}
        <polygon points="50,6 90,28 50,50 10,28" fill="#1c2430" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <polygon points="50,10 70,21 50,32 30,21" fill="#00e87a" opacity="0.9" />
        <polygon points="30,21 50,32 30,43 10,32" fill="#f5c842" opacity="0.8" />
        <polygon points="70,21 90,32 70,43 50,32" fill="#3a8fe8" opacity="0.8" />

        {/* Left Face */}
        <polygon points="10,28 50,50 50,94 10,72" fill="#141922" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <polygon points="14,35 46,53 46,71 14,53" fill="#e84444" opacity="0.85" />
        <polygon points="14,56 46,74 46,90 14,72" fill="#00e87a" opacity="0.75" />

        {/* Right Face */}
        <polygon points="50,50 90,28 90,72 50,94" fill="#0d1219" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <polygon points="54,53 86,35 86,53 54,71" fill="#3a8fe8" opacity="0.9" />
        <polygon points="54,74 86,56 86,72 54,90" fill="#f5c842" opacity="0.9" />

        {/* Circuit Infinity Loop Accent */}
        <path
          d="M32 50 C 32 38, 50 38, 50 50 C 50 62, 68 62, 68 50"
          stroke="#00e87a"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          filter="drop-shadow(0 0 4px #00e87a)"
        />
      </svg>
    </div>
  );
};

export default VectuzCubeLogo;