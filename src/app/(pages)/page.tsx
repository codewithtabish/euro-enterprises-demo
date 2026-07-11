import { CallToAction } from '@/components/cta'
import { CarInspectionDemoSection } from '@/components/general/(landing)/car-inspection-demo'
import WhyChooseUsTabs from '@/components/general/(landing)/choose-us-section'
import ServicesSection from '@/components/general/(landing)/services-check'
import { Container } from '@/components/general/container'
import AccordionCarousel from '@/components/pixel-perfect/accordion-carousel'
import FeaturedCarsSection from '@/components/pixel-perfect/cover-flow-carousel'
import SlicedRevealCarousel from '@/components/pixel-perfect/sliced-reveal-carousel'
import TestimonialsSection from '@/components/testimonials-02'
import FaqAccordion from '@/components/ui/faq-accordion'
import { NotchNavbar } from '@/components/ui/notch-navbar'
import React from 'react'




const HomePage = () => {
  return (
    <div>
      {/* <GradientDotMesh /> */}
      


      <Container>
     <NotchNavbar/>
     


      
      <SlicedRevealCarousel/>
      <ServicesSection/>
      <FeaturedCarsSection/>
      <AccordionCarousel/>
      <CarInspectionDemoSection/>
      <WhyChooseUsTabs/>
      <TestimonialsSection/>
      <FaqAccordion/>
      <CallToAction/>
      
 





  




      </Container>
      
    </div>
  )
}

export default HomePage
