import { useContext } from 'react';

import {CartIconContainer, ShoppingIcon, ItemCount} from './cart.icon.styles';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = ()=>{
    const {isCartOpen, setIsCartOpen, totalQuantity} = useContext(CartContext);

    const onClickHandler = (e)=>{
        setIsCartOpen(!isCartOpen);
    }
    return (
        <CartIconContainer onClick={onClickHandler}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{totalQuantity}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;