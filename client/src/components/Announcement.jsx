import styled, { css } from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
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
      width: 500px;
    }
  `}
  ${css`
    @media screen and (max-width: 479px) {
      width: 550px;
    }
  `}
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Announcement;
