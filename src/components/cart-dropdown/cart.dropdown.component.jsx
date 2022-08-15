import "./cart.dropdown.styles.scss";

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
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <div className="child">
          {cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} cartItem={cartItem} />;
          })}
        </div>
      </div>
      <Button onClick={onClick}>Go to Checkout</Button>
    </div>
  );
};

export default CartDropDown;
