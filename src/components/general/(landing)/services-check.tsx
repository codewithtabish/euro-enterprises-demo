"use client";

import React from 'react';
import { useTheme } from "next-themes";
import LightServices from './light-services';      // Your light version
import ServicesGrid from './services-carasoul';
import { div } from 'framer-motion/client';

const ServicesSection = () => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  return (
    <div>
      {currentTheme === 'light' ? (
        <div>
          <section >
            <div className='md:block hidden'>
              <LightServices/>

            </div>
            <div className='block md:hidden'>
              <ServicesGrid/>

            </div>

          </section>
        </div>
      ) : (
        <ServicesGrid />
      )}
    </div>
  );
};

export default ServicesSection;