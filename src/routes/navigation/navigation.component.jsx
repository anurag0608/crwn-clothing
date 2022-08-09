import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { SignOutUser } from "../../utils/firebase/firebase.util";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; // u can import svgs as components
import CartIcon from "../../components/cart-icon/cart.icon.component";
import CartDropDown from "../../components/cart-dropdown/cart.dropdown.component";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const signOutHandler = async()=>{
      try{
        await SignOutUser(); 
      }catch(error){
        console.log(error)
      }
  }
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && (<CartDropDown />)}
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
