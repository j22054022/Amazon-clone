import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
// stripe為一個透過信用卡交易的API
import { loadStripe } from "@stripe/stripe-js";
// 若要使用到stripe提供的component，必須用Elements HOC包裹
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

// 初始化stripe物件，並設定payment component(payment element in docs)使用語言
const striptPromise = loadStripe(
  "pk_test_51JutcvHNUyqifVaMetO8IdOusrq2dzPYDhmBgNJAz6kBTYL92jG2jTz3vjWM5Z95E4hpRVHZjyZj68Z3JFhP4qSq00mCCxlglR",
  { locale: "en" }
);

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    // only run once whan app function loads, work as a listener

    // Get the currently signed-in user
    onAuthStateChanged(auth, (user) => {
      console.log("auth changed!");
      console.log("Current user: ", user);
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        // if no user or user logged out
        dispatch({
          type: "CLEAR_USER",
        });
      }
    });
  }, []);

  return (
    // BEM
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={striptPromise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout basket={state.basket} />
          </Route>
          {/* 用Switch的時侯，不用像純使用Route，若有多個component還要render和return和exact，但必須將主頁面Route放在最後面 */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
