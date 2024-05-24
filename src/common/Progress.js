import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  position : absolute;
  z-index: 5;
  top:50%;
  left:20%;
`

const Progress = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
      <img src={imageDB.Progress} alt="로딩중" width="50%" />
    </Container>
  );
}

export default Progress;
