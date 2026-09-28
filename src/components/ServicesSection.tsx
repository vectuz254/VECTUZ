import React from 'react';
import { motion } from 'motion/react';
import { Layout, ShoppingCart, CreditCard, Smartphone } from 'lucide-react';

const services = [
  {
    icon: Layout,
    color: '#00e87a',
    title: 'Custom Web Design',
    desc: 'A site designed around your brand and your customers — not a recycled template. Every page is built to load fast and convert visitors into buyers.',
  },
  {
    icon: ShoppingCart,
    color: '#f5c842',
    title: 'E-Commerce Stores',
    desc: 'A full online shop with product catalogues, cart, and order management — so you can sell to the whole country, not just people who walk past your shop.',
  },
  {
    icon: CreditCard,
    color: '#3a8fe8',
    title: 'Secure Checkout',
    desc: 'M-Pesa, card, and mobile money support built in, so customers can pay the way they already trust — no awkward bank transfers or "send me your number" messages.',
  },
  {
    icon: Smartphone,
    color: '#e84444',
    title: 'Mobile-First Design',
    desc: "Built for the phone in your customer's hand first. Since most Kenyans browse on mobile, your site is fast, thumb-friendly, and never breaks on a small screen.",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/10" id="services">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-[#00e87a] font-semibold">
          What We Build
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2 font-['Playfair_Display',serif]">
          Everything your business needs to sell online
        </h2>
        <p className="text-white/60 text-sm mt-3">
          Custom engineered for speed, mobile shopping, and real Kenyan revenue.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#00e87a]/40 hover:-translate-y-1 transition-all group"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#00e87a] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-white/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;