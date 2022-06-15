import ProductListItem from '../ProductListItem'

export default function FeaturedProducts({ items }) {
  return (
    <>
      <h1 className="best-offers-heading">Best Offers</h1>
      <div className="best-offers-products">
        {items.map(item => <ProductListItem key={item.id} item={item} />)}
      </div>
    </>
  )
}
