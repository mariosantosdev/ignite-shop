import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { useModalCart } from '~/context/ModalCartContext'
import { HeaderWrapper, IconButton } from './styles'

export const Header = () => {
  const { totalItems, openCartModal } = useModalCart()

  return (
    <HeaderWrapper>
      <Image src="/logo.svg" width="130" height="52" alt="" />

      <IconButton hasItems={Boolean(totalItems)} onClick={openCartModal}>
        <Handbag fontWeight="bold" size={24} />
      </IconButton>
    </HeaderWrapper>
  )
}
