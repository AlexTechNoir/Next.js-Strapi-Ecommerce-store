import { Carousel } from 'react-responsive-carousel'
import { SideBySideMagnifier } from 'react-image-magnifiers'

export default function ProductSlider({ images }) {
  return (
    <Carousel
      showStatus={false}
      autoPlay={false}
      transitionTime={500}
      emulateTouch={true}
      showThumbs={false}
    >
      {
        images.map(img => (
          <div key={img.id}>
            <SideBySideMagnifier 
              imageSrc={img.attributes.url}
              imageAlt={img.attributes.alternativeText}
              alwaysInPlace={true}
              fillAvailableSpace={true}
            />
          </div>
        ))
      }
    </Carousel>
  )
}
