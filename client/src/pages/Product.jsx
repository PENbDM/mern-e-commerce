import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/NewsLetter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProducts, updateTotalQuantity } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { vercelURL } from "../App";
import styled, { css } from "styled-components";
import MyLoader2 from "../components/Skeleton/Skeleton2";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column" })}
  ${css`
    @media screen and (max-width: 1000px) {
      display: flex;
      flex-direction: column;
    }
  `}
  ${css`
    @media screen and (max-width: 500px) {
      max-width: 600px;
    }
  `}
${css`
    @media screen and (max-width: 478px) {
      width: 500px;
    }
  `}
${css`
    @media screen and (max-width: 479px) {
      width: 550px;
    }
  `}
  ${css`
    @media screen and (max-width: 478px) {
      width: 450px;
    }
  `}
`;

const ImgContainer = styled.div`
  flex: 1;
  ${css`
    @media screen and (max-width: 1000px) {
      padding-bottom: 80px;
    }
  `}
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "70vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
  ${css`
    @media screen and (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
  ${css`
    @media screen and (max-width: 700px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 10px;
    }
  `}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
  ${css`
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  `}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState([]);
  const cart = useSelector((state) => state.cart.products);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true); // Добавлено состояние loading

  const URL = "http://localhost:5000/api";

  console.log(quantity);
  const dispatch = useDispatch(); // Add this line to get the dispatch function

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${URL}/products/find/` + id);
        setProduct(res.data);
        setLoading(false); // Установим loading в false в случае ошибки
      } catch (error) {}
      setLoading(false); // Установим loading в false в случае ошибки
    };
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (!color || !size) {
      // If either color or size is not selected, show an alert (you can replace this with your own UI feedback)
      alert("Please select both color and size before adding to cart.");
      return;
    }
    //update cart
    dispatch(addProducts({ ...product, quantity, color, size }));
    dispatch(updateTotalQuantity()); // Обновим общее количество товаров
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        {loading ? (
          // Рендер MyLoader во время загрузки данных
          <MyLoader2 />
        ) : (
          <>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Price>{product.price} $</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {product.color?.map((c) => (
                    <FilterColor
                      color={c}
                      key={c}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize
                    onChange={(e) => {
                      setSize(e.target.value);
                      setSize(e.target.value);
                    }}
                  >
                    <FilterSizeOption value="none">
                      Select Size
                    </FilterSizeOption>
                    {product.size?.map((s) => (
                      <FilterSizeOption key={s} value={s}>
                        {s}
                      </FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity("dec")} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity("inc")} />
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
