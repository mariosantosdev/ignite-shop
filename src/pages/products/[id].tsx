import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import Stripe from 'stripe'
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
    price: string
    priceId: string
  }
}

export default function Product({ product }: IProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const handleBuyProduct = async () => {
    setIsCreatingCheckoutSession(true)
    try {
      const { data } = await axios.post<{ sessionUrl: string }>(
        '/api/stripe-checkout',
        { priceId: product.priceId },
      )

      window.location.href = data.sessionUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      console.log(err)
      alert('Erro ao comprar o produto')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
          Comprar Agora
        </button>
      </ProductDetails>
    </ProductContainer>
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
        price: formatPrice(price.unit_amount || 0),
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
