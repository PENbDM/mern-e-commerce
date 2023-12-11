import styled, { css } from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
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
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
