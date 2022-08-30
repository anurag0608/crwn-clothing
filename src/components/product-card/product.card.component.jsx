import {ProductCardContainer, ProductImage, ProductName, ProductPrice, Footer} from './product.card.styles';
import Button from '../button/button.component'


import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product})=>{
    const {id, name, imageUrl, price} = product;
    const {addItemToCart} = useContext(CartContext);
    const onClickHandler = ()=>{
        addItemToCart({id, name, imageUrl, price});
    }
    return (
        <ProductCardContainer>
            <ProductImage src={imageUrl} alt={`${name}`}/>
            <Footer>
                <ProductName>{name}</ProductName>
                <ProductPrice className='price'>{price}</ProductPrice>
            </Footer>
            <Button buttonType='inverted' onClick={onClickHandler}>Add to Cart</Button>
        </ProductCardContainer>
    )
}
export default ProductCard;