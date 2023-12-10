// Update Orders component
import React, { useState } from "react";
import "../style.scss";
import styled from "styled-components";

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
`;
function Orders({ data, expandedOrders, toggleOrderDetails }) {
  return (
    <div className="container-orders">
      {data.map((order) => (
        <div className="orderItem" key={order._id}>
          <div className="orderHeader">
            <p>Order ID: {order._id}</p>
            <p>Amount: ${order.amount}</p>
            <p>Status: {order.status}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            <button onClick={() => toggleOrderDetails(order._id)}>
              {expandedOrders[order._id] ? "Hide Products" : "Show Products"}
            </button>
          </div>
          {expandedOrders[order._id] && (
            <ul>
              {order.products.map((product) => (
                <li key={product._id} className="productItem">
                  <div className="productDetails">
                    <p>Title: {product.details.title}</p>
                    <p>Price: ${product.details.price}</p>
                    <p>Quanity: {product.quantity}</p>
                    <p>Size: {product.size}</p>
                    <p className="colorDetails">
                      Color: <FilterColor color={product.color}></FilterColor>
                    </p>
                  </div>
                  <div className="productImage">
                    <img
                      src={product.details.img}
                      alt={product.details.title}
                      className="productImg"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p>
            Address: {order.address.city}, {order.address.country}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
