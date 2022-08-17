import Link from 'next/link'

export default function Lists({ showCookieBanner }) {
  return (
    <>
      <ul className="first-and-second-lists first-list list-group">
        <li className="list-group-item">
          <Link href="/about"><a className="nav-link">About Us</a></Link>
        </li>
        <li className="list-group-item">
          <Link href="/contact-us"><a className="nav-link">Contact Us</a></Link>
        </li>
        <li className="list-group-item" onClick={showCookieBanner}>
          <a href="/#" className="nav-link">Cookie consent</a>
        </li>
        <li className="list-group-item">
          <a href="/#" className="nav-link">Lorem ipsum sin amet</a>
        </li>
        <li className="list-group-item">
          <a href="/#" className="nav-link">Lorem ipsum sin amet</a>
        </li>
      </ul>
      <ul className="first-and-second-lists second-list list-group">
        <li className="list-group-item">
          <a href="/#" className="nav-link">Lorem ipsum sin amet</a>
        </li>
        <li className="list-group-item">
          <a href="/#" className="nav-link">Lorem ipsum sin amet</a>
        </li>
        <li className="list-group-item">
          <a href="/#" className="nav-link">Lorem ipsum sin amet</a>
        </li>
        <li className="list-group-item">
          <a href="/#" className="nav-link">Lorem ipsum sin amet</a>
        </li>
        <li className="list-group-item">
          <a href="/#" className="nav-link">Lorem ipsum sin amet</a>
        </li>
      </ul>
    </>
  )
}
