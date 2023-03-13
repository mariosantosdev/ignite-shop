import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { Handbag } from 'phosphor-react'

import { HomeContainer, Product } from '~/styles/pages/home'
import { GetStaticProps } from 'next'
import { stripe } from '~/services/stripe'
import Stripe from 'stripe'
import { formatPrice } from '~/utils/formatter'
import Head from 'next/head'
import { useModalCart } from '~/context/ModalCartContext'
import Link from 'next/link'

interface IHomeProducts {
  products: Array<{
    id: string
    name: string
    imageUrl: string
    price: number
    priceId: string
    formatedPrice: string
  }>
}

export default function Home({ products }: IHomeProducts) {
  const { addItem } = useModalCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <Link href={`/products/${product.id}`}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />
            </Link>

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.formatedPrice}</span>
              </div>

              <button onClick={() => addItem({ ...product }, 1)}>
                <Handbag fontWeight="bold" size={24} />
              </button>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
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
      priceId: price.id,
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
