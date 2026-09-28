import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { VECTUZ_CONTACT } from '../constants';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="border-t border-white/10 py-12 text-xs text-white/50 relative z-20">
        <div className="max-w-[1160px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider font-['Playfair_Display',serif] text-sm">
              VECT<span className="text-[#00e87a]">UZ</span>
            </span>
            <span>•</span>
            <span>Websites for Kenyan Businesses, Built Fast.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="https://instagram.com/vectuz_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href={`mailto:${VECTUZ_CONTACT.email}`} className="hover:text-white transition-colors">{VECTUZ_CONTACT.email}</a>
          </div>

          <div>
            &copy; {new Date().getFullYear()} VECTUZ. Nairobi, Kenya. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href={VECTUZ_CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </>
  );
};

export default Footer;