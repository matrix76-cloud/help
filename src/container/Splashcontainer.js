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
      await useSleep(3000);
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


        const latitude = regionresult.latitude;
        const longitude = regionresult.longitude;
    
  
        const userData =  await getStoreDB({user, latitude, longitude});
        dispatch2(userData);
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
    user["distance"] = 20;

    
    const latitude = "37.630013553801";
    const longitude = "127.15545777991";

    async function FetchData(){

     getStoreData({user, latitude, longitude}).then((result)=>{
      dispatch2(result);
     })

    }

    FetchData();

    // async function FetchData() {
    //   const stores = await get_stores();

    //   console.log("stores", stores);
    //   let premiumshoplist = [],goldshoplist = [],silvershoplist = [], allshoplist = [];

    //   stores.map(async(data) => {
    //     const lat1 = "37.630013553801";
    //     const lon1 = "127.15545777991";
    //     const lat2 = data.STORELATITUDE;
    //     const lon2 = data.STORELONGITUDE;
    //     const dist = distanceFunc(lat1, lon1, lat2, lon2);

    //     console.log("dist", dist, user.distance);
    //     let policydistance = 0;

    //     if (user.distance == "") {
    //       policydistance = 10;
    //     } else {
    //       policydistance = user.distance;
    //     }
    //     if (dist <= policydistance) {
    //       if (data.STORELEVEL.indexOf("premium") != -1) {
    //         data["dist"] = dist;

    //         const STORE_ID = data.STORE_ID;
    //         const reviewdata = await get_review({ STORE_ID });
      
    //         data["reviewdata"] =reviewdata;
    //         const USER_ID = data.USER_ID;
    //         const checks = await get_checkuser({ USER_ID });

    //         data["checks"] =checks;
    //         premiumshoplist.push(data);
    //       }
    //       if (data.STORELEVEL.indexOf("gold") != -1) {
    //         data["dist"] = dist;

    //         const STORE_ID = data.STORE_ID;
    //         const reviewdata = await get_review({ STORE_ID });
      
    //         data["reviewdata"] =reviewdata;
    //         const USER_ID = data.USER_ID;
    //         const checks = await get_checkuser({ USER_ID });

    //         data["checks"] =checks;

    //         goldshoplist.push(data);
    //       }
    //       if (data.STORELEVEL.indexOf("silver") != -1) {
    //         data["dist"] = dist;

    //         const STORE_ID = data.STORE_ID;
    //         const reviewdata = await get_review({ STORE_ID });
      
    //         data["reviewdata"] =reviewdata;
    //         const USER_ID = data.USER_ID;
    //         const checks = await get_checkuser({ USER_ID });

    //         data["checks"] =checks;

    //         silvershoplist.push(data);
    //       }
    //       const STORE_ID = data.STORE_ID;
    //       const reviewdata = await get_review({ STORE_ID });
    
    //       data["reviewdata"] =reviewdata;
    //       const USER_ID = data.USER_ID;
    //       const checks = await get_checkuser({ USER_ID });

    //       data["checks"] =checks;
    //       allshoplist.push(data);
    
    //     }
    //   });

    //   allshoplist.sort(function (a, b) {
    //     // 오름차순
    //     return parseInt(a.dist) < parseInt(b.dist)
    //       ? -1
    //       : parseInt(a.dist) > parseInt(b.dist)
    //       ? 1
    //       : 0;
    //   });

    //   premiumshoplist.sort(function (a, b) {
    //     // 오름차순
    //     return parseInt(a.dist) < parseInt(b.dist)
    //       ? -1
    //       : parseInt(a.dist) > parseInt(b.dist)
    //       ? 1
    //       : 0;
    //   });

    //   goldshoplist.sort(function (a, b) {
    //     // 오름차순
    //     return parseInt(a.dist) < parseInt(b.dist)
    //       ? -1
    //       : parseInt(a.dist) > parseInt(b.dist)
    //       ? 1
    //       : 0;
    //   });
    //   silvershoplist.sort(function (a, b) {

    //     console.log("silvershop sort", parseFloat(a.dist),parseFloat(b.dist));
    //     // 오름차순
    //     return parseFloat(a.dist) < parseFloat(b.dist)
    //       ? -1
    //       : parseFloat(a.dist) > parseFloat(b.dist)
    //       ? 1
    //       : 0;
    //   });


    //   user["storelist"] = allshoplist;
    //   user["premiumshoplist"] = premiumshoplist;
    //   user["goldshoplist"] = goldshoplist;
    //   user["silvershoplist"] = silvershoplist;

    
    
    //   const deviceid = user.deviceid;
    //   const recentstoresTmp = await get_storeallview({ deviceid });
    //   user["storeviewlist"] = recentstoresTmp;



    //   dispatch2(user);

    //   console.log("silvershoplist", user);

      
    //   // const userObjString = JSON.stringify(user);
    //   // window.localStorage.setItem("user", userObjString);
    //   setLoading(true);        
    // }
    // FetchData();
  }, []);

  useEffect(()=>{

  },[])


  return (
    <Container style={containerStyle}>
        <Splash/>
    </Container>
  );
}

export default Splashcontainer;
