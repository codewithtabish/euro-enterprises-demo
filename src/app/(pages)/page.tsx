import LightSerices from '@/components/general/(landing)/light-services'
import ServicesSection from '@/components/general/(landing)/services-check'
import { Container } from '@/components/general/container'
import AccordionCarousel from '@/components/pixel-perfect/accordion-carousel'
import FeaturedCarsSection from '@/components/pixel-perfect/cover-flow-carousel'
import SlicedRevealCarousel from '@/components/pixel-perfect/sliced-reveal-carousel'
import Testimonials02 from '@/components/testimonials-02'
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
      
 





  




      </Container>
      
    </div>
  )
}

export default HomePage
