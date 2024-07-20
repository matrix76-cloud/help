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


const Container = styled.div`
  background-color :#FF4E19;
  height:800px;
  
`
const ShowLayer = styled.div`
  color: rgb(255, 255, 255);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 600px;
  padding: 20px;
  line-height:1.5

`

const Splashcontainer = ({containerStyle}) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { user, dispatch2 } = useContext(UserContext);

  useEffect(()=>{
    async function Process(){
      await useSleep(10000);
   navigate("/splash2");
    } 
    Process();
  },[])










  return (
    <Container style={containerStyle}>

      <ShowLayer>
        <div style={{color :"#fff"}}> 
            스플래시 화면은 두개로 구성되어 있으며 첫번째 스플래시는 깔끔하게
            두번째 스플래시 이미지는 조금 동적(가령 아줌마가 청소한다거나) 으로 움직 였으면 좋겠습니다
        </div>
        <div style={{color :"#fff"}}> 
          모든 이미지 파일은 가급적 작은 사이즈로 제작되었으면 좋겠습니다 10k 이하로 이미지 로딩 속도 때문에 그렀습니다
        </div>
      </ShowLayer>
    </Container>
  );
}

export default Splashcontainer;
