import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: ()=> null,
  cartItems: [],
  setCartItems: ()=> null,
  totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addItemToCart = (itemToAdd)=>{
    // find cart item with the same id and increment the quantity
    const existingCartItem = cartItems.find(cartItem=>cartItem.id === itemToAdd.id);
    if(existingCartItem){
      setCartItems(cartItems.map(cartItem=>cartItem.id === itemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem));
    }else{
      setCartItems([...cartItems, {...itemToAdd, quantity: 1}]);
    }
  }
  useEffect(()=>{
    let newCount = 0;
    cartItems.forEach(cartItem=>newCount += cartItem.quantity);
    setTotalQuantity(newCount);
  },[cartItems]);

  const value = {
    isCartOpen, setIsCartOpen, cartItems, addItemToCart, totalQuantity, setCartItems
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
