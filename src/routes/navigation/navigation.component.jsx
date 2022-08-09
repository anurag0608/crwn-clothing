import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import { SignOutUser } from "../../utils/firebase/firebase.util";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; // u can import svgs as components
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser} = useContext(UserContext);
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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
