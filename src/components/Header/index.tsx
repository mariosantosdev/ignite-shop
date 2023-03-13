import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { HeaderWrapper, IconButton } from './styles'

export const Header = () => {
  return (
    <HeaderWrapper>
      <Image src="/logo.svg" width="130" height="52" alt="" />

      <IconButton>
        <Handbag fontWeight="bold" size={24} />
      </IconButton>
    </HeaderWrapper>
  )
}
