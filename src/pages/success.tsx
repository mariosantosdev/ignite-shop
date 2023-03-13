import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '~/services/stripe'
import {
  SuccessContainer,
  ImageContainer,
  ProductsImage,
} from '~/styles/pages/success'

interface ISuccessProps {
  customerName: string
  products: Array<{
    productName: string
    productImage: string
  }>
}

export default function Success({ customerName, products }: ISuccessProps) {
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ProductsImage>
          {products.slice(0, 3).map((product, index) => (
            <ImageContainer key={product.productName} style={{ zIndex: index }}>
              <Image
                src={product.productImage}
                width={120}
                height={110}
                alt=""
              />
            </ImageContainer>
          ))}
        </ProductsImage>

        <h1>Compra efetuada!</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{products.length} itens</strong> já está a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })
  const products = session?.line_items?.data.map((lineItem) => {
    const product = lineItem.price?.product as Stripe.Product

    return {
      productName: product.name,
      productImage: product.images[0],
    }
  })

  return {
    props: {
      customerName: session.customer_details?.name,
      products,
    },
  }
}
