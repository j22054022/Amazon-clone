import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { BasketItems } from "./Checkout";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "axios";
import instance from "./axios";
import { useHistory } from "react-router";
import { db } from "./firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const Payment = () => {
  const [state, dispatch] = useStateValue();

  const [disable, setDisable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(true);
  const [clientSerect, setClientSerect] = useState(true);
  const history = useHistory();

  // The useStripe hook returns a reference to the Stripe instance passed to the Elements provider.
  // 回傳值就是App.js的striptPromise
  const stripe = useStripe();
  // To safely pass the payment information collected by the Payment Element to the Stripe API, access the Elements instance so that you can use it with stripe.confirmPayment.
  // 回傳一物件，具有getElement()可將使用的payment element傳入Stripe API
  const elements = useElements();

  // The client secret can be used to complete a payment from your frontend. It should not be stored, logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.
  // 簡單來說client secret就像是目前交易價格的清單鑰匙，故只有client可以知道，不可暴露給其他人，當購物清單basketitems改變時，client serect也必須跟著改變，否則無法收取正確費用。
  useEffect(() => {
    console.log("effect");
    const getClientSecret = async () => {
      const response = await instance({
        method: "POST",
        // Stripe會以最小單位為基準(10dollar = 1000cent)，故要將所使用的單位換算為正確最小單位
        // 透過url的query parameter傳遞支付價格
        url: `/payment/create?total=${(
          getBasketTotal(state.basket) * 100
        ).toFixed(0)}`,
      });
      // console.log(response.data.clientSerect)
      setClientSerect(response.data.clientSecret);
    };

    getClientSecret();
  }, [state.basket]);

  // console.log(clientSerect);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Use stripe.confirmCardPayment when the customer submits your payment form. When called, it will confirm the PaymentIntent_API with data you provide and carry out 3DS or other next actions if they are required.
    // https://stripe.com/docs/js/payment_intents/confirm_card_payment
    const payload = await stripe
      .confirmCardPayment(clientSerect, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({ paymentIntent }) => {
        // 將使用者與訂單push至資料庫
        try {
          // firebase 9 新寫法，doc會在沒有exist path的情況下新增集合，配合setDoc設定文件就可快速創建多層collection
          const docRef = await setDoc(
            doc(db, "users", state.user.uid, "orders", paymentIntent.id),
            {
              basket: state.basket,
              amount: paymentIntent.amount,
              // 交易時間(Unix時間)
              created: paymentIntent.created,
            }
          );
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        setProcessing(false);
        setSucceeded(true);
        setError(null);

        // dispatch({
        //   type: 'EMPTY_BASKET'
        // });

        // 跳進order頁面，並防止回上一頁造成意外
        history.replace("/orders");
        // Confirm that your customer intends to pay with current or provided payment method. Upon confirmation, the PaymentIntent will attempt to initiate a payment.
        // https://stripe.com/docs/api/payment_intents/confirm
      });
  };

  const handleChange = (e) => {
    setDisable(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <p className="payment__title">
        {"Checkout "}
        <Link to="/checkout">
          <span>{`(${state.basket.length} items)`}</span>
        </Link>
      </p>

      <div className="payment__content">
        <div className="payment__adress payment__subcontent">
          <p className="payment__adress__title payment__subtitle">
            Delivery Address
          </p>
          <div className="payment__adress__content">
            <span className="payment__adress__content__email">
              {state.user?.email}
            </span>
            <span className="payment__adress__content__ad1">adress1</span>
            <span className="payment__adress__content__ad2">adress2</span>
          </div>
        </div>
        <div className="payment__item payment__subcontent">
          <p className="payment__item__title payment__subtitle">
            Review Items and delivery
          </p>
          <div className="payment__item__content">
            <BasketItems basket={state.basket} />
          </div>
        </div>
        <div className="payment__mothod payment__subcontent">
          <p className="payment__method__title payment__subtitle">
            Payment Method
          </p>
          <div className="payment__method__details">
            <form action="" onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__method__details__priceContainer">
                <CurrencyFormat
                  value={getBasketTotal(state.basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  renderText={(value) => (
                    <p>
                      <strong>{`Order Total: ${value}`}</strong>
                    </p>
                  )}
                />
                <button
                  className="payment__method__details__btn"
                  disabled={error ||processing || disable}
                >
                  <span>{processing ? "processing..." : "Buy Now"}</span>
                </button>
              </div>
            </form>
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
