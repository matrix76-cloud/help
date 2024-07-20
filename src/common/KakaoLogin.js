import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Image from './Image';
import Text from './Text';
import { imageDB } from '../utility/imageData';

const Container = styled.div`

`
const SocialButton = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction : row;
    width :250px;
    height: 40px;
    align-items: center;
    margin: 10px;
    font-weight:700;
    font-size:14px;
    background-color : ${({bgcolor}) => bgcolor};
    color :  ${({color}) => color};
`

const KaKaoLogin = ({containerStyle}) => {

  const Rest_api_key ='d943f03d1af22dc77db2c9914ab142b5';
  const redirect_uri = 'https://mapapp-30.web.app/auth';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () =>{
    window.location.href = kakaoURL;
  }

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>

      <SocialButton bgcolor={'#FEE500'} onClick={handleLogin} >    
        {/* <Image source={imageDB.kakaomsg} containerStyle={{width:30}}/> */}
        <Text value={'카카오톡으로 로그인'} color = {'#514f4f'}> </Text>    
      </SocialButton>

    </Container>
  );
}

export default KaKaoLogin;
