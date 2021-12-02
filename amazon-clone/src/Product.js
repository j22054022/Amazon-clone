import React from "react";
import "./Product.css";
import md5 from "md5";
import { useStateValue } from "./StateProvider";

function Product({ title, img, price, rating, pushPopupList }) {
  // 因StateProvider.js使用<StateContext.Provider value={useReducer(reducer, initState)}>，導致useStateValue()會回傳useReducer(reducer, initState)，而useReducer又會回傳[Global state 資料, 類redux-dispatch動作]，所以才會用解構賦值
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    const id = md5(Math.random());

    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        img: img,
        price: price,
        rating: rating,
      },
    });
    console.log(!!pushPopupList)
    pushPopupList.bind(null,{
      id: id,
      title: title,
      img: img,
      price: price,
      rating: rating,
    })();
  };
  return (
    <div className="product">
      <div className="product__info">
        <p className="product__name">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="produce__rating">
          <p>
            {Array(rating)
              .fill()
              .map(() => "⭐")}
          </p>
        </div>
      </div>
      <img src={img} alt=""></img>
      {/* <button onClick={addToBasket.bind(null,title, img, price, rating)}>Add to basket</button> */}
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
