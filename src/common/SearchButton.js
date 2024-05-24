import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { theme } from '../theme/theme';

const Container = styled.div`
  border: 1px solid #ededed;
  padding: 0px 10px;
  height: 20px;
  border-radius:5px;
`
const BtnTouch = styled.div`


`
const BtnText = styled.span`
    font-size :13px;
    font-family : ${({themaText}) =>themaText};
    color :#000;
`


const SearchButton = ({containerStyle, buttonText}) => {

  const handleMore = () =>{

  }

  return (
    <Container style={containerStyle}>
        <BtnTouch onClick={handleMore}>
            <BtnText themaText={theme.REGULAR}>{buttonText}</BtnText>
        </BtnTouch>
    </Container>
  );
}

export default SearchButton;
