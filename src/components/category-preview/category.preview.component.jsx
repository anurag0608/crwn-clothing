import {CategoryTitle, ProductsContainer, CategoryLink} from './category.preview.styles';

import { Fragment } from "react";
import ProductCard from "../product-card/product.card.component";

const CategoryPreview = ({ category, products, previewCount }) => {
    return (
        <Fragment key={category}>
                    <CategoryTitle>
                        <CategoryLink to={`${category}`}>{category.toUpperCase()}</CategoryLink>
                    </CategoryTitle>
                    <ProductsContainer>
                        {
                        // show first 4 products
                        products[category].slice(0,previewCount || 4).map((product)=>{
                            return <ProductCard key={product.id} product={product} />
                        })
                        
                        }
                    </ProductsContainer>
        </Fragment>
    )
}
export default CategoryPreview;