import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <a>
        <picture className="logo">
          <source media="(min-width: 600px)" srcSet="/img/logo.webp" type="image/webp" />
          <source media="(min-width: 600px)" srcSet="/img/logo.jpg" type="image/jpeg" />
          <source srcSet="/img/mini-logo.webp" type="image/webp" />
          <img srcSet="/img/mini-logo.jpg" alt="Alimazon logo" />
        </picture>
      </a>
    </Link>
  )
}
