import React from 'react'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <picture>
        <source media="(min-width: 600px)" srcSet="/img/logo.webp" type="image/webp" />
        <source media="(min-width: 600px)" srcSet="/img/logo.jpg" type="image/jpeg" />
        <source srcSet="/img/mini-logo.webp" type="image/webp" />
        <img srcSet="/img/mini-logo.jpg" alt="Alimazon logo" />
      </picture>
    </Link>
  )
}
