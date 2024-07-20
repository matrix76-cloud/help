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
import Infocontainer from "../container/Infocontainer";
import DetailLayout from "../screen/Layout/DetailLayout";
import PrevLayout from "../screen/Layout/PrevLayout";
import LadyInfocontainer from "../container/LadyInfocontainer";

const Infopage = () => {
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


  return (
    <PrevLayout
      menu={true}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"홍여사 서비스에 대해 알아보기"}
    >
      <Infocontainer />
    </PrevLayout>
  );
};

export default Infopage;
