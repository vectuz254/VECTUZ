import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Smartphone } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { gradientStyle, VECTUZ_CONTACT } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative z-20 pt-12 md:pt-24 pb-16 text-center flex flex-col items-center px-6">
      {/* Eyebrow tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00e87a]/30 bg-[#00e87a]/10 text-xs font-semibold text-[#00e87a] tracking-wider uppercase mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-[#00e87a] animate-pulse" />
        <span>• Web Design Kenya</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.98] max-w-4xl select-none"
      >
        <span className="text-white block font-['Playfair_Display',serif]">Your Business.</span>
        <span className="block mt-1 font-['Playfair_Display',serif]">
          <span
            className="text-transparent"
            style={{
              WebkitTextStroke: '1.5px rgba(255,255,255,0.7)',
            }}
          >
            Digital{' '}
          </span>
          <span className="animate-shiny inline-block" style={gradientStyle}>
            Reality.
          </span>
        </span>
      </motion.h1>

      {/* Value Proposition Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 text-white/70 max-w-xl text-base md:text-lg leading-relaxed font-normal"
      >
        Custom websites, e-commerce &amp; secure checkout — built fast for Kenyan SMEs that mean business.
        Launch your online presence in days, not months, with M-Pesa integrated from day one.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4"
      >
        <PrimaryButton
          label="Start Your Project"
          href={VECTUZ_CONTACT.whatsappUrl}
          isWhatsApp
          className="text-sm px-7 py-4"
        />
        <a
          href="#services"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-white font-medium text-sm px-6 py-4 hover:bg-white/10 hover:border-white/40 transition-all active:scale-[0.98]"
        >
          See Services
        </a>
      </motion.div>

      {/* Stats Counter Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl w-full"
      >
        <div className="flex flex-col items-center">
          <span className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-[#00e87a] flex items-center gap-1">
            <Zap className="w-5 h-5 text-[#00e87a]" /> 5–10
          </span>
          <span className="text-xs text-white/50 uppercase tracking-wider mt-1">Day Delivery</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-[#f5c842]" /> M-Pesa
          </span>
          <span className="text-xs text-white/50 uppercase tracking-wider mt-1">Checkout Ready</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white flex items-center gap-1">
            <Smartphone className="w-5 h-5 text-[#3a8fe8]" /> 100%
          </span>
          <span className="text-xs text-white/50 uppercase tracking-wider mt-1">Mobile-First</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;