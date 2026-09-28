import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'How fast can my site be delivered?',
    a: 'Starter sites typically launch in 5 working days. Business and Premium e-commerce builds usually take 1–3 weeks depending on catalogue size and custom features. MAX projects run on a mutually agreed timeline.',
  },
  {
    q: 'How does payment work?',
    a: 'Every project operates on a clear 50/50 split: 50% deposit to commence design and engineering, and the remaining 50% upon full completion and your signoff before final handover.',
  },
  {
    q: "What is your revisions policy?",
    a: 'Every package includes 3 dedicated rounds of revisions during the build phase. This covers visual tweaks, copy updates, and layout alignments to ensure you are 100% satisfied.',
  },
  {
    q: 'Do you support Lipa Na M-Pesa & Card Checkout?',
    a: 'Yes! M-Pesa is integrated from the Starter package upward. Business and Premium packages feature automated STK push prompts as well as Visa/Mastercard processing via Paystack.',
  },
  {
    q: 'Can you review an existing website I already own?',
    a: 'Yes, absolutely free of charge. Message us your current domain link, and we will prepare a concise audit highlighting speed bottlenecks, mobile flaws, and conversion gaps.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 border-t border-white/10" id="faq">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[#00e87a] font-semibold">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-['Playfair_Display',serif]">
          Questions we get a lot
        </h2>
        <p className="text-white/60 text-sm mt-2">
          Everything you need to know about working with VECTUZ.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.q}
              className="liquid-glass rounded-xl border border-white/10 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-[#00e87a] transition-colors"
              >
                <span>{faq.q}</span>
                <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white/60">
                  {isOpen ? <Minus className="w-4 h-4 text-[#00e87a]" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;