import React, { useState } from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { VECTUZ_CONTACT } from '../constants';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    package: 'Business',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi VECTUZ!%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Business:* ${encodeURIComponent(formData.business)}%0A*Package:* ${encodeURIComponent(formData.package)}%0A*Message:* ${encodeURIComponent(formData.message || 'No additional message')}`;
    window.open(`https://wa.me/254783944907?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 border-t border-white/10" id="contact">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-[#00e87a] font-semibold">
          Get Started
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2 font-['Playfair_Display',serif]">
          Tell us about your business
        </h2>
        <p className="text-white/60 text-sm mt-2">
          Fill this in and we&apos;ll reply directly on WhatsApp or email, usually within an hour.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="liquid-glass rounded-2xl p-6 sm:p-10 border border-white/10 space-y-4 shadow-2xl"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Jane Wanjiru"
              className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00e87a] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="07XX XXX XXX"
              className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00e87a] transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.business}
              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
              placeholder="e.g. Kipawa Boutique"
              className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00e87a] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Interested Package
            </label>
            <select
              value={formData.package}
              onChange={(e) => setFormData({ ...formData, package: e.target.value })}
              className="w-full rounded-xl bg-black/80 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00e87a] transition-colors"
            >
              <option value="Starter (KES 14,999)">Starter — KES 14,999</option>
              <option value="Business (KES 44,999)">Business — KES 44,999 (Most Popular)</option>
              <option value="Premium (KES 79,999)">Premium — KES 79,999</option>
              <option value="MAX (KES 150k–450k)">MAX Web/App — KES 150k–450k</option>
              <option value="Free Web Review">Free Website Review (KES 0)</option>
              <option value="Not sure yet">Not sure yet — Need Guidance</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
            What are you looking to achieve?
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your products, services, or any specific features you need..."
            className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00e87a] transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#00e87a] text-[#04140c] font-bold text-sm py-4 px-6 flex items-center justify-center gap-2 hover:bg-[#12f388] shadow-lg shadow-[#00e87a]/20 transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Send Enquiry via WhatsApp</span>
        </button>

        {submitted && (
          <p className="text-center text-xs text-[#00e87a] flex items-center justify-center gap-1.5 pt-2">
            <CheckCircle2 className="w-4 h-4" /> WhatsApp conversation opened! We will get back to you shortly.
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactSection;