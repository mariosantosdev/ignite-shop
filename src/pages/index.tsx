import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '~/styles/pages/home'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product href="/product" className="keen-slider__slide">
        <Image src="/shirts/1.png" width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product href="/product" className="keen-slider__slide">
        <Image src="/shirts/2.png" width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 2</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product href="/product" className="keen-slider__slide">
        <Image src="/shirts/3.png" width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product href="/product" className="keen-slider__slide">
        <Image src="/shirts/4.png" width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 4</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
