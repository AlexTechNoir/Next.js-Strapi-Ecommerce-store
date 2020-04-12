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
          <a><FontAwesomeIcon icon={faFacebook} width="2em" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faTwitter} width="2em" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faInstagram} width="2em" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faYoutube} width="2em" /></a>
        </Link>
        <Link href="/#">
          <a><FontAwesomeIcon icon={faLinkedin} width="2em" /></a>
        </Link>
      </div>
      <div>&#169; 1991 - {new Date().getFullYear()} All rights reserved.</div>
    </div>
  )
}
