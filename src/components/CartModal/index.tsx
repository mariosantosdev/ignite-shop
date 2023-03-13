import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { useModalCart } from '~/context/ModalCartContext'
import { formatPrice } from '~/utils/formatter'
import {
  Content,
  Head,
  contentClass,
  overlayClass,
  Footer,
  ListInfo,
  ItemInfo,
  Product,
} from './styles'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

Modal.setAppElement('#__next')

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, totalItems, cartTotal, emptyCart } = useModalCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const handleBuyProduct = async () => {
    setIsCreatingCheckoutSession(true)
    try {
      const { data } = await axios.post<{ sessionUrl: string }>(
        '/api/stripe-checkout',
        {
          products: items.map((item) => ({
            priceId: item.priceId,
            quantity: item.quantity,
          })),
        },
      )

      emptyCart()
      window.location.href = data.sessionUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      console.log(err)
      alert('Erro ao comprar o produto')
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Carrinho de compras"
      onRequestClose={onClose}
      overlayClassName={overlayClass().className}
      className={contentClass().className}
    >
      <Head>
        <button aria-label="Fechar" onClick={onClose}>
          <X fontWeight="bold" size={24} />
        </button>
        <h2>Sacola de compras</h2>
      </Head>

      <Content>
        {items.map((item) => (
          <Product key={item.id}>
            <Image src={item.imageUrl} alt="Produto" width={88} height={88} />

            <div>
              <h3>{item.name}</h3>
              <span>
                {formatPrice(item.price)} - qtd. {item.quantity}
              </span>
              <button onClick={() => removeItem(item.id)}>Remover</button>
            </div>
          </Product>
        ))}
      </Content>

      <Footer>
        <ListInfo>
          <ItemInfo>
            <span>Quantidade</span>
            <span>{totalItems}</span>
          </ItemInfo>
          <ItemInfo type="total">
            <span>Valor total</span>
            <span>{formatPrice(cartTotal)}</span>
          </ItemInfo>
        </ListInfo>

        <button
          onClick={handleBuyProduct}
          disabled={items.length <= 0 || isCreatingCheckoutSession}
        >
          Finalizar compra
        </button>
      </Footer>
    </Modal>
  )
}
