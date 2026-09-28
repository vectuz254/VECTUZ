import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  tag: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'VECTUZ had our boutique website live in 6 days with Lipa Na M-Pesa working right out of the box. We processed 28 orders on our very first weekend without answering "is this available" in Instagram DMs all night.',
    name: 'Jane Wanjiru',
    role: 'Founder & Head of Merchandising',
    company: 'NAIROBI TRENDS BOUTIQUE',
    tag: 'E-Commerce Package',
  },
  {
    quote:
      'The speed and clarity were incredible. Clients now book spa treatments and pay the commitment deposit directly on the site. It cut our phone scheduling time by 15 hours every single week.',
    name: 'Brian Kiprono',
    role: 'Managing Director',
    company: 'KILIMANI WELLNESS & SPA',
    tag: 'Business Package',
  },
  {
    quote:
      'Other agencies quoted us 2 months and hundreds of thousands. VECTUZ understood Kenyan business realities, delivered within 7 days, and our food orders go straight to our kitchen WhatsApp.',
    name: 'Amina Mohamed',
    role: 'Operations Director',
    company: 'COASTAL FLAVOURS CATERING',
    tag: 'Starter Package',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-[#00e87a] font-semibold">
          Client Feedback
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-['Playfair_Display',serif]">
          Trusted by growing Kenyan brands
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <motion.figure
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass rounded-2xl p-7 flex flex-col justify-between border border-white/10"
          >
            <div>
              <div className="flex items-center gap-1 text-[#f5c842] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[10px] text-white/50 ml-1.5 font-medium">{item.tag}</span>
              </div>
              <blockquote className="text-sm text-white/85 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            <figcaption className="mt-6 pt-5 border-t border-white/10">
              <div className="text-sm font-semibold text-white">{item.name}</div>
              <div className="text-xs text-white/50 mt-0.5">{item.role}</div>
              <div className="text-xs text-[#00e87a] font-semibold tracking-wide uppercase mt-1">
                {item.company}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;