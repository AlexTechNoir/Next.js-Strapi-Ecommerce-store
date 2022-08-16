import Link from 'next/link'
import styled from 'styled-components'

export default function relatedProduct({ i }) {

  const attributes = i.attributes

  const title = attributes.title
  const imgs = attributes.image.data
  const img = imgs.filter(i => i.attributes.name === "01.jpg")
  const imgUrl = img[0].attributes.url

  return (
    <RelatedProduct>
      <Link href={`/product-page/${i.id}`}>
        <a className="link">
          <img alt={title} src={imgUrl} width={200} height={200} className="image" />
          <br />
          <div className="title">{title}</div>
        </a>
      </Link>
    </RelatedProduct>
  )
}

const RelatedProduct = styled.div`
  width: auto;
  height: auto;
  border-radius: 10px;
  &:hover {
    box-shadow: .1rem .1rem 1rem .1rem rgba(0,0,0,.3);
    text-decoration: none;
  }
  > .link {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    color: #343a40;
    &:hover {
      text-decoration: none;
    }
    > .image {
      align-self: center;
    }
    > .title {
      font-size: 1.5rem;
    }
  }
`
