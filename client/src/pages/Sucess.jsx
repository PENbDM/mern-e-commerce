import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeProducts } from "../redux/cartRedux";
import { vercelURL } from "../App";

import axios from "axios";
const Success = () => {
  const URL = "http://localhost:5000/api";
  const user = useSelector((state) => state.user.currentUser);

  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const currentUser = useSelector((state) => state.user.currentUser.user);
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        // Add null checks before accessing nested properties
        const res = await axios.post(
          `${vercelURL}/orders`,
          {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
              color: item.color,
              size: item.size,
            })),
            status: "success",
            amount: cart.total,
            address: data?.billing_details?.address, // Add null checks
          },
          {
            headers: {
              Authorization: `Bearer ${user?.user?.token}`, // Add null checks
            },
          }
        );
        setOrderId(res.data._id);
        dispatch(removeProducts());
      } catch (err) {
        console.log(err);
      }
    };

    createOrder(); // Вызываем функцию createOrder внутри useEffect
  }, [
    currentUser,
    cart,
    data?.billing_details?.address, // Add null checks
    user?.user?.token, // Add null checks
    dispatch,
  ]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
