import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
margin-top: 200px;
display : flex;
flex-direction : column;
 
 
`

const LoadingBg = styled.div`

    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;   

`
const Loading2 = ({containerStyle}) => {





  return (
    <Container style={containerStyle}>
      <div >
          <img src={imageDB.loadding2} alt="로딩중" width="20%" />
      </div>

      <div style={{fontSize:"14px", padding:20, textAlign:"left"}}>
        <span style={{textAlign:"left"}}>무엇을 하고 잇어서 이렇게 로딩하는지 내용이 있으면 좋겠습니다</span>
        <span style={{textAlign:"left"}}> 예) 일감을 불러오고 있습니디. 포인트 내역을 확인 중입니다</span>
        <span style={{textAlign:"left"}}>페이지내에서 진행상태를 표현해주는 로딩화면입니다</span>
      </div>




    </Container>
  );
}

export default Loading2;
