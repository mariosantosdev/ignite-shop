import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { useCart } from 'react-use-cart'
import { HeaderWrapper, IconButton } from './styles'

export const Header = () => {
  const { totalItems } = useCart()

  return (
    <HeaderWrapper>
      <Image src="/logo.svg" width="130" height="52" alt="" />

      <IconButton hasItems={Boolean(totalItems)}>
        <Handbag fontWeight="bold" size={24} />
      </IconButton>
    </HeaderWrapper>
  )
}
