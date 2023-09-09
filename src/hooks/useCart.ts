import { CartContext } from '@/context/CartContext'
import { useContext } from 'react'

export function useCart() {
  return useContext(CartContext)
}