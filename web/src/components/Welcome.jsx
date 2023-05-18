import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
   // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        <p className="text-3xl">Seja bem vindo, <span>{userName}!</span></p> 
      </h1>
      <h3 className="text-xl mt-5">Por favor selecione um contato para iniciar uma conversa</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #000;
  }
`;
