import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Splash from '../common/Splash';
import { SearchAddress, distanceFunc, useSleep } from '../utility/common';
import { get_userInfoForDevice, login, update_userdevice } from '../service/UserService';
import { UserContext } from '../context/User';
import { get_storeallview, get_stores } from '../service/StoreService';

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

        SearchAddress(x, y).then((regionresult) => {
          user["region1"] = regionresult.region1;
          user["region2"] = regionresult.region2;
          user["latitude"] = regionresult.latitude;
          user["longitude"] = regionresult.longitude;
          user["deviceid"] = data.deviceid;
          dispatch2(user);
          // setRegion(user.region1 + " " + user.region2);
          const DEVICEID = data.deviceid;

          async function FetchData() {
            const stores = await get_stores();

            console.log("stores", stores);
            let premiumshoplist = [],
              goldshoplist = [],
              silvershoplist = [];

            stores.map((data) => {
              const lat1 = y;
              const lon1 = x;
              const lat2 = data.STORELATITUDE;
              const lon2 = data.STORELONGITUDE;
              const dist = distanceFunc(lat1, lon1, lat2, lon2);

              // console.log("dist", dist, user.distance);
              let policydistance = 0;

              if (user.distance == "") {
                policydistance = 10;
              } else {
                policydistance = user.distance;
              }
              if (dist <= policydistance) {
                if (data.STORELEVEL.indexOf("premium") != -1) {
                  data["dist"] = dist;
                  premiumshoplist.push(data);
                }
                if (data.STORELEVEL.indexOf("gold") != -1) {
                  data["dist"] = dist;
                  goldshoplist.push(data);
                }
                if (data.STORELEVEL.indexOf("silver") != -1) {
                  data["dist"] = dist;
                  silvershoplist.push(data);
                }
              }
            });

            premiumshoplist.sort(function (a, b) {
              // 오름차순
              return parseInt(a.dist) < parseInt(b.dist)
                ? -1
                : parseInt(a.dist) > parseInt(b.dist)
                ? 1
                : 0;
            });
            goldshoplist.sort(function (a, b) {
              // 오름차순
              return parseInt(a.dist) < parseInt(b.dist)
                ? -1
                : parseInt(a.dist) > parseInt(b.dist)
                ? 1
                : 0;
            });
            silvershoplist.sort(function (a, b) {
              // 오름차순
              return parseInt(a.dist) < parseInt(b.dist)
                ? -1
                : parseInt(a.dist) > parseInt(b.dist)
                ? 1
                : 0;
            });

            user["storelist"] = stores;
            user["premiumshoplist"] = premiumshoplist;
            user["goldshoplist"] = goldshoplist;
            user["silvershoplist"] = silvershoplist;

            dispatch2(user);
            getuserInfoForPhone({ DEVICEID }).then((result) => {
              const USER = result;

              if (USER != null) {
                let email = USER.USER_ID;
                let password = USER.USER_PW;

                postlogin(email, password, DEVICEID).then((result) => {
                  user["email"] = email;
                  user["uid"] = result.user.uid;
                  user["deviceid"] = DEVICEID;
                  user["type"] = USER.USER_TYPE;
                  user["nickname"] = USER.USER_NICKNAME;
                  user["user_type"] = USER.USER_TYPE;
                  user["region1"] = regionresult.region1;
                  user["region2"] = regionresult.region2;
                  user["latitude"] = regionresult.latitude;
                  user["longitude"] = regionresult.longitude;
                  user["distance"] = USER.DISTANCE;

                  dispatch2(user);
                });
              } else {
                user["region1"] = regionresult.region1;
                user["region2"] = regionresult.region2;
                user["latitude"] = regionresult.latitude;
                user["longitude"] = regionresult.longitude;
                user["deviceid"] = DEVICEID;
                dispatch2(user);
              }
            });

            const deviceid = DEVICEID;

            const recentstoresTmp = await get_storeallview({
              deviceid,
            });

            user["storeviewlist"] = recentstoresTmp;
            dispatch2(user);
            const userObjString = JSON.stringify(user);
            window.localStorage.setItem("user", userObjString);


            setLoading(true);
          }

          FetchData();

    
        });
      } else if (type === "CURRENTPOSITION") {
        const x = data.longitude;
        const y = data.latitude;

        SearchAddress(x, y).then((regionresult) => {
          user["region1"] = regionresult.region1;
          user["region2"] = regionresult.region2;
          user["latitude"] = regionresult.latitude;
          user["longitude"] = regionresult.longitude;

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
    user["distance"] = 50;
    user["uid"] = "diKqkPhsF2Q6HaWDDq8hqQGJx512";
    user["nickname"] = "작은너구리213";
    

    async function FetchData() {
      const stores = await get_stores();

      console.log("stores", stores);
      let premiumshoplist = [],
        goldshoplist = [],
        silvershoplist = [];

      stores.map((data) => {
        const lat1 = "37.630013553801";
        const lon1 = "127.15545777991";
        const lat2 = data.STORELATITUDE;
        const lon2 = data.STORELONGITUDE;
        const dist = distanceFunc(lat1, lon1, lat2, lon2);

        // console.log("dist", dist, user.distance);
        let policydistance = 0;

        if (user.distance == "") {
          policydistance = 10;
        } else {
          policydistance = user.distance;
        }
        if (dist <= policydistance) {
          if (data.STORELEVEL.indexOf("premium") != -1) {
            data["dist"] = dist;

            const STORE_ID = shopdata.STORE_ID;
            const reviewdata = await get_review({ STORE_ID });
      
            data["reviewdata"]
            const USER_ID = shopdata.USER_ID;
            const checks = await get_checkuser({ USER_ID });

            premiumshoplist.push(data);
          }
          if (data.STORELEVEL.indexOf("gold") != -1) {
            data["dist"] = dist;
            goldshoplist.push(data);
          }
          if (data.STORELEVEL.indexOf("silver") != -1) {
            data["dist"] = dist;
            silvershoplist.push(data);
          }
        }
      });

      premiumshoplist.sort(function (a, b) {
        // 오름차순
        return parseInt(a.dist) < parseInt(b.dist)
          ? -1
          : parseInt(a.dist) > parseInt(b.dist)
          ? 1
          : 0;
      });
      goldshoplist.sort(function (a, b) {
        // 오름차순
        return parseInt(a.dist) < parseInt(b.dist)
          ? -1
          : parseInt(a.dist) > parseInt(b.dist)
          ? 1
          : 0;
      });

      silvershoplist.sort(function (a, b) {
        // 오름차순
        return parseInt(a.dist) < parseInt(b.dist)
          ? -1
          : parseInt(a.dist) > parseInt(b.dist)
          ? 1
          : 0;
      });
      
      user["storelist"] = stores;
      user["premiumshoplist"] = premiumshoplist;
      user["goldshoplist"] = goldshoplist;
      user["silvershoplist"] = silvershoplist;
    
      const deviceid = user.deviceid;
      const recentstoresTmp = await get_storeallview({ deviceid });
      
      user["storeviewlist"] = recentstoresTmp;



      dispatch2(user);
      
      const userObjString = JSON.stringify(user);
      window.localStorage.setItem("user", userObjString);
      setLoading(true);        
    }
    FetchData();
  }, []);


  return (
    <Container style={containerStyle}>
        <Splash/>
    </Container>
  );
}

export default Splashcontainer;
