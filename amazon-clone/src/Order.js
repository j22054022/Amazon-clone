import React from "react";
import "./Order.css";
// moment libary 處理UNIX時間
import moment from "moment";
import { map } from "@firebase/util";
import { BasketItems } from "./Checkout";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

const Order = ({ order, index }) => {
  return (
    <div className="order">
      <div className="order__title">
        <h2>Order {index + 1}</h2>
        {/* https://momentjs.com/docs/#/parsing/string-format/ */}
        <div className="order__title--sub">
          <p>
            Time: {moment.unix(order.data.created).format("YYYY/MM/DD HH:mm")}
          </p>
          <p>
            <small>{order.id}</small>
          </p>
        </div>
      </div>

      <BasketItems basket={order.data.basket} />
      <div className="order__total">
        <CurrencyFormat
          value={getBasketTotal(order.data.basket)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          decimalScale={2}
          renderText={(value) => <h3>{`Order Total: ${value}`}</h3>}
        />
      </div>
    </div>
  );
};

export default Order;
