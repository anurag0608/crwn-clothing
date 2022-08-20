import {useParams, Link} from 'react-router-dom'
import { useContext, Fragment} from 'react';
import { ProductsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product.card.component';

const CategoryPage = (props)=>{
    const {products} = useContext(ProductsContext);
    const {categoryName} = useParams();
    if(!products[categoryName]){
      return <h2>No such category found 😪😕</h2>
    }
    return (
      <Fragment>
        <div className='category-title'>
                <Link to='#'>{categoryName.toUpperCase()}</Link>
        </div>
        <div className="products-container">
        {
          products[categoryName].map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        }
       </div>
      </Fragment>
    )
}
export default CategoryPage;