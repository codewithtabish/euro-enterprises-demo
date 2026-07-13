import AboutComp from '@/components/general/(about)/about-comp'
import BackButton from '@/components/general/(common)/back-button'
import { Container } from '@/components/general/container'
import React from 'react'

const AboutPage = () => {
  return (
    <div>
        <Container>
          <BackButton className='md:pt-10 pt-5'/>
          <div className='px-5'>
            <AboutComp/>

          </div>
        </Container>
      
    </div>
  )
}

export default AboutPage
