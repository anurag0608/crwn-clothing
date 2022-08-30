import {CategoryTitle, ProductsContainer, CategoryLink} from './category.page.styles';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { useContext, Fragment} from 'react';
import { ProductsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product.card.component';

const CategoryPage = (props)=>{
    const {products} = useContext(ProductsContext);
    const {categoryName} = useParams();
    /*
      using state here because -
      suppose this component re-renders for some reason then we'll again loss our categoryProducts array, it'll we fetched
      again from products map (which is obviously not so time consuming but still it'll be a good practice here)
    */
    const [categoryProducts, setCategoryProducts] = useState(products[categoryName]);
    
    useEffect(()=>{
      setCategoryProducts(products[categoryName])
    },[categoryName, products])

    if(!categoryProducts){
      return <h2>No such category found 😪😕</h2>
    }
    return (
      <Fragment>
        <CategoryTitle>
                <CategoryLink to='#'>{categoryName.toUpperCase()}</CategoryLink>
        </CategoryTitle>
        <ProductsContainer>
        {
          categoryProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        }
       </ProductsContainer>
      </Fragment>
    )
}
export default CategoryPage;