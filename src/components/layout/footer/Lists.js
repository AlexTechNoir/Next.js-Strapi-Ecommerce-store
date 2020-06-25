import React from 'react'
import Link from 'next/link'

export default function Lists() {
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          <Link href="/about"><a className="nav-link">About Us</a></Link>
        </li>
        <li className="list-group-item">
          <Link href="/contact-us"><a className="nav-link">Contact Us</a></Link>
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
      <ul className="list-group">
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
