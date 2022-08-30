import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout.item.component";

const Checkout = () => {
  // checkout is now hooked to CartContext
  const { cartItems, totalPrice } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} cartItem={item} />;
      })}
      <Total>Total: $ {`${totalPrice}`}</Total>
    </CheckoutContainer>
  );
};
export default Checkout;
