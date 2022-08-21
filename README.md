# Next.js Strapi E-Commerce Store
## [Dependencies](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/package.json#L10), 3rd party [links](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/_document.js#L34) and [scripts](https://github.com/AlexTechNoir/Next.js-Strapi-Ecommerce-store/blob/master/src/pages/_app.js#L230)

## Features

- built with Next.js 11 and Strapi 4
- code deployed on Vercel, HCMS uses PostgreSQL and deployed on Heroku, images stored on Cloudinary

- guest shopping cart
- guest checkout
- no authentication (auth buttons just for show)
- checkout form data is saved between page reloads
- product search
- slider with magnifying glass
- currency change (3 available)
- discounts
- product reviews
- Google Analytics
- simple cookie banner
- pagination
- available item amount checks ("out-of-stock" and "less than selected")
- PayPal checkout button (fake payments)
- email with order info is sent after fake transaction

## Code examples:

!Many links might be broken for now, soon I'll fix them!

- [styled-components](https://github.com/styled-components/styled-components) (examples: [global style](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/Layout.js#L92), [ususal style](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/index.js#L69))
- [Bootstrap 4](https://getbootstrap.com/) - mainly for ready-made buttons and forms
- [React Font Awesome](https://github.com/FortAwesome/react-fontawesome) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/layout/footer/Social.js#L16))
- [React Context](https://reactjs.org/docs/context.html) (example: [1](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/context/cartContext.js), [2](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/_app.js#L89))
- [React Draft WYSIWYG](https://github.com/jpuri/react-draft-wysiwyg) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/Reviews.js#L108)) with [draftjs-to-html](https://github.com/jpuri/draftjs-to-html) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/Reviews.js#L47)) and [html-to-draftjs](https://github.com/jpuri/html-to-draftjs) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/Reviews.js#L36))
- [React Responsive Carousel](https://github.com/leandrowd/react-responsive-carousel) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/ProductSlider.js#L63))
- [react-image-magnifiers](https://github.com/AdamRisberg/react-image-magnifiers) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/ProductSlider.js#L75))
- [react-paginate](https://github.com/AdeleD/react-paginate) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/products/mobile-phones/%5Bpage%5D.js#L66))
- [Formik](https://github.com/formik/formik) - just to learn it ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/layout/authForm/Registration.js#L7))
- [SWR](https://github.com/vercel/swr) (examples: [classic](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/search/%5Bvalue%5D.js#L16), [with SSR](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/products/mobile-phones/%5Bpage%5D.js#L31))
- [PayPal Checkout Button](https://developer.paypal.com/docs/checkout/#) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/cart/cartList/PayPalCheckoutButton.js))


## Info about where Context data goes (from pages/_app.js):

<details>
  <summary>Show/hide</summary>
  <br>

  `areCookiesAccepted` goes to:

  - components/Layout.js

  `setAreCookiesAccepted` goes to:

  - components/Layout.js
  - components/layout/CookieBanner.js (as props from components/Layout.js)

  `cartBadgeToggle` goes to:

  - components/layout/header/CartButton.js
  - components/productPage/AddToCart.js
  - components/cart/CartList.js
  - components/cart/cartList/CartListItem.js (as props from components/cart/CartList.js)
  - components/checkout/PayPalCheckoutButton.js

  `setCartBadgeToggle` goes to: 

  - components/productPage/AddToCart.js
  - components/cart/CartList.js
  - components/cart/cartList/CartListItem.js (as props from components/cart/CartList.js)
  - components/checkout/PayPalCheckoutButton.js

  `itemsAmountInCart` goes to:

  - pages/cart.js
  - pages/checkout.js
  - pages/checkout/CartInfo.js (as props from pages/checkout.js)

  `cartList` goes to:

  - components/cart/CartList.js
  - pages/checkout.js

  `setCartList` goes to:

  - components/checkout/PayPalCheckoutButton.js

  `totalPriceInCart`, `totalDiscountedPriceInCart` and `areThereAnyDiscountsInCart` go to:

  - components/cart/CartList.js
  - pages/checkout.js
  - pages/checkout/CartInfo.js (as props from pages/checkout.js)

  `assignProductAmountInCart` goes to:

  - pages/cart.js
  - components/cart/CartList.js (as props from pages/cart.js)
  - components/cart/cartList/CartListItem.js(as props from components/cart/CartList.js)
  - pages/checkout.js
  - components/checkout/PayPalCheckoutButton.js (as props from pages/checkout.js)

  `estimateTotalPrice` goes to:

  - components/cart/CartList.js
  - components/cart/cartList/CartListItem.js (as props from components/cart/CartList.js)
  - pages/checkout.js

  `currency` goes to:

  - components/ProductListItem.js
  - components/SearchResult.js
  - components/product/productPage/ProductInfo.js
  - components/cart/CartList.js
  - components/cart/cartList/CartListItem.js (as props from components/cart/CartList.js)
  - pages/checkout.js
  - pages/checkout/CartInfo.js (as props from pages/checkout.js)
  - pages/checkout/cartInfo/CheckoutCartListItem.js (as props from pages/checkout/CartInfo.js)
  - pages/checkout/PayPalCheckoutButton.js (as props from pages/checkout.js)

  `currencyCode` goes to:

  - pages/checkout.js
  - pages/checkout/PayPalCheckoutButton.js (as props from pages/checkout.js)

  `currencyRate` goes to:

  - components/ProductListItem.js
  - components/SearchResult.js
  - components/product/productPage/ProductInfo.js
  - components/cart/CartList.js
  - pages/checkout.js
  - pages/checkout/CartInfo.js (as props from pages/checkout.js)
  - pages/checkout/cartInfo/CheckoutCartListItem.js (as props from pages/checkout/CartInfo.js)
  - pages/checkout/PayPalCheckoutButton.js (as props from pages/checkout.js)

  `isCurrencySet` goes to:

  - components/ProductListItem.js
  - components/SearchResult.js
  - components/product/productPage/ProductInfo.js
  - components/cart/CartList.js
  - pages/checkout.js
  - pages/checkout/CartInfo.js (as props from pages/checkout.js)

  `refreshCurrency` goes to:

  - components/layout/footer/Buttons.js

  `setItemsAmountInCart`, `setTotalPriceInCart`, `setTotalDiscountedPriceInCart`, `fetchedRates`, `setFetchedRates`, `setCurrency`, `setCurrencyCode`, `setCurrencyRate`, `setIsCurrencySet`, `setCurrencyCodes` and `setCurrencyCodes` stay in pages/_app.js
</details>

## Notes:

- html-to-draftjs library is deliberately downgraded to 1.4.0 to avoid bug (see [issue #78](https://github.com/jpuri/html-to-draftjs/issues/78))
