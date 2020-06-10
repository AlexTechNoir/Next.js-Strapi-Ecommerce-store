import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Social() {
  return (
    <div>
      <form>
        Subscribe to the news!
        <label htmlFor="email">
          <input type="email" size="20" id="email" />
          <input type="submit" value="Submit"></input>
        </label>
      </form>
      <div>
        <div>Our social media:</div>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
        </Link>
      </div>
      <div>&#169; 1991 - {new Date().getFullYear()} All rights reserved.</div>
    </div>
  )
}
