import React from 'react'

export default function I18nButtons() {
  return (
    <div>
      <div>
        Language:
        <select>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Française</option>
          <option value="es">Español</option>
          <option value="it">Italiano</option>
          <option value="ru">Русский</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>
      <div>
        Currency:
        <select>
          <option value="€">€ (EUR) Euro</option>
          <option value="$">$ (USD) U.S. Dollar</option>
          <option value="₽">₽ (RUB) Russian Ruble</option>
          <option value="Ch¥">¥ (CNY) Chinese Yuan</option>
          <option value="Jp¥">¥ (JPY) Japanese Yen</option>
          <option value="₩">₩ (KRW) Korean Won</option>
          <option value="₹">₹ (INR) Indian Rupee</option>
        </select>
      </div>
      <div>
        Country:
        <select>
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
