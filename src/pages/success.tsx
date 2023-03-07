import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '~/services/stripe'
import { SuccessContainer, ImageContainer } from '~/styles/pages/success'

interface ISuccessProps {
  customerName: string
  product: {
    productName: string
    productImage: string
  }
}

export default function Success({ customerName, product }: ISuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={product.productImage} width={120} height={110} alt="" />
      </ImageContainer>

      <p>
        Uhuul <strong>{customerName}</strong>, sua{' '}
        <strong>{product.productName}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
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
  const product = session?.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName: session.customer_details?.name,
      product: {
        productName: product.name,
        productImage: product.images[0],
      },
    },
  }
}