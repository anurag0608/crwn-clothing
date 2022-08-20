import './shop.styles.scss';

import { useContext, Fragment } from "react";
import { Link } from 'react-router-dom';
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product.card.component";

const Shop = (props) => {
  const { products } = useContext(ProductsContext);
  return (
    <Fragment>
      {
        Object.keys(products).map((category) => {
          return (
            <Fragment key={category}>
                <div className='category-title'>
                  <Link to={`${category}`}>{category.toUpperCase()}</Link>
                </div>
                <div className="products-container">
                    {
                      // show first 4 products
                      products[category].slice(0,4).map((product)=>{
                        return <ProductCard key={product.id} product={product} />
                      })
                    
                    }
                </div>
            </Fragment>
          )
        })
      }
    </Fragment>
   
  );
  // products[category].map((product) => {
  //   return <ProductCard key={product.id} product={product} />;
  // })
};
export default Shop;
