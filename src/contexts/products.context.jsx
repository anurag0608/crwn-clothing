import { createContext, useState} from "react"

import shopData from '../shop-data.json'; // temp solution

export const ProductsContext = createContext({
    products: null,
    setProducts: ()=> null,
})
export const ProductsProvider = ({children})=>{
    const [products, setProducts] = useState(shopData);
    const value = {
        products, setProducts
    }
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}
