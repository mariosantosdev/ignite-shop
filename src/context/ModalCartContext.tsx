import { createContext, ReactNode, useContext, useState } from 'react'
import { useCart as useControlledCart } from 'react-use-cart'
import { CartModal } from '~/components/CartModal'

type ControlledCard = ReturnType<typeof useControlledCart>

interface ModalCartContextData extends ControlledCard {
  openCartModal: () => void
  closeCartModal: () => void
}

interface ModalCartProviderProps {
  children: ReactNode
}

export const ModalCartContext = createContext({} as ModalCartContextData)

export const ModalCartProvider = ({ children }: ModalCartProviderProps) => {
  const [showCartModal, setShowCartModal] = useState(false)
  const controlledCard = useControlledCart()

  const openCartModal = () => setShowCartModal(true)
  const closeCartModal = () => setShowCartModal(false)

  return (
    <ModalCartContext.Provider
      value={{ ...controlledCard, openCartModal, closeCartModal }}
    >
      <CartModal isOpen={showCartModal} onClose={closeCartModal} />
      {children}
    </ModalCartContext.Provider>
  )
}

export const useModalCart = () => useContext(ModalCartContext)
