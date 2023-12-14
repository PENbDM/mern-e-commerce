import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Optional: Set a height to center vertically within the viewport */
`;

const Publishable_key =
  "pk_test_51OC6VFFV3Wv9D2rIaJGTtMXkQ9UV8oDen0vGLLxGbcDrp4YDEt8O9EWyeMv5D9jxt7xwHTqVvwsJN6Wx6fy2UIiX00ssrTlGdg";
const Button = styled.button``;
const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "https://mern-e-commerce-server.vercel.app/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest(); // Corrected invocation
  }, [stripeToken]);

  return (
    <Container>
      <StripeCheckout
        name="Pen Shop"
        image="womanM.png"
        billingAddress
        shippingAddress
        description="your total is 20$"
        amount={2000}
        token={onToken}
        stripeKey={Publishable_key}
      >
        <button>Pay</button>
      </StripeCheckout>
    </Container>
  );
};

export default Pay;
