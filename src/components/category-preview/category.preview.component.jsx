import { Fragment } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../product-card/product.card.component";

const CategoryPreview = ({ category, products, previewCount }) => {
    return (
        <Fragment key={category}>
                    <div className='category-title'>
                    <Link to={`${category}`}>{category.toUpperCase()}</Link>
                    </div>
                    <div className="products-container">
                        {
                        // show first 4 products
                        products[category].slice(0,previewCount || 4).map((product)=>{
                            return <ProductCard key={product.id} product={product} />
                        })
                        
                        }
                    </div>
        </Fragment>
    )
}
export default CategoryPreview;