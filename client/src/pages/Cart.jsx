import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { vercelURL } from "../App";

import { useNavigate } from "react-router-dom";
import {
  removeProducts,
  addProductsCart,
  removeProdFromCart,
  updateTotalQuantity,
} from "../redux/cartRedux";
import axios from "axios";
const Key_Stripe =
  "pk_test_51OC6VFFV3Wv9D2rIaJGTtMXkQ9UV8oDen0vGLLxGbcDrp4YDEt8O9EWyeMv5D9jxt7xwHTqVvwsJN6Wx6fy2UIiX00ssrTlGdg";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 210px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const URL = "http://localhost:5000/api";

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const onToken = (token) => {
    setStripeToken(token);
  };
  const cleanCart = () => {
    dispatch(removeProducts());
  };
  dispatch(updateTotalQuantity()); // Обновим общее количество товаров

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `${URL}/checkout/payment`,
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
            products: cart.products.map((product) => ({
              productId: product._id,
              quantity: product.quantity,
              color: product.color,
              size: product.size,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${user.user.token}`,
            },
          }
        );

        navigate("/success", { state: { stripeData: res.data, cart: cart } });
      } catch (err) {
        console.error("Error making payment request:", err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate, cart.products, user]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            {" "}
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>
              {/* Shopping Bag {totalQuantity > 0 ? totalQuantity : "0"} */}
            </TopText>
          </TopTexts>
          <TopButton onClick={() => cleanCart()} type="filled">
            Clean the cart
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart && cart.products ? (
              cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={() => dispatch(addProductsCart(product))} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove
                        onClick={() => dispatch(removeProdFromCart(product))}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))
            ) : (
              <Product>
                <ProductDetail>
                  <Image />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                    </ProductId>
                    <ProductColor />
                    <ProductSize>
                      <b>Size:</b>
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount></ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice></ProductPrice>
                </PriceDetail>
              </Product>
            )}

            <Hr />
          </Info>
          {cart && cart.products ? (
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>
                  {" "}
                  {cart.products.length > 0 ? "$ 5.90" : "0"}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>
                  {cart.products.length > 0 ? "$ -5.90" : "0"}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="Pen Shop"
                image="womanM.png"
                billingAddress
                shippingAddress
                description={`Your total is ${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={Key_Stripe}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          ) : (
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ 0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ </SummaryItemPrice>
              </SummaryItem>
            </Summary>
          )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
