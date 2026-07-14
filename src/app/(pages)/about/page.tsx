import BackButton from '@/components/general/(common)/back-button'
import { Container } from '@/components/general/container'
import React from 'react'
import AboutEuro from './about-euro'

const AboutPage = () => {
  return (
    <div>
        <Container>
          <BackButton className='md:pt-10 pt-5'/>
          <div className='px-5'>
            <AboutEuro/>


          </div>
        </Container>
      
    </div>
  )
}

export default AboutPage
