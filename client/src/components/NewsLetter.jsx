import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
  margin-bottom:20px;
`;

const InputContainer2 = styled.div`
  width: 50%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const InputText = styled.textarea`
  border: none;
  flex: 8;
  padding-left: 20px;
  max-height: 60px;
`;

const Button = styled.button`
  margin-top: 30px;
  height: 50px;
  width: 200px;
  border: none;
  background-color: teal;
  color: white;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: ${({ showPopup }) => (showPopup ? "block" : "none")};
`;

const PopupButton = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(
        "service_e3m9z3r",
        "template_y0orwnm",
        e.target,
        "yxKmGIRhdM-0a-gGB"
      );

      console.log(result.text);
      setShowPopup(true);
    } catch (error) {
      console.log(error.text);
    }
  };
  useEffect(() => {
    return () => {
      setShowPopup(false);
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);

    // Delay the form reset to ensure it happens after the popup is hidden
    setTimeout(() => {
      form.current.reset();
      setEmail("");
      setMessage("");
    }, 0);
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates from your favorite products.</Desc>
        <InputContainer>
          <Input
            type="email"
            placeholder="Your email"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer2>
          <InputText
            placeholder="Your message"
            name="user_message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainer2>
        <Button type="submit">
          <Send />
        </Button>
      </Container>
      {showPopup ? (
        <Popup showPopup={showPopup}>
          <p>Your message has been sent!</p>
          <PopupButton onClick={closePopup}>OK, it's fine</PopupButton>
        </Popup>
      ) : null}
    </form>
  );
};

export default Newsletter;
