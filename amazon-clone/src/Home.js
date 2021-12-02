import React, { useEffect, useState, useMemo, } from "react";
import "./Home.css";
import Product from "./Product";
import ydnjs from "./22221108._UY630_SR1200,630_.jpg";
import jstgp from "./5131OWtQRaL._SX381_BO1,204,203,200_.jpg";
import { useStateValue } from "./StateProvider";
import Popup from "./Popup";
import md5 from "md5";

function Home() {
  console.log('Home render')
  const [state, dispatch] = useStateValue();
  // 由於原本直接用state.basket.map的方式產生Popup component會導致切換頁面再回來又會render一次，失去了點選產品才會Popup提醒的目的；透過popupList來新增當前被點選的物件再map產生Popup，並且每次component Mount也會因為useState初始值而被清空，解決了多render一次的問題
  const [popupList, setPopupList] = useState([])

  const pushPopupList = (item) => {
    console.log('setting popuplist')
    setPopupList([...popupList, item])
  }

  const getPopup = (popupList) => {
    return popupList.map((item) => (
      <Popup
        title={item.title}
        price={item.price}
        img={item.img}
        key={item.id}
      />
    ));
  };

  return (
    // BEM
    <div className="home">
      <div className="home__container">
        <img
          src="https://picsum.photos/1500/600"
          alt=""
          className="home__img"
        ></img>

        <div className="home__row">
          <Product
            title="You Dont Know JavaScript - ths & Object"
            price={19.99}
            img={ydnjs}
            rating={5}
            pushPopupList={pushPopupList}
          />
          <Product
            title="JavaScript The Good Parts"
            price={19.99}
            img={jstgp}
            rating={5}
            pushPopupList={pushPopupList}
          />
        </div>
        <div className="home__row">
          <Product
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - silver (4th Generation)"
            price={598.99}
            rating={4}
            img="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
            pushPopupList={pushPopupList}
          />
          <Product
            title="Amazon Echo (3ed generation) | Smart speaker wilth Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            img="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            pushPopupList={pushPopupList}
          />
          <Product
            title="Samsung LC4RG90SSUXEN49 Curved LED Gaming Monitor(error)"
            price={199.99}
            rating={3}
            img="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
            pushPopupList={pushPopupList}
          />
        </div>
        <div className="home__row">
          <Product
            title="Samsung LC49RG40SSUXEN 49 Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.99}
            rating={4}
            img="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            pushPopupList={pushPopupList}
          />
        </div>
        {!!popupList.length && getPopup(popupList)}
      </div>
    </div>
  );
}

export default Home;
