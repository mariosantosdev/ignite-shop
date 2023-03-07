import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '~/styles/pages/home'
import { GetStaticProps } from 'next'
import { stripe } from '~/services/stripe'
import Stripe from 'stripe'
import { formatPrice } from '~/utils/formatter'

interface IHomeProducts {
  products: Array<{
    id: string
    name: string
    imageUrl: string
    price: number
    formatedPrice: string
  }>
}

export default function Home({ products }: IHomeProducts) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product
          key={product.id}
          href={`/products/${product.id}`}
          className="keen-slider__slide"
        >
          <Image src={product.imageUrl} width={520} height={480} alt="" />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.formatedPrice}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data: rawProducts } = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = rawProducts.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      formatedPrice: formatPrice(price.unit_amount || 0),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
