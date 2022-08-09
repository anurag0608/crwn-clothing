import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import { SignOutUser } from "../../utils/firebase/firebase.util";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; // u can import svgs as components
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  /*
    we hooked the user context to Navigation componenet, which means
    whenever the context changes or updated, the state changes (user context basically stores the state of a user), 
    this Navigation componenet will re-render because it is hooked with that state.
    So basically all the components which are hooked to this user context will re-render.
  */
  const signOutHandler = async()=>{
      try{
        await SignOutUser(); 
        // setCurrentUser(null); // destroy user context
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
