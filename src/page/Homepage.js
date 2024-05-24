import React, { useContext, useEffect, useState } from "react";
import Homecontainer from "../container/Homecontainer";
import Layout from "../screen/Layout/HomeLayout";
import HomeLayout from "../screen/Layout/HomeLayout";
import { UserContext } from "../context/User";
import { TYPE } from "../utility/maroneDefine";
import { useLocation } from "react-router-dom";
import {
  get_userInfoForDevice,
  login,
  update_userdevice,
} from "../service/UserService";

const Homepage = () => {
  const { user, dispatch2 } = useContext(UserContext);

  const {state} = useLocation();

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

  // const listener = (event) => {
  //   const { data, type } = JSON.parse(event.data);
  //   if (type === "DEVICEID") {
  //     const x = data.longitude;
  //     const y = data.latitude;
  //     const DEVICEID = data.deviceid;
  //     get_userInfoForDevice({ DEVICEID }).then((result) => {
  //       const USER = result;

  //       if (USER != null) {
  //         let email = USER.USER_ID;
  //         let password = USER.USER_PW;

  //         postlogin(email, password, DEVICEID).then((result) => {
  //           user["distance"] = USER.DISTANCE;
  //           dispatch2(user);
  //         });
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (window.ReactNativeWebView) {
  //     /** android */
  //     document.addEventListener("message", listener);
  //     /** ios */
  //     window.addEventListener("message", listener);
  //   } else {
  //     // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
  //   }
  // }, []);

  return (
    <HomeLayout menu={true} bottom={false} header={true} headerdetail={false}>
      <Homecontainer />
    </HomeLayout>
  );
};

export default Homepage;
