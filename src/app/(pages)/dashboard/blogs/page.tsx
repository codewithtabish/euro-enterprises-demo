import { Container } from '@/components/general/container'
import Link from 'next/link'
import React from 'react'

const DashboardBlogsPage = () => {
  return (
    <div>
      <Container>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sint delectus, excepturi earum necessitatibus nemo iste voluptatem est nisi animi voluptate quibusdam fuga dignissimos incidunt eligendi voluptatum sit repellat ratione?
        <hr />
        <Link href={'/dashboard/blogs/create'}>
        Create blog
        </Link>
      </Container>


      
    </div>
  )
}

export default DashboardBlogsPage
