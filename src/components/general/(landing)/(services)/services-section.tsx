"use client";

import React from 'react';
import { useTheme } from "next-themes";
import DarkServices from './dark-services';
import LightServicesSection from './light-services';

const ServicesSection = () => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  return (
    <div>
      {currentTheme === 'light' ? (
        <div>
          < >
            <div className='md:block hidden'>
              <LightServicesSection/>

            </div>
            <div className='block md:hidden'>
              <DarkServices/>

            </div>

          </>
        </div>
      ) : (
        <DarkServices />
      )}
    </div>
  );
};

export default ServicesSection;