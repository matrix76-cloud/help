import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 350px;
    justify-content: center;
    height: 40px;
    align-items: center;
    margin: 10px;
    font-size:14px;
`

const Button = ({containerStyle, buttonText, callback}) => {


  const _handleClick = () =>{
    callback();
  }



  return (
    <Container style={containerStyle}  onClick={_handleClick} className="button">

      <div >
        {buttonText}
      </div>
   
    </Container>
  );
}

export default Button;
