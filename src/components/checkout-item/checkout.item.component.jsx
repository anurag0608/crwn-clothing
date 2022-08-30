import {CheckoutItemContainer, ImageContainer, ProductInfo, Quantity, Arrow, Value, RemoveButton} from './checkout.item.styles'

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const {removeItemFromCart, clearItemFromCart, addItemToCart } = useContext(CartContext);
    const {id, name, price, quantity, imageUrl} = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <ProductInfo>{name}</ProductInfo>
            <Quantity>
                <Arrow onClick={()=>{removeItemFromCart(cartItem)}}>
                    &#10094;
                    {/* decrement */}
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={()=>(addItemToCart(cartItem))}>
                    &#10095;
                    {/* increment */}
                </Arrow>
            </Quantity>
            <ProductInfo>{price}</ProductInfo>
            <RemoveButton onClick={()=>{clearItemFromCart(cartItem)}}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;