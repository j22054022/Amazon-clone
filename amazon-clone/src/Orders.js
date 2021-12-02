import React from "react";
import "./Orders.css";
import { db } from "./firebase";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

const Orders = () => {
  const [state, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const docRef = collection(db, "users", state.user.uid, "orders");

  useEffect(() => {
    dispatch({
      type: "EMPTY_BASKET",
    });

    const getdb = async () => {
      const q = query(docRef);

      const querySnapshot = await getDocs(q);
      //   資料藏在docs屬性
      let orderBuf = querySnapshot.docs.map((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        return {
          id: doc.id,
          data: doc.data(),
        };
      });

      //   console.log(querySnapshot);
      //   console.log(orderBuf);

      setOrders(
        orderBuf.sort((a, b) => {
          if (a.created > b.created) {
            return a.created - b.created;
          } else {
            return b.created - a.created;
          }
        })
      );
    };

    if (state.user) {
      getdb();
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <div className="orders">
      <h1 className="orders__title">Your Orders!</h1>

      <div className="orders__content">
        {orders?.map((order, i) => (
          <Order order={order} index={i} key={order.id} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
