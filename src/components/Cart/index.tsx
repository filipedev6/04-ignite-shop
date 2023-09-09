import * as Dialog from '@radix-ui/react-dialog';

import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';

import { useCart } from '@/hooks/useCart';
import { X } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

export function Cart() {
  const { cartItems, removeCartItem, cartTotal } = useCart()
  const cartQuantity = cartItems.length
  const formattedTotal = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotal)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleCheckout() {
    setIsCreatingCheckoutSession(true)

    try {

      const response = await axios.post('/api/checkout', {
        products: cartItems
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      alert('Falha ao redirecionar ao checkout')
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton color="gray" size="medium" cartQuantity={cartQuantity} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight='bold' />
          </CartClose>


          <h2>Sacola de compras</h2>

          <section>
            {cartQuantity <= 0 && <p>Parece que seu carrinho está vazio :(</p>}

            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id} >
                <CartProductImage>
                  <Image src={cartItem.imageUrl} width={100} height={93} alt='' />
                </CartProductImage>

                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeCartItem(cartItem.id)}>Remover</button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}</p>
              </div>
              <div>
                <span>Valor total</span>
                <p>{formattedTotal}</p>
              </div>
            </FinalizationDetails>

            <button onClick={handleCheckout} disabled={isCreatingCheckoutSession || cartQuantity <= 0}>Finalizar compra</button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>

    </Dialog.Root >
  )
}