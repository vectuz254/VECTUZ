import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { VECTUZ_CONTACT } from '../constants';

export const TopBanner: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="relative z-40 w-full bg-gradient-to-r from-[#00e87a]/90 via-[#00c565] to-[#00e87a]/90 text-[#04140c] text-xs font-semibold py-2 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center flex-wrap">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-[#04140c]" />
          <span>Launch Offer — 20% OFF all packages this month</span>
        </span>
        <span className="hidden sm:inline opacity-40">|</span>
        <span className="hidden sm:inline">Fast 5–10 day delivery guaranteed</span>
        <a
          href={VECTUZ_CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline underline-offset-2 ml-1 hover:opacity-80 transition-opacity"
        >
          Claim on WhatsApp <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};

export default TopBanner;