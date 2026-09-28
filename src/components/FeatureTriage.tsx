import React from 'react';
import { motion } from 'motion/react';
import { SectionEyebrow } from './SectionEyebrow';
import { Check } from 'lucide-react';

const pillars = [
  {
    number: '01',
    title: '5–10 Day Delivery',
    color: '#00e87a',
    desc: "Most projects launch in under two weeks. You don't wait months to start taking orders online.",
    items: ['Day 1–2: Strategy & Wireframing', 'Day 3–5: Visual Design & Mobile Coding', 'Day 6–10: M-Pesa Setup & Launch'],
  },
  {
    number: '02',
    title: 'Kenya-Focused Payments',
    color: '#f5c842',
    desc: 'Lipa Na M-Pesa, WhatsApp ordering, and local payment habits are engineered in from day one.',
    items: ['Safaricom Daraja STK Push', 'Card Payments via Paystack', 'Direct WhatsApp Cart Dispatch'],
  },
  {
    number: '03',
    title: 'No Cookie-Cutter Sites',
    color: '#3a8fe8',
    desc: 'Every build is custom designed around your brand and your customers, never a copy-pasted template.',
    items: ['Custom Brand Typography & Colors', 'Fast Lightweight Code (No Slow Bloat)', 'High-Converting Sales Layouts'],
  },
  {
    number: '04',
    title: 'Ongoing Support & Care',
    color: '#e84444',
    desc: "Launch day isn't the finish line. You get real support windows and a real person on WhatsApp to message.",
    items: ['1–6 Months Included Support', 'Direct WhatsApp Developer Access', 'Free Domain & Hosting Setup for 1 Year'],
  },
];

const chips = [
  '5–10 Day Turnaround',
  'Lipa Na M-Pesa STK',
  'WhatsApp Order Links',
  'Free .co.ke Domain',
  'Mobile-First Layouts',
  'Google Maps & SEO',
];

export const FeatureTriage: React.FC = () => {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28" id="why">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionEyebrow label="Why VECTUZ" tag="Kenya-Focused" />

          <h2 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] font-['Playfair_Display',serif]">
            Built for how Kenyan
            <br />
            businesses actually run.
          </h2>

          <p className="mt-6 text-white/70 text-base leading-[1.65] max-w-lg">
            No cookie-cutter templates that break on mobile. We build websites that load instantly on Safaricom &amp; Airtel networks, accept M-Pesa payments smoothly, and turn casual visitors into paying customers.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-xs text-white/80 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] select-none hover:border-[#00e87a]/40 hover:text-[#00e87a] transition-colors"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Liquid-Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass rounded-2xl p-5 border border-white/10 shadow-2xl"
        >
          <div className="text-xs text-white/50 font-medium mb-4 flex items-center justify-between">
            <span>The VECTUZ Standard</span>
            <span className="text-[11px] text-[#00e87a] bg-[#00e87a]/10 px-2 py-0.5 rounded-full border border-[#00e87a]/30">
              Guaranteed Results
            </span>
          </div>

          <div className="space-y-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="liquid-glass rounded-xl p-4 transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold px-1.5 py-0.5 rounded"
                      style={{ color: pillar.color, backgroundColor: `${pillar.color}15` }}
                    >
                      {pillar.number}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {pillar.title}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/60 mb-2 leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="space-y-1 text-xs text-white/50 pl-3 border-l" style={{ borderColor: `${pillar.color}40` }}>
                  {pillar.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <Check className="w-3 h-3 text-[#00e87a] flex-shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureTriage;