import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import logoImg from '@/assets/logo.svg'
import { ButtonCheckout, Container, Header } from '@/styles/pages/app'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from '@phosphor-icons/react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg.src} alt="" width={130} height={52} />
        </Link>

        <ButtonCheckout>
          <ShoppingBag />
        </ButtonCheckout>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
