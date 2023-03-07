import Image from 'next/image'
import { HeaderWrapper } from './styles'

export const Header = () => {
  return (
    <HeaderWrapper>
      <Image src="/logo.svg" width="130" height="52" alt="" />
    </HeaderWrapper>
  )
}
