import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Smartphone,
  CreditCard,
  Search,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { VECTUZ_CONTACT } from '../constants';

interface ClientProject {
  id: string;
  name: string;
  category: string;
  summary: string;
  turnaround: string;
  revenueStatus: string;
  accentColor: string;
  badge: string;
  description: string;
  features: string[];
  mockupSnippet: {
    heroTitle: string;
    heroSubtitle: string;
    sampleItem: string;
    samplePrice: string;
    mpesaAction: string;
  };
}

const clientProjects: ClientProject[] = [
  {
    id: '1',
    name: 'Kipawa Luxe Fashion',
    category: 'Fashion & Apparel Store',
    summary: 'Full mobile-first boutique with size guides and Lipa Na M-Pesa.',
    turnaround: '6 Days Delivery',
    revenueStatus: 'KES 240,000+ weekly sales',
    accentColor: '#3a8fe8',
    badge: 'E-Commerce',
    description:
      'Turned an Instagram boutique with slow DM ordering into an automated 24/7 store. Customers browse, pick variations, and pay via STK push in 20 seconds.',
    features: ['Instant M-Pesa STK Push', 'Automated Size Guides', 'WhatsApp Order Notifications', 'Courier API Ready'],
    mockupSnippet: {
      heroTitle: 'Urban Autumn Collection 2026',
      heroSubtitle: 'Handcrafted luxury coats & bespoke tailoring in Nairobi.',
      sampleItem: 'Royal Blue Double-Breasted Wool Overcoat',
      samplePrice: 'KES 8,500',
      mpesaAction: 'Pay KES 8,500 with Lipa Na M-Pesa',
    },
  },
  {
    id: '2',
    name: 'Prime Haven Properties',
    category: 'Real Estate & Rentals',
    summary: 'Virtual property tours, map pins & WhatsApp viewing booking.',
    turnaround: '7 Days Delivery',
    revenueStatus: '42 viewing bookings / month',
    accentColor: '#00e87a',
    badge: 'Booking System',
    description:
      'A sleek property portal showcasing apartments in Kilimani, Westlands, and Karen. Includes interactive Google Maps pins and direct agent contact.',
    features: ['Google Maps Directions', 'Instant Viewing Scheduler', 'Verified Title Badges', 'Mortgage Calculator'],
    mockupSnippet: {
      heroTitle: 'Premium Homes in Nairobi & Coast',
      heroSubtitle: 'Verified apartments, townhouses, and villas for sale & rent.',
      sampleItem: '4-Bedroom Villa · Karen Sanctuary',
      samplePrice: 'KES 65,000,000',
      mpesaAction: 'Schedule Site Visit via WhatsApp',
    },
  },
  {
    id: '3',
    name: 'Mombasa Swahili Flavours',
    category: 'Restaurant & Catering',
    summary: 'Online food ordering, table reservations & instant delivery dispatch.',
    turnaround: '5 Days Delivery',
    revenueStatus: '110+ daily lunch orders',
    accentColor: '#f5c842',
    badge: 'Online Ordering',
    description:
      'Cut out high food delivery platform commission fees with an independent branded web menu. Orders go straight to kitchen WhatsApp with customer GPS pin.',
    features: ['Zero Delivery Commission', 'Direct Kitchen WhatsApp Bot', 'Lipa Na M-Pesa Till Integration', 'Real-time Meal Status'],
    mockupSnippet: {
      heroTitle: 'Authentic Coastal Biryani & Jollof',
      heroSubtitle: 'Hot, freshly cooked meals delivered across Nairobi in 35 mins.',
      sampleItem: 'Chef Special Spiced Chicken & Jollof Feast',
      samplePrice: 'KES 1,200',
      mpesaAction: 'Order Now & Pay via M-Pesa',
    },
  },
  {
    id: '4',
    name: 'Siri Beauty & Spa Lounge',
    category: 'Cosmetics & Wellness',
    summary: 'Treatment appointments, deposit payments & organic skin product sales.',
    turnaround: '6 Days Delivery',
    revenueStatus: 'Zero no-show cancellations',
    accentColor: '#e84444',
    badge: 'Services & Store',
    description:
      'Eliminated no-shows by collecting 30% M-Pesa commitment deposits at booking. Increased organic cosmetic product retail orders by 180%.',
    features: ['Automated SMS Confirmations', 'M-Pesa Deposit Collection', 'Stylist Selection Grid', 'Instagram Feed Sync'],
    mockupSnippet: {
      heroTitle: 'Radiant Glow Beauty Studio',
      heroSubtitle: 'Holistic skin treatments, bespoke makeup, and organic haircare.',
      sampleItem: 'Hydra-Facial Glow & Organic Skin Elixir',
      samplePrice: 'KES 4,500',
      mpesaAction: 'Book Slot with 30% M-Pesa Deposit',
    },
  },
];

export const InboxMockup: React.FC = () => {
  const [selectedId, setSelectedId] = useState('1');
  const activeProject = clientProjects.find((p) => p.id === selectedId) || clientProjects[0];

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24" id="portfolio">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl shadow-2xl shadow-black/80"
      >
        {/* macOS Title Bar */}
        <div className="h-10 px-4 flex items-center border-b border-white/10 bg-black/50 relative select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] border border-black/20" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-xs text-white/50 font-medium tracking-wide">
            VECTUZ Studio — Live Client Engine &amp; M-Pesa Checkout Demo
          </div>
        </div>

        {/* Studio Workspace Body */}
        <div className="grid grid-cols-12 min-h-[540px] text-xs">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 border-r border-white/10 bg-black/40 p-4 flex flex-col justify-between">
            <div>
              <a
                href={VECTUZ_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg bg-[#00e87a] text-[#04140c] text-xs font-bold px-3 py-2.5 flex items-center justify-center gap-2 shadow-md shadow-[#00e87a]/20 hover:bg-[#12f388] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Build Mine With VECTUZ</span>
              </a>

              <div className="mt-5">
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-1">
                  Client Case Studies
                </div>
                <div className="space-y-1">
                  {clientProjects.map((p) => {
                    const isSelected = selectedId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedId(p.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
                          isSelected
                            ? 'bg-white/10 text-white font-medium shadow-sm'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: p.accentColor }}
                          />
                          <span className="truncate">{p.name}</span>
                        </div>
                        <span className="text-[10px] text-white/40">{p.badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-1">
                  Included Integrations
                </div>
                <div className="space-y-2 text-white/70 text-[11px] pl-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00e87a]" />
                    <span>Lipa Na M-Pesa STK Push</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00e87a]" />
                    <span>WhatsApp Order Button</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00e87a]" />
                    <span>Free .co.ke Domain 1 Year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00e87a]" />
                    <span>Google SEO &amp; Maps Indexing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] text-white/40">
              <div className="flex items-center justify-between mb-1">
                <span>Fast Build Speed</span>
                <span className="text-[#00e87a] font-semibold">5–10 Days</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1">
                <div className="bg-[#00e87a] h-1 rounded-full w-[95%]" />
              </div>
            </div>
          </div>

          {/* Middle List */}
          <div className="col-span-12 md:col-span-4 border-r border-white/10 bg-black/20 flex flex-col h-full">
            <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-white/[0.02]">
              <Search className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
              <span className="text-xs text-white/50">Kenyan SME Showcase</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {clientProjects.map((p) => {
                const isSelected = selectedId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`p-3.5 cursor-pointer transition-all relative ${
                      isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00e87a]" />
                    )}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-white truncate text-xs">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-[#00e87a] font-medium bg-[#00e87a]/10 px-2 py-0.5 rounded-full">
                        {p.turnaround}
                      </span>
                    </div>
                    <div className="text-xs text-white/80 font-medium mb-1 truncate">
                      {p.category}
                    </div>
                    <div className="text-[11px] text-white/40 line-clamp-2">
                      {p.summary}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Reader */}
          <div className="col-span-12 md:col-span-5 bg-black/30 flex flex-col h-full overflow-hidden">
            <div className="h-10 px-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: activeProject.accentColor }}
                />
                <span className="font-semibold text-white text-xs">
                  {activeProject.name}
                </span>
              </div>
              <a
                href={VECTUZ_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#00e87a] hover:underline flex items-center gap-1"
              >
                <span>Request Similar</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div className="liquid-glass rounded-xl p-3.5 border border-[#00e87a]/25 bg-[#00e87a]/[0.04]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#00e87a] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Real Business Impact</span>
                  </span>
                  <span className="text-[10px] text-white/50">{activeProject.revenueStatus}</span>
                </div>
                <p className="text-[11px] text-white/80 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-black/60 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                    Client Front-End Preview
                  </span>
                  <span className="text-[10px] text-[#00e87a] flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> Mobile Optimized
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">
                    {activeProject.mockupSnippet.heroTitle}
                  </h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    {activeProject.mockupSnippet.heroSubtitle}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white text-xs">
                      {activeProject.mockupSnippet.sampleItem}
                    </div>
                    <div className="text-[11px] text-[#00e87a] font-semibold mt-0.5">
                      {activeProject.mockupSnippet.samplePrice}
                    </div>
                  </div>
                  <ShoppingBag className="w-4 h-4 text-white/40" />
                </div>

                <div className="p-3 rounded-lg bg-[#00e87a]/10 border border-[#00e87a]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#00e87a]" />
                    <span className="text-xs font-semibold text-white">
                      {activeProject.mockupSnippet.mpesaAction}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#00e87a] bg-[#00e87a]/20 px-2 py-0.5 rounded">
                    STK Push
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                  What VECTUZ Built &amp; Handed Over
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {activeProject.features.map((feat) => (
                    <div
                      key={feat}
                      className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-[11px] text-white/70 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#00e87a] flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InboxMockup;