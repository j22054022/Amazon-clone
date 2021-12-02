import React from "react";
import BasketItem from "./BasketItem";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";


// 原本想要用REACT-FLIP-MOVE，所以切割出成一個component，但最後放棄使用
export const BasketItems = ({ basket }) =>
  basket.map((item) => (
    <BasketItem
      id={item.id}
      title={item.title}
      img={item.img}
      price={item.price}
      rating={item.rating}
      key={item.id}
    />
  ));

function Checkout({ basket }) {
  const [state, dispatch] = useStateValue();

  return (
    // BEM
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        ></img>

        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <BasketItems basket={basket} />
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
