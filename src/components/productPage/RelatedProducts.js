import styled from 'styled-components'

import RelatedProduct from '../../components/productPage/relatedProduct/relatedProduct'

export default function RelatedProducts({ relatedProducts }) {
  return (
    <RelatedProductsSection relatedProducts={relatedProducts}>
      <h2>You might also like</h2>
      <div className="related-products-list">
        {
          relatedProducts.map(i => <RelatedProduct key={i.id} i={i} />)
        }
      </div>
    </RelatedProductsSection>
  )
}

const RelatedProductsSection = styled.section`
  grid-area: 5 / 1 / 6 / 3; 
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0 16px 0; 
  width: 100%;
  > .related-products-list {
    overflow-y: auto; 
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, 250px);
    grid-template-rows: auto;
    justify-content: center;
    overflow-x: hidden;
    margin: 16px 0 16px 0;
    padding: 16px 0 16px 0;
    width: 800px; 
    position: relative;
  }
  
  @media only screen and (max-width: 820px) {
    > .related-products-list {
      grid-template-columns: 10px repeat(${props => props.relatedProducts.length}, 260px) 10px;
      overflow-x: auto;
      width: 100%;
      justify-content: start;
      &:before, :after {
        content: '';
      }
    }
  }
`
