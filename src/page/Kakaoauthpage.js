import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { getKaKaoUserData, getToken } from '../utility/api';
import Button from '../common/Button';
import { DuplicatePhone, get_userInfoForKakaoID } from '../service/UserService';
import PrevLayout from '../screen/Layout/PrevLayout';
import Kakaoauthcontainer from '../container/Kakaoauthcontainer';

const Container = styled.div`

`


const Kakaoauthpage = ({containerStyle}) => {

  const navigate = useNavigate();



  return (
    <PrevLayout
      menu={false}
      bottom={false}
      header={true}
      headername={"카카오 로그인"}
    >
      <Kakaoauthcontainer />
    </PrevLayout>
  );
}

export default Kakaoauthpage;
