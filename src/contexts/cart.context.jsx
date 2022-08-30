import { createContext, useEffect, useContext, useReducer } from "react";
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
export const CART_ACTION_TYPES = {
  TOGGLE_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}
// reducers should be compact
const cartReducer = (state, action)=>{
  const {type, payload} = action;
  
  switch(type){
    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return{
        ...state,
        isCartOpen: !state.isCartOpen
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return{
        ...state,
        ...payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}
export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
}
export const CartProvider = ({ children }) => {
  const { currentUser, currentUserCartItems } = useContext(UserContext);
 
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const {isCartOpen, cartItems, totalPrice, totalQuantity} = state;

  const updateCartItemsReducer = (newCartItems)=>{
    // this reducer funtion is now updating 3 state at once as compared to one using useState hook
    const newCount = newCartItems.reduce((acc, cartItem)=> acc+cartItem.quantity, 0);
    const newTotal = (newCartItems.reduce((acc, cartItem)=>acc + cartItem.price * cartItem.quantity, 0)).toPrecision(4)

    dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload:{
      totalQuantity: newCount,
      totalPrice: newTotal,
      cartItems: newCartItems
    }})
  }
  const addItemToCart = (itemToAdd)=>{
    const existingCartItem = cartItems.find(cartItem=>cartItem.id === itemToAdd.id);
    let newCartItems = []
    if(existingCartItem){
      newCartItems = cartItems.map(cartItem=>cartItem.id === itemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }else{
      newCartItems = [...cartItems, {...itemToAdd, quantity: 1}];
    }
    updateCartItemsReducer(newCartItems)
  }
  const setCartItems = (cartItemsToBeAdded)=>{
    updateCartItemsReducer(cartItemsToBeAdded);
  }
  const removeItemFromCart = (itemToRemove)=>{
    const existingCartItem = cartItems.find(cartItem=>cartItem.id === itemToRemove.id);
    let newCartItems = []
    if(existingCartItem.quantity > 1){
      newCartItems = cartItems.map(cartItem=>cartItem.id === itemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
    }else{
      newCartItems = cartItems.filter(cartItem=>cartItem.id !== itemToRemove.id);
    }
    updateCartItemsReducer(newCartItems)
  }
  const clearItemFromCart = (itemToRemove)=>{
    updateCartItemsReducer(cartItems.filter(cartItem=>cartItem.id !== itemToRemove.id))
  }
  const setIsCartOpen = ()=>{
    dispatch({type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN})
  }
  // update cart items whenever user logins
  useEffect(()=>{
    setCartItems(currentUserCartItems)
  },[currentUserCartItems])
  
  // whenever there is a change in cartItems locally, update the same in db
  useEffect(()=>{
    (async()=>{
      if(currentUser){
        // update user document in firestore
        await updateCollectionAndDocuments('users', currentUser.uid, {cartItems});
      }
    })();
  },[cartItems])

  const value = {
    isCartOpen, setIsCartOpen, cartItems, addItemToCart, totalQuantity, removeItemFromCart, clearItemFromCart, totalPrice, setCartItems
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
