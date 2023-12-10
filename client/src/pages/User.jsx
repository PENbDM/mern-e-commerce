import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import Orders from "../components/Orders";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../style.scss";
function User() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  // Use an object to store the expanded state for each order
  const [expandedOrders, setExpandedOrders] = useState({});

  const handleLogout = () => {
    // Use window.confirm to show a confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    // If the user clicks OK in the confirmation dialog, proceed with the logout
    if (confirmLogout) {
      // Dispatch the logout action
      dispatch(logout());
    }
  };

  const getProductDetails = async (productId) => {
    try {
      const res = await userRequest.get(`/products/find/${productId}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching product details:", err);
      return null;
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${user.user._id}`);
        const ordersWithProductDetails = await Promise.all(
          res.data.map(async (order) => {
            const productsWithDetails = await Promise.all(
              order.products.map(async (product) => {
                const productDetails = await getProductDetails(
                  product.productId
                );
                return {
                  ...product,
                  details: productDetails,
                };
              })
            );
            return {
              ...order,
              products: productsWithDetails,
            };
          })
        );
        setData(ordersWithProductDetails);

        // Initialize the expanded state for each order
        const initialExpandedState = {};
        ordersWithProductDetails.forEach((order, index) => {
          initialExpandedState[index] = false;
        });
        setExpandedOrders(initialExpandedState);
      } catch (err) {
        console.error("Error fetching user order:", err);
      }
    };

    // Call getOrder whenever the 'user' object changes
    if (user) {
      getOrder();
    }
  }, [user]);

  // Toggle the expanded state for the specified order index
  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prevExpandedOrders) => ({
      ...prevExpandedOrders,
      [orderId]: !prevExpandedOrders[orderId],
    }));
  };

  return (
    <div className="wrapper">
      <Navbar />
      <div className="alignUser">
        <div className="userBlock">
          <p>username: {user.user.username}</p>
          <p>email: {user.user.email}</p>
        </div>
        <div className="logoutBlock">
          <button className="buttonLogOut" onClick={handleLogout}>
            LOG OUT
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="firstBlockNoOrder">
          <p>You dont have order yet</p>
          <Link to="/">
            {" "}
            <button>Make Order</button>
          </Link>
        </div>
      ) : (
        <div className="firstBlock">
          <Orders
            data={data}
            expandedOrders={expandedOrders}
            toggleOrderDetails={toggleOrderDetails}
          />
        </div>
      )}

      <div className="secondBlock">
        {" "}
        <Footer />
      </div>
    </div>
  );
}

export default User;
