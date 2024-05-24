import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`

    background: #03C70A;

`

const { naver } = window;

const NaverLogin = ({containerStyle}) => {

  const [user, setUser] = useState(null);

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
      height: 40,
      width: "300px",
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


  useEffect(() => {
    naverLogin.init();
    getUser();
  }, []);


  return (
    <Container style={containerStyle}>
        <div id="naverIdLogin" style={{width:'300px'}}></div>
    </Container>
  );
}

export default NaverLogin;
