import './shop.styles.scss';

import { useContext, Fragment } from "react";
import { ProductsContext } from "../../contexts/products.context";
import CategoryPreview from '../../components/categories-preview/categories.preview.component';

const Shop = (props) => {
  const { products } = useContext(ProductsContext);
  return (
    <Fragment>
      {
        Object.keys(products).map((category) => {
          return (
            <CategoryPreview key={category} category={category} products={products} previewCount={4}/>
          )
        })
      }
    </Fragment>
  );
};
export default Shop;
