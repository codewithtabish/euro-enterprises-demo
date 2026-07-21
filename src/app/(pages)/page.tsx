import { Container } from "@/components/general/container";
import { HeroSectionLazy } from "@/components/general/(landing)/(hero)/hero-section-lazy";
import { ServicesSectionLazy } from "@/components/general/(landing)/(services)/services-section-lazy";
import { FeaturedCarsLazy } from "@/components/general/(landing)/(fearuredcars)/featured-cars-lazy";
import { CarSalesSectionLazy } from "@/components/general/(landing)/sales-car/car-sales-lazy";
import { CarsForSaleSectionTwoLazy } from "@/components/general/(landing)/sales-car/cars-for-sale-section-two-lazy";
import CarInspectionLazy from "@/components/general/(landing)/(inspection)/car-inspection-lazy";
import WhyChooseUsLazy from "@/components/general/(landing)/(why-choose)/why-choose-us-lazy";
import { TestimonialsSectionLazy } from "@/components/general/(landing)/(testmonial)/testimonials-section-lazy";
import { FaqAccordionLazy } from "@/components/general/(landing)/(faq)/faq-accordion-lazy";
import { CallToActionLazy } from "@/components/general/(landing)/(cta)/call-to-action-lazy";

const HomePage = () => {
  return (
    <div>
      {/* <GradientDotMesh /> */}

      <Container>
        <HeroSectionLazy />
        <ServicesSectionLazy />
        <FeaturedCarsLazy />
        <div className="md:block hidden">
          <CarSalesSectionLazy />
        </div>
        <div className="block md:hidden">
          <CarsForSaleSectionTwoLazy />
        </div>
        <CarInspectionLazy />
        <WhyChooseUsLazy />
        {/* hh */}

        <TestimonialsSectionLazy />
        <FaqAccordionLazy />
        <CallToActionLazy />
      </Container>
    </div>
  );
};

export default HomePage;
