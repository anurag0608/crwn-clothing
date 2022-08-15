import './checkout.item.scss'

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const {removeItemFromCart, clearItemFromCart, addItemToCart } = useContext(CartContext);
    const {id, name, price, quantity, imageUrl} = cartItem;
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={()=>{removeItemFromCart(cartItem)}}>
                    &#10094;
                    {/* decrement */}
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={()=>(addItemToCart(cartItem))}>
                    &#10095;
                    {/* increment */}
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={()=>{clearItemFromCart(cartItem)}}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;