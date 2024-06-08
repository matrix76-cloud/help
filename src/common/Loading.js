import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  display : flex;
  align-items:center;
 
 
`

const LoadingBg = styled.div`

    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;   

`
const Loading = ({containerStyle}) => {





  return (
    <Container style={containerStyle}>
   {/*       <img src={imageDB.loading} alt="로딩중" width="20%" /> */}

      <LoadingBg >
          <img  className="movingforward" src={imageDB.bottom_gps}  style={{width: 50,height: 50}}/>
      </LoadingBg>

    </Container>
  );
}

export default Loading;
