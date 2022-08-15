import Link from 'next/link'
import styled from 'styled-components'

export default function CheckoutCartListItem({ cartListItem, currency, currencyRate }) {
  const id = cartListItem.id
  const attributes = cartListItem.attributes
  const selectedAmount = cartListItem.selectedAmount

  const available = attributes.available
  const discount = attributes.discount.data

  let discountMultiplier = discount !== null ? discount.attributes.discountMultiplier : 1

  const isSelectedGreaterThanAvailable = available !== 0 && selectedAmount > available

  // DRY JSX
  const content = (
    <>
      <Link href={`/product-page/${id}`}>
        <a className="product-link">{attributes.title}</a>
      </Link>
      <span className="selected-amount">
        &times;{available !== 0 && selectedAmount > available ? 0 : selectedAmount}
      </span>
      <span className="price">
        {currency}
        &nbsp;
        {
          available !== 0 && selectedAmount > available
          ? (0).toFixed(2)
          : (((attributes.price * currencyRate) * discountMultiplier) * selectedAmount).toFixed(2)
        }
      </span>
    </>
  )

  if (available <= 0) {
    return (
      <s key={id} className="checkout-cart-list-item">
        {content}
        <h6 className="out-of-stock-text text-danger">
          <b>OUT OF STOCK!</b>
        </h6>
      </s>
    )
  } else {
    return (
      <ItemP 
        key={id} 
        isSelectedGreaterThanAvailable={isSelectedGreaterThanAvailable} 
        className="checkout-cart-list-item"
      >
        {content}
      </ItemP>
    )
  }
}

const ItemP = styled.p`
  color: ${props => props.isSelectedGreaterThanAvailable ? '#dc3545' : 'black'};
`
