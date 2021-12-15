import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import { getBasketTotal } from "./reducer";

function Subtotal() {
  const [state, dispatch] = useStateValue();
  let history = useHistory();

  const disableBtn = {
    opacity: "0.5",
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        value={getBasketTotal(state.basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        renderText={(value) => (
          <p>
            {`Subtotal (${state.basket.length} items) : `}
            <strong>{`${value}`}</strong>
          </p>
        )}
      />
      <small className="subtotal__gift">
        <input type="checkbox" />
        This order contains a gift
      </small>
      <button
        disabled={!state.user}
        onClick={() => {
          history.push("/payment");
        }}
        style={state.user ? null : disableBtn}
      >
        Preceed to Checkout
      </button>
      {state.user ? null : <p>Please sign in</p>}
    </div>
  );
}

export default Subtotal;
