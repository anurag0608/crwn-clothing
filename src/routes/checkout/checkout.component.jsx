import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout.item.component';

const Checkout = ()=>{
    // checkout is now hooked to CartContext
    const {cartItems, setCartItems} = useContext(CartContext);
    const totalPrice = cartItems.reduce((acc, cartItem)=>acc + cartItem.price * cartItem.quantity, 0);
    const onClickDecrease = (e)=>{
        const itemId = e.target.getAttribute('itemID')
        const cartItem = cartItems.find((cartItem)=>cartItem.id===Number(itemId));
        if(cartItem){
            if(cartItem.quantity===1){
                setCartItems(cartItems.filter((cartItem)=>cartItem.id!==Number(itemId)));
            }else{
                setCartItems(cartItems.map((cartItem)=>cartItem.id===Number(itemId) ? {...cartItem, quantity: cartItem.quantity-1} : cartItem));
            }
        }
    }
    const onClickIncrease = (e)=>{
        const itemId = e.target.getAttribute('itemID')
        const cartItem = cartItems.find((cartItem)=>cartItem.id===Number(itemId));
        if(cartItem){
            setCartItems(cartItems.map((cartItem)=>cartItem.id===Number(itemId) ? {...cartItem, quantity: cartItem.quantity+1} : cartItem));
        }
    }
    const onClickRemove = (e)=>{
        const itemId = e.target.getAttribute('itemID')
        setCartItems(cartItems.filter((cartItem)=>cartItem.id!==Number(itemId)));
    }
    return (
        <div>
            <h1>Hi Im checkout page 💰</h1>
            {
                cartItems.map((item)=>{
                    return <CheckoutItem key={item.id} item={item} onClickIncrease={onClickIncrease} onClickDecrease={onClickDecrease} onClickRemove={onClickRemove}/>
                })
            }
            <h2>Final Price: {`${totalPrice} $`}</h2>
        </div>
    )
}
export default Checkout;