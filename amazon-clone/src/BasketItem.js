import React, { useRef } from "react";
import "./BasketItem.css";
import { useStateValue } from "./StateProvider";

function BasketItem({ id, title, img, price, rating }) {
  const [state, dispatch] = useStateValue();

  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <>
      <div className="basketitem">
        <div className="basketitem__img">
          <img src={img} alt="img"></img>
        </div>
        <div className="basketitem__info">
          <p className="basketitem__name">
            <strong>{title}</strong>
          </p>
          <p className="basketitem__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="basketitem__rating">
            <p>
              {Array(rating)
                .fill()
                .map(() => "⭐")}
            </p>
          </div>
          <button onClick={removeFromBasket.bind(null, id)}>
            Remove from basket
          </button>
        </div>
      </div>
    </>
  );
}

export default BasketItem;
