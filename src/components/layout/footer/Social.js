import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Social() {
  return (
    <div className="social">
      <form>          
        <label htmlFor="email">Subscribe to the news!</label>
        <br />
        <input type="email" size="20" id="email" />
        <input type="submit" value="Submit"></input>
      </form>
      <div className="social-media-links">
        <div>Our social media:</div>
        <Link href="/#">
          <a aria-label="Facebook icon link"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a aria-label="Twitter icon link"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a aria-label="Instagram icon link"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a aria-label="YouTube icon link"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
        </Link>
        <Link href="/#">
          <a aria-label="LinkedIn icon link"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
        </Link>
      </div>
      <div>&#169; 1991 - {new Date().getFullYear()} All rights reserved.</div>
    </div>
  )
}
