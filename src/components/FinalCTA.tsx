import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { VECTUZ_CONTACT } from '../constants';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center border border-white/10"
      >
        {/* Radial Glow Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px circle at 50% 0%, rgba(0, 232, 122, 0.22), transparent 70%)',
            opacity: 0.4,
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-[#00e87a] font-semibold mb-3">
            Start Your Project Today
          </span>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white font-['Playfair_Display',serif]">
            Turn your business idea
            <br />
            into digital reality.
          </h2>

          <p className="mt-6 text-white/70 max-w-lg mx-auto text-base leading-relaxed">
            Stop waiting months for slow agencies. Get a fast, beautiful, mobile-first website with
            M-Pesa checkout built right in — delivered in 5 to 10 days.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href={VECTUZ_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#00e87a] text-[#04140c] font-bold text-sm px-8 py-4 shadow-lg shadow-[#00e87a]/25 hover:bg-[#12f388] transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={`mailto:${VECTUZ_CONTACT.email}?subject=Website%20Project%20Enquiry`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-white text-sm font-medium px-7 py-4 hover:bg-white/10 hover:border-white/35 transition-all"
            >
              <Mail className="w-4 h-4 text-white/60" />
              <span>Email: {VECTUZ_CONTACT.email}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;