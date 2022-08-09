import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // router

import App from "./App";
import { UserProvider } from './contexts/user.context';
import { ProductsProvider } from "./contexts/products.context";
import { CartProvider } from "./contexts/cart.context";

import reportWebVitals from "./reportWebVitals";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        {/* App can access contexts stored by user provider */}
        <ProductsProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
/*
  consider two components -
  UserProvider & ProductProvider
  before deciding which components need to be parent
  Think this ✨
  Does UserProvider (which provides current logged in user) ever needs ProductProvider (which provides list of products) ?
  Or Does ProductProvider ever needs UserProvider ?
  Note ⛔: Parent component can't access data of lower level components or children components

  So here, image you've launched an international shopping app.
  So obviously products will vary from country to country.
  So a person living in USA might get a different list of products for the same search params.
  Analysing this, list of products will depend on User's location.
  Hence, ProductProvider should have access of UserProvider. (Since child components can access data of parent level components)
  ⭐<UserProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
    </UserProvider> 
 */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
