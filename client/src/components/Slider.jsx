import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled, { css } from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
  ${css`
    @media screen and (max-width: 605px) {
      max-width: 700px;
    }
  `}
  ${css`
    @media screen and (max-width: 500px) {
      max-width: 600px;
    }
  `}
  ${css`
    @media screen and (max-width: 478px) {
      width: 550px;
    }
  `}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  @media screen and (max-width: 479px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  overflow: hidden; /* Добавляем эту строку для скрытия части слайда */

  ${css`
    @media screen and (max-width: 605px) {
      max-width: 700px;
    }
  `}
  ${css`
    @media screen and (max-width: 500px) {
      max-width: 600px;
    }
  `}
  ${css`
    @media screen and (max-width: 478px) {
      width: 600px;
    }
  `}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  ${css`
    @media screen and (max-width: 660px) {
      height: 80%;
    }
  `}
  ${css`
    @media screen and (max-width: 600px) {
      display: none;
    }
  `}
`;

const Image = styled.img`
  height: 80%;
  ${css`
    @media screen and (max-width: 1120px) {
      height: 70%;
    }
  `}
  ${css`
    @media screen and (max-width: 1042px) {
      height: 70%;
    }
  `}
  ${css`
    @media screen and (max-width: 480px) {
      height: 100%;
      object-fit: cover; /* Добавляем эту строку для корректного отображения изображения */
    }
  `}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${css`
    @media screen and (max-width: 660px) {
      height: 60%;
    }
  `}
`;

const Title = styled.h1`
  font-size: 70px;
  ${css`
    @media screen and (max-width: 660px) {
      font-size: 50px;
    }
  `}
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${css`
    @media screen and (max-width: 660px) {
      font-size: 15px;
    }
  `}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : sliderItems.length - 1
      );
    } else {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
