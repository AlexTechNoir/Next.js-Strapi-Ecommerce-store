import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import CheckoutCartListItem from '../../components/checkout/cartInfo/CheckoutCartListItem'

export default function CartInfo({ 
  itemsAmountInCart, 
  checkoutCartList, 
  isCurrencySet, 
  currency, 
  currencyRate, 
  tax,
  shippingCost,
  areThereAnyDiscountsInCart,
  totalDiscountedPriceInCart,
  totalPriceInCart
}) { 
  return (
    <CartInfoDiv>
      <h4>
        Cart <span className="edit-cart-link">&#40;<Link href="/cart"><a>edit cart</a></Link>&#41;</span>
        <span className="price">
          <FontAwesomeIcon icon={faShoppingCart} />
          &nbsp;
          <b>{itemsAmountInCart === null ? 0 : itemsAmountInCart}</b>
        </span>
      </h4>
      {
        checkoutCartList.length !== 0 && isCurrencySet
        ? (
          <>
            {checkoutCartList.map(cartListItem => (
              <CheckoutCartListItem 
                key={cartListItem.id} 
                cartListItem={cartListItem} 
                currency={currency} 
                currencyRate={currencyRate} 
              />
            ))}
            <hr />
            <p className="tax">
              Tax 
              <span className="price">
                <b>{currency}&nbsp;{(tax * currencyRate).toFixed(2)}</b>
              </span>
            </p>
            <p className="shipping-cost">
              Shipping cost 
              <span className="price">
                <b>{currency}&nbsp;{(shippingCost * currencyRate).toFixed(2)}</b>
              </span>
            </p>
            <hr />
            <p className="total">
              Total 
              <span className="price">
                <b>
                  {currency}
                  &nbsp;
                  {
                    (
                      Number(areThereAnyDiscountsInCart ? totalDiscountedPriceInCart : totalPriceInCart)
                      + Number(tax * currencyRate)
                      + Number(shippingCost * currencyRate)
                    ).toFixed(2)                
                  }
                </b>
              </span>
            </p>
          </>
        ) : (
          <div className="loader"></div>
        )
      }
    </CartInfoDiv>
  )
}

const CartInfoDiv = styled.div`
  grid-area: 2 / 2 / 4 / 3;
  background-color: #f2f2f2;
  padding: 15px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  align-self: start;
  > h4 {
    margin-bottom: 1em;
    > .edit-cart-link {
      font-size: 14px;        
    }
    > .price {
      float: right;
      color: black;
    }
  } 
  > s, > p {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 135px 40px auto;
    > .product-link {
      width: 135px;
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis; 
    }
  }
  > s {
    position: relative;
    margin-bottom: 1rem;
    > .out-of-stock-text {
      position: absolute;
      top: 0px;
      left: 100px;
      transform: rotate(14deg);
    }
  }
  > .checkout-cart-list-item {
    > .selected-amount, > .price {
      justify-self: end;
    }
  } 
  > .tax, > .shipping-cost, > .total {
    > .price {
      grid-area: 1 / 3 / 2 / 4;
      justify-self: end;
    }
  }

  @media only screen and (max-width: 710px) {
    grid-area: 3 / 1 / 4 / 2;
    > s > .out-of-stock-text {
      left: 120px;
    }
  }
`
