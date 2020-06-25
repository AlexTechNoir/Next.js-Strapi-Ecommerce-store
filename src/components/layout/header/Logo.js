import React from 'react'
import Link from 'next/link'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

export default function Logo() {
  return (
    <Link href="/">
      <picture>
        <source media="(min-width: 600px)" srcSet="/img/logo.webp" />
        <img data-src="/img/mini-logo.webp" alt="logo" className="lazyload" />
      </picture>
    </Link>
  )
}
