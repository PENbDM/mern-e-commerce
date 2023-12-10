import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeProducts } from "../redux/cartRedux";
const Success = () => {
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
        console.log(currentUser);
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
          status: "success",
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(removeProducts());
      } catch (err) {
        console.log(err);
      }
    };

    createOrder();
  }, [cart, data, currentUser]);
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
