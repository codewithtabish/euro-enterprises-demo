import FeaturedCarsSection from '@/components/general/(landing)/(fearuredcars)/featured-cars-section'
import HeroSection from '@/components/general/(landing)/(hero)/hero-section'
import APPNavBar from '@/components/general/(landing)/(navbar)/navbar'
import ServicesSection from '@/components/general/(landing)/services-check'
import { Container } from '@/components/general/container'






const HomePage = () => {
  return (
    <div>
      {/* <GradientDotMesh /> */}
      
  
      <Container>
        <APPNavBar/>
        <HeroSection/>
        <ServicesSection/>
        <FeaturedCarsSection/>
     


{/*       
      <AccordionCarousel/>
      <CarInspectionDemoSection/>
      <WhyChooseUsTabs/>
      <TestimonialsSection/>
      <FaqAccordion/>
      <CallToAction/> */}
      
 





  




      </Container>
      
    </div>
  )
}

export default HomePage
