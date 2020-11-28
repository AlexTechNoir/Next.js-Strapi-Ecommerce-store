import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

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
        <Image 
          alt="First slide"
          src="/img/carousel/Mobile Phones/01.webp"
          width={960}
          height={500}
        />
      </Link>
      <Link href="/sales/[category]" as="/sales/Laptops">
        <Image 
          alt="Second slide"
          src="/img/carousel/Laptops/01.webp"
          width={960}
          height={500}
        />
      </Link>
      <Link href="/sales/[category]" as="/sales/Tablets">
        <Image 
          alt="Third slide"
          src="/img/carousel/Tablets/01.webp"
          width={960}
          height={500}
        />
      </Link>
    </Carousel>
  )
}
