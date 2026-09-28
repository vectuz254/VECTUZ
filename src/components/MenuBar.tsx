import React from 'react';
import { motion } from 'motion/react';
import { VectuzCubeLogo } from './VectuzCubeLogo';

const menuItems = [
  'Custom Design',
  'E-Commerce',
  'M-Pesa Checkout',
  'Speed Audit',
  'Mobile First',
  'Support',
];

export const MenuBar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.85, ease: 'easeOut' }}
      className="w-full h-10 bg-black/60 backdrop-blur-md border-t border-b border-white/10 relative z-20 select-none text-xs"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: VECTUZ Studio + Capabilities */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <VectuzCubeLogo size={18} />
            <span className="font-bold text-white tracking-wide">VECTUZ Studio</span>
          </div>

          <div className="flex items-center gap-4 text-white/70">
            {menuItems.map((item, index) => {
              let visibility = 'inline';
              if (index > 3) {
                visibility = 'hidden md:inline';
              } else if (index > 2) {
                visibility = 'hidden sm:inline';
              }
              return (
                <span
                  key={item}
                  className={`${visibility} hover:text-[#00e87a] cursor-default transition-colors`}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right: Location + Live Booking Status */}
        <div className="flex items-center gap-3 text-white/60">
          <span className="flex items-center gap-1.5 font-medium text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#00e87a] animate-pulse" />
            <span>Nairobi, Kenya</span>
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-white/50">Taking projects for this week</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;