import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { SideBySideMagnifier } from 'react-image-magnifiers'

export default function ProductSlider({ dataItem }) {
  const { id, category } = dataItem

  const renderCustomThumbs = () => {
    if (category === 'Mobile Phones') {
      return [
        <img src={`/img/products/${id}/01.webp`} alt="First Thumbnail" height="70" />,
        <img src={`/img/products/${id}/02.webp`} alt="Second Thumbnail" height="70" />,
        <img src={`/img/products/${id}/03.webp`} alt="Third Thumbnail" height="70" />
      ]
    } else {
      return [
        <img src={`/img/products/${id}/01.webp`} alt="First Thumbnail" height="70" />,
        <img src={`/img/products/${id}/02.webp`} alt="Second Thumbnail" height="70" />
      ]
    }
  }

  return (
    <Carousel
      showArrows={false}
      showStatus={true}
      showIndicators={false}
      showThumbs={true}
      autoPlay={false}
      transitionTime={500}
      swipeable={false}
      emulateTouch={true}
      renderThumbs={renderCustomThumbs}
    >
      <div>
        <SideBySideMagnifier 
          imageSrc={`/img/products/${id}/01.webp`} 
          imageAlt="First Slide" 
          alwaysInPlace={true}
          fillAvailableSpace={true}
        />
      </div>
      <div>
        <SideBySideMagnifier 
          imageSrc={`/img/products/${id}/02.webp`} 
          imageAlt="Second Slide" 
          alwaysInPlace={true}
          fillAvailableSpace={true}
        />
      </div>
      {
        category === 'Mobile Phones'
        ? (
          <div>
            <SideBySideMagnifier 
              imageSrc={`/img/products/${id}/03.webp`} 
              imageAlt="Third Slide" 
              alwaysInPlace={true}
              fillAvailableSpace={true}
            />
          </div>
        )
        : null
      }
    </Carousel>
  )
}
