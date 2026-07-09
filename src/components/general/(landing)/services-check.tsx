"use client";

import React from 'react';
import { useTheme } from "next-themes";
import LightServices from './light-services';      // Your light version
import ServicesGrid from './services-carasoul';

const ServicesSection = () => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  return (
    <div>
      {currentTheme === 'light' ? (
        <LightServices />
      ) : (
        <ServicesGrid />
      )}
    </div>
  );
};

export default ServicesSection;