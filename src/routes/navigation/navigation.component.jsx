import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { SignOutUser } from "../../utils/firebase/firebase.util";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; // u can import svgs as components
import CartIcon from "../../components/cart-icon/cart.icon.component";
import CartDropDown from "../../components/cart-dropdown/cart.dropdown.component";

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from "./navigation.styles.jsx";

const Navigation = () => {
  const { currentUser} = useContext(UserContext);
  
  const {isCartOpen, setCartItems} = useContext(CartContext);
  const signOutHandler = async()=>{
      try{
        await SignOutUser();
        setCartItems([]);
      }catch(error){
        console.log(error)
      }
  }
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          <NavLink to="/create-product">
            CREATE PRODUCT
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && (<CartDropDown />)}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
