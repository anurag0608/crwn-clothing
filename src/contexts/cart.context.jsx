import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./user.context";

import { updateCollectionAndDocuments } from "../utils/firebase/firebase.util";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: ()=> null,
  cartItems: [],
  setCartItems: ()=> null,
  removeItemFromCart: ()=> null,
  clearItemFromCart: ()=> null,
  totalQuantity: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const { currentUser, currentUserCartItems } = useContext(UserContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
 
  useEffect(()=>{
    setCartItems(currentUserCartItems);
  },[currentUserCartItems])

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
    (async()=>{
      if(currentUser){
        // update user document in firestore
        await updateCollectionAndDocuments('users', currentUser.uid, {cartItems});
      }
    })();
  },[cartItems])
  const removeItemFromCart = (itemToRemove)=>{
    // find cart item with the same id and decrement the quantity
    const existingCartItem = cartItems.find(cartItem=>cartItem.id === itemToRemove.id);
    if(existingCartItem.quantity > 1){
      setCartItems(cartItems.map(cartItem=>cartItem.id === itemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem));
    }else{
      setCartItems(cartItems.filter(cartItem=>cartItem.id !== itemToRemove.id));
    }
  }
  const clearItemFromCart = (itemToRemove)=>{ // remove all items from cart with a specific id
    setCartItems(cartItems.filter(cartItem=>cartItem.id !== itemToRemove.id));
  }
  // for calculating the total quantity
  useEffect(()=>{
      let newCount = 0;
      cartItems.forEach(cartItem=>newCount += cartItem.quantity);
      setTotalQuantity(newCount);
  },[cartItems]);

  // for calculating the total price
  useEffect(()=>{
      let newTotal = cartItems.reduce((acc, cartItem)=>acc + cartItem.price * cartItem.quantity, 0)
      setTotalPrice(newTotal.toPrecision(4));
  },[cartItems]);

  const value = {
    isCartOpen, setIsCartOpen, cartItems, addItemToCart, totalQuantity, removeItemFromCart, clearItemFromCart, totalPrice, setCartItems
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
