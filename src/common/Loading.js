import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  padding-right:30px;
`

const Loading = ({containerStyle}) => {





  return (
    <Container style={containerStyle}>
         <img src={imageDB.loading} alt="로딩중" width="20%" />
    </Container>
  );
}

export default Loading;
