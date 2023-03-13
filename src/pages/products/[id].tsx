import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { useModalCart } from '~/context/ModalCartContext'
import { stripe } from '~/services/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '~/styles/pages/product'
import { formatPrice } from '~/utils/formatter'

interface IProductProps {
  product: {
    id: string
    name: string
    imageUrl: string[0]
    description: string
    price: number
    formatedPrice: string
    priceId: string
  }
}

export default function Product({ product }: IProductProps) {
  const { addItem } = useModalCart()

  return (
    <>
      <Head>
        <title>Ignite Shop - {product.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formatedPrice}</span>

          <p>{product.description}</p>

          <button onClick={() => addItem({ ...product }, 1)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await stripe.products.list({ limit: 3 })

  const paths = products.data.map((product) => ({
    params: { id: product.id },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const id = params!.id
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  })
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: price.unit_amount,
        formatedPrice: formatPrice(price.unit_amount || 0),
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
