import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { theme } from '../theme/theme';

const Container = styled.div`

`
const BtnTouch = styled.div`
    float : right;

`
const BtnText = styled.span`
    font-size :14px;
    font-family : ${({themaText}) =>themaText};
    color :#000;
`


const MoreButton = ({containerStyle, buttonText}) => {

  const navigate = useNavigate();
  const handleMore = () =>{
    navigate("/recent");
  }

  return (
    <Container style={containerStyle}>
        <BtnTouch onClick={handleMore}>
            <BtnText themaText={theme.REGULAR}>{buttonText}</BtnText>
        </BtnTouch>
    </Container>
  );
}

export default MoreButton;
