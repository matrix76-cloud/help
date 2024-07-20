import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ImageButton from '../common/ImageButton';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:center;
  padding :10px 0px;
  flex-wrap : wrap;
  margin-top:20px; 
`

const Roomfilter = ({containerStyle, callback}) => {

  const navigate = useNavigate();
  const buttoncallback = (data)=>{
    callback('female');
  }
  return (
    <Container style={containerStyle}>
      <ImageButton
        source={imageDB.Thema20}
        buttoncallback={buttoncallback}
        buttontext={"짐 맡아주기"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
     </Container>
  );
}

export default Roomfilter;
