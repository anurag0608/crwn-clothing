import {CartDropdownContainer, CartItems, Child} from "./cart.dropdown.styles.jsx";

import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart.item.component";

const CartDropDown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const onClick = (e)=>{
    e.preventDefault();
    setIsCartOpen(false);
    navigate('/checkout');
  }
  return (
    <CartDropdownContainer>
      <CartItems>
        <Child>
          {cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} cartItem={cartItem} />;
          })}
        </Child>
      </CartItems>
      <Button onClick={onClick}>Go to Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropDown;
