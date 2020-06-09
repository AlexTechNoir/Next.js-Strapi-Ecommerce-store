import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />

          {/* Bootstrap */}
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>

          {/* Google Font */}
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>

          {/* React Responsive Carousel Styles */}
          <link rel="stylesheet" href="carousel.css" />
        </Head>
        <body>
          {/* Facebook Comments Plugin */}
          <div id="fb-root"></div>
          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0&appId=660669431380946"></script>

          {/* PayPal Checkout */}
          <script async src="https://www.paypal.com/sdk/js?client-id=Adrrm9v8CMsKKDnZ4csRq6wdZ245iCGET2k9RiE78vTgtVewM1Cl6MDcwonotjEgmv27vc4733phc21X&currency=USD"></script>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument