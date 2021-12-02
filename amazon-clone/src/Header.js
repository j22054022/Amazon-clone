import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { signOut } from "@firebase/auth";

function Header() {
  const [state, dispatch] = useStateValue();

  const handleAuth = () => {
    if (state.user) {
      signOut(auth)
        .then(() => {
          console.log("sign out success");
        })
        .catch((exception) => {
          alert(exception.message);
        });
    }
  };

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="img"
          className="header__logo"
        ></img>
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput"></input>
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
          <div className="header__option" onClick={handleAuth}>
            <span className="header__option--main">
              {state.user ? `Hello ${state.user.email}` : "Hello Guest"}
            </span>
            <span className="header__option--sub">
              {state.user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to="/orders" style={{ textDecoration: "none", color: "white" }}>
          <div className="header__option">
            <span className="header__option--main">Return</span>
            <span className="header__option--sub">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__option--main">Your</span>
          <span className="header__option--sub">Prime</span>
        </div>
        <div className="header__basket">
          <Link
            to="/checkout"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ShoppingBasketIcon className="header__shoppingBasketIcon" />
          </Link>
          <span className="header__option--main header__basketCount">
            {state.basket.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
