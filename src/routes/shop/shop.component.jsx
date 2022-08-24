import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories.preview.component";
import CategoryPage from "../category-page/category.page.component";

const Shop = (props) => {
  // now shop component has its own route
  // all the routes comes under /shop
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}></Route> 
      <Route path="/:categoryName" element={<CategoryPage />}></Route>
    </Routes>
  );
};
export default Shop;
