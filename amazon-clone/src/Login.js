import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {

  let history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const showAuth = (auth) => {
    console.log('Current auth: ',auth);
  }

  const singIn = (e) => {
    // prevent page from refreshing
    e.preventDefault();
    if (isFromInvalid(state)) {
      alert("Form invalid");
    } else {
      signInWithEmailAndPassword(auth, state.email, state.password)
        .then((auth) => {
          console.log('signin success!');
          showAuth(auth);
          if (auth) {
            history.push("/");
          }
        })
        .catch((exception) => {
          alert(exception.message);
        });
    }
  };

  const register = (e) => {
    if (isFromInvalid(state)) {
      alert("Form invalid");
    } else {
      createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((auth) => {
          // successfully created a new user
          console.log("createUser success!");
          showAuth(auth);
          if (auth) {
            history.push("/");
          }
        })
        .catch((exception) => {
          alert(exception.message);
        });
    }
  };

  const isFromInvalid = ({ email, password }) => {
    return !email.length || !password.length;
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="img"
          className="login__logo"
        ></img>
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            onChange={handleOnchange}
            type="text"
            name="email"
            value={state.email}
          />
          <h5>Password</h5>
          <input
            onChange={handleOnchange}
            type="password"
            name="password"
            value={state.password}
          />
          <button type="submit" onClick={singIn} className="login__signInBtn">
            Sign In
          </button>
        </form>
        <p>
          By singning-in you agree to the AMAZON CLONE Condition of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login__registerBtn">
          Create your amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
