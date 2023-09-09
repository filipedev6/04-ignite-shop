import { ReactNode, createContext, useState } from "react";

export interface IProduct {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

interface CartContextTypes {
  cartTotal: number
  cartItems: IProduct[]
  addToCart: (product: IProduct) => void
  checkItemAlreadyExists: (productId: string) => boolean
  removeCartItem: (productId: string) => void
}

export const CartContext = createContext({} as CartContextTypes)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([])

  const cartTotal = cartItems.reduce((total, product) => {
    return total += product.numberPrice
  }, 0)

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product])
  }

  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((product) => product.id !== productId))
  }

  function checkItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, checkItemAlreadyExists, removeCartItem, cartTotal }}>{children}</CartContext.Provider>
  )
}