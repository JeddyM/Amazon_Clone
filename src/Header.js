import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
//import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log("The basket is", basket);
  console.log("The user is", user);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src=" http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && "/Login"}>
          <div className="header_option" onClick={handleAuthentication}>
            <span className="header_optionLineOne">
              Hello {user ? user.email : "Guest"}
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="./Orders">
        <div className="header_option">
          <span className="header_optionLineOne">Returns2</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        </Link>
        
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">Orders</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

/*the destination URL is conditionally set using the expression !user && '/Login'. This means:
If user is null (meaning that no user is logged in), the link will navigate to the /Login route.
If user is not null, the link will not have a valid to prop, effectively rendering it inactive.*/
