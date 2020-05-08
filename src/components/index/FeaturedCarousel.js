import React from 'react'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'


export default function FeaturedCarousel() {
  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      stopOnHover={true}
      interval={5000}
      transitionTime={500}
      swipeable={true}
      emulateTouch={true}
    >
      <Link href="/sales/[category]" as="/sales/Mobile Phones">
        <div>
          <img src="/img/carousel/Mobile Phones/01.webp" alt="First slide" />
        </div>
      </Link>
      <Link href="/sales/[category]" as="/sales/Laptops">
        <div>
          <img src="/img/carousel/Laptops/01.webp" alt="Second slide" />
        </div>
      </Link>
      <Link href="/sales/[category]" as="/sales/Tablets">
        <div>
          <img src="/img/carousel/Tablets/01.webp" alt="Third slide" />
        </div>
      </Link>
    </Carousel>
  )
}
