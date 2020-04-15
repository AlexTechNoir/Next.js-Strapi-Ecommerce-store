import React from 'react'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function FeaturedCarousel() {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay= {true}
      stopOnHover={true}
      interval={5000}
      transitionTime={500}
      swipeable={true}
      emulateTouch={true}
    >
      <Link href="/about">
        <div>
          <img src="/img/carousel/01.webp" alt="First slide" />
        </div>
      </Link>
      <Link href="/about">
        <div>
          <img src="/img/carousel/02.webp" alt="Second slide" />
        </div>
      </Link>
      <Link href="/about">
        <div>
          <img src="/img/carousel/03.webp" alt="Third slide" />
        </div>
      </Link>
    </Carousel>
  )
}
