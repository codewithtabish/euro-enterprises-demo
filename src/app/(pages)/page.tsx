import FeaturedCarsSection from '@/components/general/(landing)/(fearuredcars)/featured-cars-section'
import HeroSection from '@/components/general/(landing)/(hero)/hero-section'
import { CarInspectionSection } from '@/components/general/(landing)/(inspection)/car-inspection-section'
import APPNavBar from '@/components/general/(landing)/(navbar)/navbar'
import ServicesSection from '@/components/general/(landing)/(services)/services-section'
import TestimonialsSection from '@/components/general/(landing)/(testmonial)/testimonials-02'
import WhyChooseUsSection from '@/components/general/(landing)/(why-choose)/choose-us-section'
import CarSalesSection from '@/components/general/(landing)/sales-car/car-sale-section'
import { Container } from '@/components/general/container'
import FaqAccordion from '@/components/general/(landing)/(faq)/faq-accordion'
import { CallToAction } from '@/components/general/(landing)/(cta)/cta'






const HomePage = () => {
  return (
    <div>
      {/* <GradientDotMesh /> */}
      
  
      <Container>
        <HeroSection/>
        <ServicesSection/>
        <FeaturedCarsSection/>
        <div className='md:block hidden'>
          <CarSalesSection/>
        </div>
        <CarInspectionSection/>
        <WhyChooseUsSection/>
        <TestimonialsSection/>
        <FaqAccordion/>
        <CallToAction/>


      
 





  




      </Container>
      
    </div>
  )
}

export default HomePage
