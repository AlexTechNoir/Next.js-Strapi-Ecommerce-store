# Next.js E-Commerce Store

Fully responsive mobile first demo website. Rewritten from [React CRA app](https://github.com/AlexTechNoir/react_e-commerce_online_store).

## [Dependencies](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/package.json#L10)

## [Scripts and CDN links](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/_document.js#L34)

## What can you do in this demo:

- browse products
- add/edit/delete products in cart
- use sliders and magnifying glass
- write/edit/delete reviews in Rich Text Editor and Facebook comments
- search for products
- make fake payments
- change currency (7 avaliable)

## What did I use to make this demo:

- [Create Next App](https://nextjs.org/docs/getting-started#setup)
- [styled-components](https://github.com/styled-components/styled-components) (examples: [global style](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/Layout.js#L92), [ususal style](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/index.js#L69))
- [Bootstrap 4](https://getbootstrap.com/) - mainly for ready-made buttons and forms
- [React Font Awesome](https://github.com/FortAwesome/react-fontawesome) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/layout/footer/Social.js#L16))
- [React Context](https://reactjs.org/docs/context.html) (example: [1](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/context/cartContext.js), [2](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/_app.js#L89))
- [React Draft WYSIWYG](https://github.com/jpuri/react-draft-wysiwyg) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/Reviews.js#L108)) with [draftjs-to-html](https://github.com/jpuri/draftjs-to-html) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/Reviews.js#L47)) and [html-to-draftjs](https://github.com/jpuri/html-to-draftjs) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/Reviews.js#L36))
- [React Responsive Carousel](https://github.com/leandrowd/react-responsive-carousel) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/ProductSlider.js#L63))
- [react-image-magnifiers](https://github.com/AdamRisberg/react-image-magnifiers) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/ProductSlider.js#L75))
- [react-paginate](https://github.com/AdeleD/react-paginate) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/products/mobile-phones/%5Bpage%5D.js#L66))
- [React Rating](https://github.com/dreyescat/react-rating) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/ProductInfo.js#L68))
- [Formik](https://github.com/formik/formik) - just to learn it ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/layout/authForm/Registration.js#L7))
- [SWR](https://github.com/vercel/swr) (examples: [classic](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/search/%5Bvalue%5D.js#L16), [with SSR](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/pages/products/mobile-phones/%5Bpage%5D.js#L31))
- [Facebook Comments plugin](https://developers.facebook.com/docs/plugins/comments/) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/productPage/Comments.js))
- [PayPal Checkout Button](https://developer.paypal.com/docs/checkout/#) ([example](https://github.com/AlexTechNoir/Next.js-e-commerce-online-store/blob/master/src/components/cart/cartList/PayPalCheckoutButton.js))

## Features:

- fully responsive, mobile first
- universal, serverless 
- no user registration
- global state managed with React Context
- state persisted with Local Storage
- API Routes

## Notes:

- API Routes are made for sake of learning and imitating real-life app, so some network requests might be irrelevant, since data stored in Local Storage
- html-to-draftjs library is deliberately downgraded to 1.4.0 to avoid bug (see [issue #78](https://github.com/jpuri/html-to-draftjs/issues/78))
- I wanted to implement i18n, like with [React CRA version](https://github.com/AlexTechNoir/react_e-commerce_online_store) of this app, however I encountered with some difficulties. As I understood, mainly there are 2 i18n libs for Next.js: [next-i18next](https://github.com/isaachinman/next-i18next) and [next-translate](https://github.com/vinissimus/next-translate). Next-i18next currently doesn't support serverless (see [issue #274](https://github.com/isaachinman/next-i18next/issues/274)), thought I saw a [comment](https://github.com/isaachinman/next-i18next/issues/729#issuecomment-637436767) of owner that beta version does, but I couldn't find a code example in docs. Next-translate doesn't wrap _app.js (see [issue #44](https://github.com/vinissimus/next-translate/issues/44)), even if that file doesn't need translation
