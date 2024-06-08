import React, { Fragment, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";
import ImageLeftButton from "../../../common/ImageLeftButton";
import Checkfilter from "../../../components/Checkfilter";
import { UserContext } from "../../../context/User";
import { SearchAddress, distanceFunc } from "../../../utility/common";
import {
  get_userInfoForDevice,
  login,
  update_userdevice,
} from "../../../service/UserService";
import { TYPE } from "../../../utility/maroneDefine";

import { AiOutlineCaretDown, AiOutlineDown } from "react-icons/ai";
import PostionModalEx from "../../../components/PositionModalEx";
import { get_stores } from "../../../service/StoreService";

const Container = styled.div``;

const Header = () => {
  const navigation = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);

  const [refresh, setRefresh] = useState(1);
  const [region, setRegion] = useState("");

  const [positionstatus, setPositionstatus] = useState(false);

  let oldScroll = 0;

  const _handlePrev = () => {
    navigation(-1);
  };
  const _handleSearch = () => {
    navigation("/search");
  };

  const _handleHome = () => {
    navigation("/loading");
  };
  const _handlePosition = () => {
    setPositionstatus(!positionstatus);
    setRefresh((refresh) => refresh + 1);
  };

  const positioncallback = () => {
    setPositionstatus(false);
    setRefresh((refresh) => refresh + 1);
  };


  useEffect(() => {
    const handleHeader = () => {
      if (oldScroll > window.scrollY) {
        document.getElementById("header").style.top = "0px";
        document.getElementById("header").style.height = "40px";
      } else {
        document.getElementById("header").style.position = "fixed";
        document.getElementById("header").style.top = "0px";
        document.getElementById("header").style.height = "40px";
      }
      oldScroll = window.scrollY;
    };

    window.addEventListener("scroll", handleHeader);

    return () => {
      window.removeEventListener("scroll", handleHeader);
    };
  }, []);

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

  // const listener = (event) => {
  //   const { data, type } = JSON.parse(event.data);
  //   if (type === "DEVICEID") {
  //     const x = data.longitude;
  //     const y = data.latitude;

  //     SearchAddress(x, y).then((regionresult) => {
  //       user["region1"] = regionresult.region1;
  //       user["region2"] = regionresult.region2;
  //       user["latitude"] = regionresult.latitude;
  //       user["longitude"] = regionresult.longitude;
  //       user["deviceid"] = data.deviceid;
  //       dispatch2(user);
  //       setRegion(user.region1 + " " + user.region2);
  //       const DEVICEID = data.deviceid;

  //       getuserInfoForPhone({ DEVICEID }).then((result) => {
  //         const USER = result;

  //         if (USER != null) {
  //           let email = USER.USER_ID;
  //           let password = USER.USER_PW;

  //           postlogin(email, password, DEVICEID).then((result) => {
  //             user["email"] = email;
  //             user["uid"] = result.user.uid;
  //             user["deviceid"] = DEVICEID;
  //             user["type"] = USER.USER_TYPE;
  //             user["nickname"] = USER.USER_NICKNAME;
  //             user["user_type"] = USER.USER_TYPE;
  //             user["region1"] = regionresult.region1;
  //             user["region2"] = regionresult.region2;
  //             user["latitude"] = regionresult.latitude;
  //             user["longitude"] = regionresult.longitude;
  //             user["distance"] = USER.DISTANCE;

  //             dispatch2(user);
  //           });
  //         } else {
  //           user["region1"] = regionresult.region1;
  //           user["region2"] = regionresult.region2;
  //           user["latitude"] = regionresult.latitude;
  //           user["longitude"] = regionresult.longitude;
  //           user["deviceid"] = DEVICEID;
  //           user["distance"] = 20;
  //           dispatch2(user);
  //         }
  //       });
  //     });
  //   } else if (type === "CURRENTPOSITION") {
  //     const x = data.longitude;
  //     const y = data.latitude;

  //     SearchAddress(x, y).then((regionresult) => {
  //       user["region1"] = regionresult.region1;
  //       user["region2"] = regionresult.region2;
  //       user["latitude"] = regionresult.latitude;
  //       user["longitude"] = regionresult.longitude;

  //       dispatch2(user);
  //       window.location.replace("/home");
  //     });
  //   }
  // };

  // useEffect(() => {
  //   setRegion(user.region1 + " " + user.region2);

  //   if (window.ReactNativeWebView) {
  //     /** android */
  //     document.addEventListener("message", listener);
  //     /** ios */
  //     window.addEventListener("message", listener);
  //   } else {
  //     // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
  //   }
  // }, []);

 // sample code
  // useEffect(() => {
  //   let DEVICEID = "245de8d2762f971f";
  //   user["deviceid"] = DEVICEID;
  //   user["region1"] = "남양주시";
  //   user["region2"] = "다산동";
  //   user["latitude"] = "37.630013553801";
  //   user["longitude"] = "127.15545777991";
  //   user["distance"] = 50;

  //   async function FetchData() {
  //     const stores = await get_stores();

  //     console.log("stores", stores);
  //     let premiumshoplist = [],
  //       goldshoplist = [],
  //       silvershoplist = [];

  //     stores.map((data) => {
  //       const lat1 = "37.630013553801";
  //       const lon1 = "127.15545777991";
  //       const lat2 = data.STORELATITUDE;
  //       const lon2 = data.STORELONGITUDE;
  //       const dist = distanceFunc(lat1, lon1, lat2, lon2);

  //       // console.log("dist", dist, user.distance);
  //       let policydistance = 0;

  //       if (user.distance == "") {
  //         policydistance = 10;
  //       } else {
  //         policydistance = user.distance;
  //       }
  //       if (dist <= policydistance) {
  //         if (data.STORELEVEL.indexOf("premium") != -1) {
  //           premiumshoplist.push(data);
  //         }
  //         if (data.STORELEVEL.indexOf("gold") != -1) {
  //           goldshoplist.push(data);
  //         }
  //         if (data.STORELEVEL.indexOf("silver") != -1) {
  //           silvershoplist.push(data);
  //         }
  //       }
  //     });

  //     user["premiumshoplist"] = premiumshoplist;
  //     user["goldshoplist"] = goldshoplist;
  //     user["silvershoplist"] = silvershoplist;
  //     dispatch2(user);
  //   }

  //   FetchData();

  //   // dispatch2(user);

  //   getuserInfoForPhone({ DEVICEID }).then((result) => {
  //     // console.log("phone", result);
  //     const USER = result;
  //     if (USER != null) {
  //       let email = USER.USER_ID;
  //       let password = USER.USER_PW;

  //       postlogin(email, password, DEVICEID).then((result) => {
  //         user["email"] = email;
  //         user["uid"] = result.user.uid;
  //         user["deviceid"] = DEVICEID;
  //         user["type"] = USER.USER_TYPE;
  //         user["nickname"] = USER.USER_NICKNAME;
  //         user["user_type"] = USER.USER_TYPE;
  //         user["region1"] = "남양주시";
  //         user["region2"] = "다산동";
  //         user["latitude"] = "37.630013553801";
  //         user["longitude"] = "127.15545777991";
  //         user["distance"] = USER.DISTANCE;

  //         dispatch2(user);
  //       });
  //     } else {
  //     }
  //   });

  //   // console.log("region", region);
  //   setRefresh((refresh) => refresh + 1);
  // }, []);


  useEffect(() => {
    setPositionstatus(positionstatus);
  }, [refresh]);

  return (
    <Container
      id="header"
      style={{
        zIndex: 999,
        position: "fixed",
        background: "#fff",
        width: "100%",
        height: "60px",
        top: -10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {positionstatus == true ? (
        <PostionModalEx callback={positioncallback}></PostionModalEx>
      ) : null}

      <div onClick={_handleHome}>
        <Image
          source={imageDB.logo}
          containerStyle={{ width: 55, paddingLeft: 10, height: 35 }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          width: 230,
        }}
      >
        {
          <>
            <Image
              onClick={_handlePosition}
              source={imageDB.gps}
              containerStyle={{ width: 18, display: "flex", marginRight: 10 }}
            />
            {
              <div onClick={_handlePosition}>
                <Text
                  value={user.region1 + " " + user.region2}
                  size={16}
                  containerStyle={{ fontWeight: 700 }}
                ></Text>
              </div>
            }
            <div
              style={{ display: "flex", paddingLeft: 5 }}
              onClick={_handlePosition}
            >
              <AiOutlineCaretDown size={22} />
            </div>
          </>
        }
      </div>
      <div style={{ marginTop: 5, marginRight: 15 }} onClick={_handleSearch}>
        <ImageLeftButton
          buttontext={"검색"}
          round={false}
          source={imageDB.search}
          imgwidth={15}
        />
      </div>
    </Container>
  );
};

export default Header;
