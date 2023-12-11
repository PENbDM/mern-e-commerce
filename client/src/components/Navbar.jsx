import { Badge } from "@material-ui/core";
import {
  Search,
  ShoppingCartOutlined,
  AccountCircle,
} from "@material-ui/icons";
import React from "react";
import styled, { css } from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}

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

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "15px " })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
text-align: center;
align-items: center; /* Д
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const MenuItemSignIn = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  ${css`
    @media screen and (max-width: 663px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
    }
  `}
`;

const StyledLink = styled(Link)`
  /* Add your styles here */
  text-decoration: none;
  color: #000; /* Change the color as needed */
  /* Add more styles if necessary */
`;
const AccountIcon = styled(AccountCircle)`
  margin-top: 4px;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Wrapper>
        <Center>
          <StyledLink to="/">
            {" "}
            <Logo>LAMA.</Logo>
          </StyledLink>
        </Center>
        <Right>
          {user ? null : (
            <StyledLink to="/register">
              <MenuItem>REGISTER</MenuItem>
            </StyledLink>
          )}
          {user ? null : (
            <StyledLink to="/login">
              <MenuItemSignIn>SIGN IN</MenuItemSignIn>
            </StyledLink>
          )}
          <StyledLink to="/user">
            {user ? (
              <MenuItem>
                <AccountIcon />
              </MenuItem>
            ) : null}
          </StyledLink>
          <StyledLink to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
