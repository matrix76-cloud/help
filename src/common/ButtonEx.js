import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    color: #fff;
    background: ${({background}) => background};
    width: 22%;
    height: 25px;
    font-size: 12px;
    margin :2px;
    border-radius:5px;
    box-shadow: rgb(209, 204, 204) 1px 1px 1px;

`

const ButtonEx = ({containerStyle, buttonText, callback,background}) => {


  const _handleClick = () =>{
    callback();
  }



  return (
    <Container style={containerStyle}  onClick={_handleClick} className="button" background={background}>

      <div >
        {buttonText}
      </div>
   
    </Container>
  );
}

export default ButtonEx;
