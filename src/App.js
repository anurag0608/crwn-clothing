import {Routes, Route} from 'react-router-dom';
/*
  Outlets are used in nested routes for rendering child components along with the parent
  without outlets, only parent will be rendered
*/
// IMPORT Routes //
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import CreateProduct from './routes/create-product/create.product.component';
import CategoryPage from './routes/category-page/category.page.component';
///////////////////

const App = ()=>{
  return (
  <Routes>
    <Route path='/' element={<Navigation/>}>
      <Route index={true} element={<Home />}></Route> 
      {/* index here means if router matches '/'path then default component that should be render is Home*/}
      <Route path='shop' element={<Shop />}></Route>
      <Route path='shop/:categoryName' element={<CategoryPage />}></Route>
      <Route path='auth' element={<Authentication />}></Route>
      <Route path='checkout' element={<Checkout />}></Route>
      <Route path='create-product' element={<CreateProduct />}></Route>
    </Route>
  </Routes>
  )
}

export default App;
