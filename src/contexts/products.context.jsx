import { createContext, useState, useEffect} from "react"

import { addCollectionAndDocuments, getCollectionAndDocuments} from "../utils/firebase/firebase.util";

import SHOP_DATA from "../shop-data";
export const ProductsContext = createContext({
    products: null,
    setProducts: ()=> null,
})
export const ProductsProvider = ({children})=>{
    const [products, setProducts] = useState({});
      // create a new map out of products seperating individual categories
    
    useEffect(()=>{
        (async()=>{
            // await addCollectionAndDocuments('products', SHOP_DATA); // for adding data to firestore
            const products = await getCollectionAndDocuments('products');
            const categories = products.reduce((acc, product) => {
                if (!acc[product.category]) {
                acc[product.category] = [];
                }
                acc[product.category].push(product);
                return acc;
            },{});
            console.log('products length', products.length);
            setProducts(categories);
        })();
    },[])
    const value = {
        products, setProducts
    }
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}
