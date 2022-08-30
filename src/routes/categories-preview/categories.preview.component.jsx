import { Fragment, useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";

import CategoryPreview from "../../components/category-preview/category.preview.component";

const CategoriesPreview = (props) => {
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
}
export default CategoriesPreview;