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
import Loading from '../common/Loading';

const Container = styled.div`

  background-color:#ff4e19

`

const Loginloadingcontainer = ({containerStyle}) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { user, dispatch2 } = useContext(UserContext);

  useEffect(()=>{
    async function Process(){
      await useSleep(300);

      const latitude = user.latitude;
      const longitude = user.longitude;


     getStoreData({user, latitude, longitude}).then(async (user)=>{
      dispatch2(user);
  
     })

     await useSleep(5000);

     navigate("/home");

    } 
    Process();
  },[])




  return (
    <Container style={containerStyle}>
        <Loading containerStyle={{height:700,display:"flex", alignItems:"center"}}/>
    </Container>
  );
}

export default Loginloadingcontainer;
