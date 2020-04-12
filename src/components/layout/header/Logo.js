import React from 'react'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <picture>
        <source media="(min-width: 600px)" srcSet="/img/logo.webp" />
        <img src="/img/mini-logo.webp" alt="logo" />
      </picture>
    </Link>
  )
}
