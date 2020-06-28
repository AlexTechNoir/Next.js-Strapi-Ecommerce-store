import React from 'react'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'

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
          <picture>
            <source data-srcSet="/img/carousel/Mobile Phones/01.webp" type="image/webp" />
            <img src="/img/carousel/Mobile Phones/01.jpg" alt="First slide" />
          </picture>
        </div>
      </Link>
      <Link href="/sales/[category]" as="/sales/Laptops">
        <div>
          <picture>
            <source data-srcSet="/img/carousel/Laptops/01.webp" type="image/webp" />
            <img src="/img/carousel/Laptops/01.jpg" alt="Second slide" />
          </picture>
        </div>
      </Link>
      <Link href="/sales/[category]" as="/sales/Tablets">
        <div>
          <picture>
            <source data-srcSet="/img/carousel/Tablets/01.webp" type="image/webp" />
            <img src="/img/carousel/Tablets/01.jpg" alt="Third slide" />
          </picture>
        </div>
      </Link>
    </Carousel>
  )
}
