import React from 'react';

// VECTUZ Gradient shine matching the emerald/cyan-green tech branding
export const gradientStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #04140c 0%, #004d25 15%, #00e87a 35%, #84ffc9 50%, #00e87a 65%, #004d25 85%, #04140c 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
};

export const VECTUZ_CONTACT = {
  email: 'vectuz9@gmail.com',
  phone: '+254 783 944 907',
  whatsappUrl:
    'https://wa.me/254783944907?text=Hi%20VECTUZ!%20I%20want%20to%20start%20a%20website%20project%20for%20my%20business.',
  location: 'Nairobi, Kenya',
  siteUrl: 'https://vectuz.xyz',
};