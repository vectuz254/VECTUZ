import React from 'react';
import { MessageCircle } from 'lucide-react';

interface PricingPlan {
  tier: string;
  price: string;
  badge?: string;
  isPopular?: boolean;
  desc: string;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    tier: 'Starter',
    price: 'KES 14,999',
    desc: 'Perfect for small businesses, salons, and consultants needing a credible web presence fast.',
    features: [
      'Up to 5 custom-designed pages (Home, About, Services, Gallery, Contact)',
      '100% mobile-responsive layout for all smartphones',
      'M-Pesa integration prompt ready for clients',
      'Free domain & hosting for 1 year (.co.ke included)',
      'Contact form & direct WhatsApp chat button',
      'Google Maps directions & social media links',
      'Guaranteed 5-day delivery turnaround',
    ],
  },
  {
    tier: 'Business',
    price: 'KES 44,999',
    badge: 'Most Popular',
    isPopular: true,
    desc: 'For stores, boutiques, and merchants wanting 24/7 automated orders and card/M-Pesa checkout.',
    features: [
      'Up to 15 pages + complete E-Commerce online shop',
      'Product catalogue, shopping cart & order manager',
      'Instant Lipa Na M-Pesa STK Push & Card checkout',
      'Floating WhatsApp order button on all pages',
      'Custom animations & micro-interactions',
      '1 Month free dedicated technical support & tweaks',
      'Free domain & cloud hosting for 1 year',
    ],
  },
  {
    tier: 'Premium',
    price: 'KES 79,999',
    badge: 'Custom Systems',
    desc: 'For clinics, salons, real estate, and companies needing appointments, dashboards, or portals.',
    features: [
      'Unlimited pages with bespoke custom design system',
      'Appointment booking or live inventory system',
      'Private admin dashboard to manage products & orders',
      'Direct API integrations (accounting, SMS, dispatch)',
      'Full SEO setup & Google Search Console indexing',
      '3 Months priority support & developer assistance',
      'Automated scheduled site backups',
    ],
  },
];

export const Pricing: React.FC = () => {
  return (
    <section className="c3-pricing-section" id="pricing">
      {/* SVG noise filter for the pricing watermark */}
      <svg className="sr-only" aria-hidden="true" width="0" height="0">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      {/* Giant Watermark Headline */}
      <div className="c3-watermark-container pointer-events-none select-none">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your Business.</span>
          <span
            className="c3-watermark-line-2"
            style={{
              background: 'linear-gradient(to right, #04140c 0%, #004d25 25%, #00e87a 65%, #84ffc9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Digital Reality.
          </span>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center relative z-10 max-w-xl mx-auto -mt-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-[#00e87a] font-semibold">
          Transparent Pricing
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2 font-['Playfair_Display',serif]">
          Straightforward packages, no hidden fees
        </h2>
        <p className="text-white/60 text-sm mt-3">
          Every project runs on a transparent 50/50 split (50% deposit to begin, 50% upon final handover).
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="c3-grid">
        {plans.map((plan) => {
          const cardClass = plan.isPopular ? 'c3-card c3-card-pro border-[#00e87a]' : 'c3-card';

          return (
            <div key={plan.tier} className={cardClass}>
              {plan.badge && (
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#00e87a] text-[#04140c]">
                  {plan.badge}
                </div>
              )}

              <div className="c3-tier-small">{plan.tier}</div>
              <div className="c3-tier-large text-[#00e87a] font-['Playfair_Display',serif]">
                {plan.price}
              </div>
              <div className="c3-desc">{plan.desc}</div>

              <ul className="c3-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="c3-check bg-[#00e87a]/20 text-[#00e87a]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 text-[#00e87a]"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/254783944907?text=Hi%20VECTUZ,%20I'm%20interested%20in%20the%20${plan.tier}%20Package%20(${plan.price}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="c3-btn inline-flex items-center justify-center gap-2 hover:bg-[#00e87a] hover:text-[#04140c] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Choose {plan.tier}</span>
              </a>
            </div>
          );
        })}
      </div>

      {/* Extra Packages Banner: MAX & Free Web Review */}
      <div className="relative z-10 w-full max-w-[1100px] mt-10 grid sm:grid-cols-2 gap-4 px-4 sm:px-0 mx-auto">
        {/* MAX Web App */}
        <div className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">MAX (Web + Mobile App)</span>
              <span className="text-xs font-semibold text-[#f5c842] bg-[#f5c842]/10 px-2 py-0.5 rounded">
                KES 150k – 450k
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Custom web platform, Android &amp; iOS mobile apps, direct Safaricom Daraja API, complete CRM, and 6 months dedicated engineering.
            </p>
          </div>
          <a
            href="https://wa.me/254783944907?text=Hi%20VECTUZ,%20I%20want%20to%20enquire%20about%20the%20MAX%20Package."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs font-semibold text-[#00e87a] hover:underline inline-flex items-center gap-1"
          >
            Enquire about MAX on WhatsApp &rarr;
          </a>
        </div>

        {/* Free Web Review */}
        <div className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">Free Website Audit</span>
              <span className="text-xs font-semibold text-[#3a8fe8] bg-[#3a8fe8]/10 px-2 py-0.5 rounded">
                100% Free
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Already have a website? Send us the link. We will provide an honest, plain-language breakdown of what is slowing it down and costing you customers.
            </p>
          </div>
          <a
            href="https://wa.me/254783944907?text=Hi%20VECTUZ,%20could%20you%20review%20my%20current%20website%20for%20free?"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs font-semibold text-[#3a8fe8] hover:underline inline-flex items-center gap-1"
          >
            Request Free Review on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;