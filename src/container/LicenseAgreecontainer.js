import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Splash from '../common/Splash';
import { SearchAddress, distanceFunc, useSleep, getStoreData, getStoreDB } from '../utility/common';
import { get_userInfoForDevice, login, update_userdevice } from '../service/UserService';
import { UserContext } from '../context/User';
import { get_storeallview, get_stores } from '../service/StoreService';
import { get_review } from '../service/ReviewService';
import { get_checkuser } from '../service/CheckService';

import Fade from "react-reveal/Fade";
import { imageDB } from '../utility/imageData';
import Button from '../common/Button';


const Container = styled.div`
  background-color :#FFF;
  height:800px;
  
`
const ShowLayer = styled.div`
  color: rgb(255, 255, 255);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
  padding: 50px;
  line-height:1.5;
  color : #000;

`

const LicenseAgreeContainer = ({containerStyle}) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { user, dispatch2 } = useContext(UserContext);

  useEffect(()=>{

  },[])





  const _handlePrev = ()=>{
    navigate("/registerlogin");
  }




  return (
    <Container style={containerStyle}>

      <ShowLayer>
        개인정보 수집이용 동의 지침관련해서 보여주고 동의를 구하는 화면 입니다
      </ShowLayer>

      <Button buttonText={'개인정보 수집동의를 확인하였습니다'} callback={_handlePrev} containerStyle={{
                        backgroundColor: "#FFF", border: '1px solid rgb(179, 179, 179)',boxShadow:"none",
                        color: '#000', margin: '10px', width: "90%", height: 35
        }} />

      <ShowLayer>
        홍여사 회원약관 에 대한 동의를 구하는 화면 입니다
      </ShowLayer>


      <Button buttonText={'홍여사 회원약관 동의를 확인하였습니다'} callback={_handlePrev} containerStyle={{
                        backgroundColor: "#FFF", border: '1px solid rgb(179, 179, 179)',boxShadow:"none",
                        color: '#000', margin: '10px', width: "90%", height: 35
        }} />

    </Container>
  );
}

export default LicenseAgreeContainer;
