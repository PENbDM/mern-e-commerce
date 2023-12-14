import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${css`
    @media screen and (max-width: 920px) {
      width: 550px;
    }
  `}
  ${css`
    @media screen and (max-width: 710px) {
      width: 450px;
    }
  `}
${css`
    @media screen and (max-width: 575px) {
      width: 420px;
    }
  `}
${css`
    @media screen and (max-width: 500px) {
      width: 350px;
    }
  `}
${css`
    @media screen and (max-width: 430px) {
      width: 270px;
    }
  `}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  margin-top: 2px;
  margin-bottom: 7px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await login(dispatch, { username, password });
    } catch (error) {
      console.error("Login error:", error);
      // Check for "Wrong credentials!" error
      if (error.response?.data?.message === "Wrong credentials!") {
        setValidationErrors([{ path: "password", msg: "Wrong credentials!" }]);
      } else if (error.response?.data?.message === "Username not exist") {
        setValidationErrors([{ path: "username", msg: "Username not exist" }]);
      } else {
        setValidationErrors(error.response?.data || []);
      }
    }
  };
  const getErrorMessage = (inputName) => {
    if (Array.isArray(validationErrors)) {
      return validationErrors.find((error) => error.path === inputName)?.msg;
    }
    return null;
  };
  console.log(validationErrors);
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Error>{getErrorMessage("username")}</Error>

          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Error>{getErrorMessage("password")}</Error>

          <Button onClick={handleClick}>LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
