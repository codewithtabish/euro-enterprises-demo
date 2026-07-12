'use client';

import React from 'react';
import DesktopHeroSection from './desktop-hero-section';
import HeroSectionMobile from './mobile-hero-section';

export type AvatarList = {
  image: string;
};

// Avatar data
const avatars: AvatarList[] = [
  { image: "/avatars/one.jpg" },
  { image: "/avatars/two.jpg" },
  { image: "/avatars/three.jpg" },
  { image: "/avatars/one.jpg" },
  { image: "/avatars/two.jpg" },
  { image: "/avatars/three.jpg" },
];

const HeroSection = () => {
  return (
    <>
      {/* Mobile & Tablet (Small & Medium Devices) */}
      <div className="block lg:hidden">
        <HeroSectionMobile avatarList={avatars} />
      </div>

      {/* Desktop & Large Screens */}
      <div className="hidden lg:block">
        <DesktopHeroSection />
      </div>
    </>
  );
};

export default HeroSection;