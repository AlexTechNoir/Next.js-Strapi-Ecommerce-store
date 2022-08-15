import { useEffect, useContext } from 'react'
import CurrencyContext from '../../../context/currencyContext'

export default function I18nButtons() {
  const { refreshCurrency } = useContext(CurrencyContext)

  useEffect(() => {
    const select = document.getElementById('rates')
    select.options.namedItem(
      localStorage.getItem('currency') !== null 
      ? JSON.parse(localStorage.currency)
      : '$'
    ).selected = 'selected'
  }, [])

  const changeCurrency = e => {
    const selectedCurrency = e.target.value
    localStorage.setItem('currency', JSON.stringify(selectedCurrency))
    refreshCurrency()
  }

  return (
    <div>
      <div>
        Currency:
        <select id="rates" aria-label="Currency selection" onChange={e => changeCurrency(e)}>
          <option id="$" value="$">$ (USD) U.S. Dollar</option>
          <option id="€" value="€">€ (EUR) Euro</option>
          <option id="£" value="£">£ (GBP) British Pound</option>
        </select>
      </div>
      <div>
        Country:
        <select aria-label="Country selection">
          <option value="UK">United Kingdom</option>
          <option value="USA">United States</option>
        </select>
      </div>
    </div>
  )
}
