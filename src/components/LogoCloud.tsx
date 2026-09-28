import React from 'react';
import { motion } from 'motion/react';

const partners = [
  { name: 'Lipa Na M-Pesa', badge: 'Safaricom STK' },
  { name: 'Equity Bank', badge: 'Online Banking' },
  { name: 'KCB Bank', badge: 'Bank Integrations' },
  { name: 'DTB Bank', badge: 'Diamond Trust' },
  { name: 'Standard Chartered', badge: 'Card Checkout' },
  { name: 'Daraja API', badge: 'Realtime Webhooks' },
  { name: 'Paystack', badge: 'Visa / Mastercard' },
  { name: 'WhatsApp Business', badge: 'Instant Chat Cart' },
];

export const LogoCloud: React.FC = () => {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-white/5">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-widest text-[#00e87a] text-center font-semibold"
      >
        Integrated with Kenya&apos;s leading payment &amp; business networks
      </motion.p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 items-center">
        {partners.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
            className="liquid-glass rounded-xl p-4 flex flex-col items-center justify-center text-center border border-white/10 hover:border-[#00e87a]/40 transition-all select-none group"
          >
            <span className="text-sm font-bold text-white group-hover:text-[#00e87a] transition-colors">
              {item.name}
            </span>
            <span className="text-[10px] text-white/40 tracking-wide mt-1 uppercase">
              {item.badge}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LogoCloud;