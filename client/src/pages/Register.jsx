import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await register(dispatch, { username, email, password });
    } catch (error) {
      // Handle other types of errors (e.g., server errors) here
      console.error("Registration error:", error);

      // Check for unique email error
      if (error.response?.data?.message === "This email already exists") {
        // Handle unique email error here
        setValidationErrors([
          { path: "email", msg: "This email already exists" },
        ]);
      } else if (
        error.response?.data?.message === "This username already exists"
      ) {
        // Handle unique username error here
        setValidationErrors([
          { path: "username", msg: "This username already exists" },
        ]);
      } else {
        // Handle other errors
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
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <ErrorMessage>{getErrorMessage("username")}</ErrorMessage>

          <Input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage>{getErrorMessage("email")}</ErrorMessage>

          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorMessage>{getErrorMessage("password")}</ErrorMessage>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
