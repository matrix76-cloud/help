import React,{useState, useEffect,useWindowDimensions} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import useDimensions from "react-use-dimensions";
import Text from './Text';

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


const { naver } = window;

const NaverLogin = ({containerStyle}) => {

  const [user, setUser] = useState(null);
  const [stepRef, stepSize] = useDimensions();

  console.log("useDimensions", stepSize.x);


  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])


  const naverLogin = new naver.LoginWithNaverId({
    clientId: "7aect0NV3l30s2Lm369y",
    callbackUrl: "http://localhost:3000/authm",
    isPopup: true,
    loginButton: {
      color: "green",
      type: 3,
      fontsize:14,
      height: 40,
      width : 200
    },
  });

  const getUser = async () => {
    await naverLogin.getLoginStatus((status) => {

      if (status) {
        setUser({ ...naverLogin.user });

        console.log("user information", user);

        // window.opener.location.href = "http://localhost:3000";
        // window.close();
      }
    });
  };

  const handleLogin = () =>{
    const naverLoginButton = document.getElementById(
      "naverIdLogin_loginButton"
    );
    if (naverLoginButton) naverLoginButton.click();
  }

  useEffect(() => {
    naverLogin.init();
    getUser();
  }, []);


  return (
    <Container style={containerStyle}  ref={stepRef}>
        <div id="naverIdLogin" style={{display:"none"}}></div>

        <SocialButton bgcolor={'#03CF5D'} onClick={handleLogin} >    
        {/* <Image source={imageDB.kakaomsg} containerStyle={{width:30}}/> */}
        <Text value={'네이버로 로그인'} color = {'#fff'}> </Text>    
      </SocialButton>

    </Container>
  );
}

export default NaverLogin;
