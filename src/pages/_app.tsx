import type { AppProps } from 'next/app'
import { CartProvider } from 'react-use-cart'

import { Header } from '~/components/Header'
import { ModalCartProvider } from '~/context/ModalCartContext'
import { globalStyles } from '~/styles/global'
import { Container } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ModalCartProvider>
        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </ModalCartProvider>
    </CartProvider>
  )
}
