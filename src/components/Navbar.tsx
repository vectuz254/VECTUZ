import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail } from 'lucide-react';
import { VectuzCubeLogo } from './VectuzCubeLogo';
import { PrimaryButton } from './PrimaryButton';
import { VECTUZ_CONTACT } from '../constants';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Why Us', href: '#why' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-black/40 border-b border-white/5 transition-all">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between"
        aria-label="VECTUZ Navigation"
      >
        {/* Brand: Logo + VECTUZ */}
        <a href="#top" className="flex items-center gap-3 group" aria-label="VECTUZ Home">
          <VectuzCubeLogo size={34} />
          <span className="font-bold text-xl tracking-tight text-white font-['Playfair_Display',serif]">
            VECT<span className="text-[#00e87a]">UZ</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
              className="text-white/70 text-sm font-medium hover:text-[#00e87a] transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`mailto:${VECTUZ_CONTACT.email}`}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/80 hover:text-[#00e87a] hover:border-[#00e87a]/40 transition-all"
            title="Email VECTUZ"
            aria-label="Email VECTUZ"
          >
            <Mail className="w-4 h-4" />
          </a>
          <PrimaryButton
            label="Get Started"
            href={VECTUZ_CONTACT.whatsappUrl}
            isWhatsApp
            className="py-2.5 px-5 text-xs uppercase tracking-wider"
          />
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-white/10 bg-[#0c0c0c]/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 text-base font-medium py-2 hover:text-[#00e87a] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <PrimaryButton
                full
                label="Chat on WhatsApp"
                href={VECTUZ_CONTACT.whatsappUrl}
                isWhatsApp
              />
              <a
                href={`mailto:${VECTUZ_CONTACT.email}`}
                className="text-xs text-white/60 hover:text-white flex items-center justify-center gap-1.5 py-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{VECTUZ_CONTACT.email}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;