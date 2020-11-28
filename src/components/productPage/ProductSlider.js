import { Carousel } from 'react-responsive-carousel'
import { SideBySideMagnifier } from 'react-image-magnifiers'

export default function ProductSlider({ dataItem }) {
  const { id, category } = dataItem

  const renderCustomThumbs = () => {
    if (category === "Mobile Phones") {
      return [
        <picture>
          <source data-srcSet={`/img/products/${id}/01.webp`} type="image/webp" />
          <img
            key="01"
            src={`/img/products/${id}/01.jpg`}
            alt="First Thumbnail"
            height="70"
          />
        </picture>,
        <picture>
          <source data-srcSet={`/img/products/${id}/02.webp`} type="image/webp" />
          <img
            key="02"
            src={`/img/products/${id}/02.jpg`}
            alt="Second Thumbnail"
            height="70"
          />
        </picture>,
        <picture>
          <source data-srcSet={`/img/products/${id}/03.webp`} type="image/webp" />
          <img
            key="03"
            src={`/img/products/${id}/03.jpg`}
            alt="Third Thumbnail"
            height="70"
          />
        </picture>
      ]
    } else {
      return [
        <picture>
          <source data-srcSet={`/img/products/${id}/01.webp`} type="image/webp" />
          <img
            key="01"
            src={`/img/products/${id}/01.jpg`}
            alt="First Thumbnail"
            height="70"
          />
        </picture>,
        <picture>
          <source data-srcSet={`/img/products/${id}/02.webp`} type="image/webp" />
          <img
            key="02"
            src={`/img/products/${id}/02.jpg`}
            alt="Second Thumbnail"
            height="70"
          />
        </picture>
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
