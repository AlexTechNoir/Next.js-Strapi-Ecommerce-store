import { useEffect, useContext } from 'react'
import Context from '../../../context'

export default function I18nButtons() {
  const { refreshCurrency } = useContext(Context)

  useEffect(() => {
    const select = document.getElementById('rates')
    select.options.namedItem(JSON.parse(localStorage.currency)).setAttribute('selected', true)
    select.replaceChildren(select.options)
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
          <option id="₽" value="₽">₽ (RUB) Russian Ruble</option>
          <option id="Ch¥" value="Ch¥">¥ (CNY) Chinese Yuan</option>
          <option id="Jp¥" value="Jp¥">¥ (JPY) Japanese Yen</option>
          <option id="₩" value="₩">₩ (KRW) Korean Won</option>
          <option id="₹" value="₹">₹ (INR) Indian Rupee</option>
        </select>
      </div>
      <div>
        Country:
        <select aria-label="Country selection">
          <option value="UK">United Kingdom</option>
          <option value="USA">United States</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Spain">Spain</option>
          <option value="Italy">Italy</option>
          <option value="Russia">Russia</option>
          <option value="China">China</option>
          <option value="Japan">Japan</option>
          <option value="Korea">Korea</option>
          <option value="India">India</option>
        </select>
      </div>
    </div>
  )
}
