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


const Container = styled.div`
  background-color :#FF4E19;
  height:800px
`

const Splashcontainer = ({containerStyle}) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { user, dispatch2 } = useContext(UserContext);

  useEffect(()=>{
    async function Process(){
      await useSleep(5000);
      navigate("/home", { state: { homerefresh: false } });
    } 
    Process();
  },[])


  const postlogin = async (email, password, DEVICEID) => {
    const user2 = await login({ email, password });

    if (user2 == -1) {
      const USERID = user2.user.uid;

      const updatedevice = await update_userdevice({ USERID, DEVICEID });
    }

    return new Promise((resolve, reject) => {
      resolve(user2);
    });
  };

  const getuserInfoForPhone = async ({ DEVICEID }) => {
    const USER = await get_userInfoForDevice({ DEVICEID });

    return new Promise((resolve, reject) => {
      resolve(USER);
    });
  };


  const listener = (event) => {
    const { data, type } = JSON.parse(event.data);
    if (type === "DEVICEID") {
      const x = data.longitude;
      const y = data.latitude;

      SearchAddress(x, y).then(async (regionresult) => {
        user["region1"] = regionresult.region1;
        user["region2"] = regionresult.region2;
        user["latitude"] = regionresult.latitude;
        user["longitude"] = regionresult.longitude;

        user["curlatitude"]= regionresult.latitude;
        user["curlongitude"]  = regionresult.longitude;

        user["deviceid"] = data.deviceid;

        const DEVICEID = data.deviceid;

        const latitude = regionresult.latitude;
        const longitude = regionresult.longitude;
        user["distance"] = 20;

  
        getStoreData({user, latitude, longitude}).then((result)=>{
          dispatch2(result);
         })

      });
    } else if (type === "CURRENTPOSITION") {
      const x = data.longitude;
      const y = data.latitude;

      SearchAddress(x, y).then(async (regionresult) => {
        user["region1"] = regionresult.region1;
        user["region2"] = regionresult.region2;
        user["latitude"] = regionresult.latitude;
        user["longitude"] = regionresult.longitude;
        user["curlatitude"]= regionresult.latitude;
        user["curlongitude"]  = regionresult.longitude;

        const latitude = regionresult.latitude;
        const longitude = regionresult.longitude;
    
  
        const userData =  await getStoreDB({user, latitude, longitude});
        dispatch2(user);
        window.location.replace("/home");
      });
    }
  };



  useEffect(() => {
    // setRegion(user.region1 + " " + user.region2);

    if (window.ReactNativeWebView) {
      /** android */
      document.addEventListener("message", listener);
      /** ios */
      window.addEventListener("message", listener);
    } else {
      // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
    }
  }, []);



    // sample code
  useEffect(() => {
    let DEVICEID = "245de8d2762f971f";
    user["deviceid"] = DEVICEID;
    user["region1"] = "남양주시";
    user["region2"] = "다산동";
    user["latitude"] = "37.630013553801";
    user["longitude"] = "127.15545777991";
    user["curlatitude"] = "37.630013553801";
    user["curlongitude"] = "127.15545777991";
    user["distance"] = 20;

    
    const latitude = "37.630013553801";
    const longitude = "127.15545777991";

    async function FetchData(){

     getStoreData({user, latitude, longitude}).then((result)=>{
      dispatch2(user);
     })

    }

   FetchData();

  }, []);

  useEffect(()=>{

  },[])


  return (
    <Container style={containerStyle}>
   
 

        <Fade bottom delay={500}>
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight:800,
                      letterSpacing: 1.2,
                      fontFamily:'Pretendard-Bold',
                      top: '25%',
                      left: '10%',
                      color: '#fff',
                      position:'absolute',
                    }}
                  >
                    {'마사지샵을 찾아 떠나는'}
                  </div>
        </Fade>

        <Fade left delay={1500}>
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight:800,
                      letterSpacing: 1.2,
                      fontFamily:'Pretendard-Bold',
                      top: '33%',
                      left: '25%',
                      color: '#fff',
                      position:'absolute',
                    }}
                  >
                    {'마사지 원정대'}
                  </div>
        </Fade>
        <Fade bottom delay={2500}>

            <Splash/>
        </Fade>
 

    </Container>
  );
}

export default Splashcontainer;
