import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ReactStars from 'react-stars';
import { imageDB } from "../utility/imageData";
import { REQUESTTYPE } from '../utility/contentDefine';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size:12px;
  line-height:2;
  padding :10px;

`

const RequestResponse = ({containerStyle, question, answer}) => {

  const navigate = useNavigate();


  return (
    <Container style={containerStyle}>
      <div style={{fontSize:16, color:"#999"}}>
        {question}
      </div>

      <div style={{fontSize:18, fontWeight:700}}>
        {answer}
      </div>


    </Container>
  );
}

export default RequestResponse;
