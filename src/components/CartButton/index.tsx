import { ComponentProps } from "@stitches/react";
import { CartButtonContainer } from "./styles";

import { Handbag } from '@phosphor-icons/react';

type CartButtonProps = ComponentProps<typeof CartButtonContainer> & {
  cartQuantity: number
}

export function CartButton({ cartQuantity, ...rest }: CartButtonProps) {
  const carQuantityLength = cartQuantity >= 1

  return (
    <CartButtonContainer {...rest}>
      <Handbag weight="bold" />
      {carQuantityLength && <span>{cartQuantity}</span>}
    </CartButtonContainer>
  )
}