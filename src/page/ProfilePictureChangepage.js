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
import HongLayout from "../screen/Layout/HongLayout";
import Hongcontainer from "../container/Hongcontainer";
import { propTypes } from "react-bootstrap/esm/Image";
import { ROLETYPE } from "../utility/contentDefine";
import Roomcontainer from "../container/Roomcontainer";
import RoomLayout from "../screen/Layout/RoomLayout";
import PrevHeader from "../screen/Layout/Header/PrevHeader";
import ProfilePictureChangecontainer from "../container/ProfilePictureChangecontainer";
import PrevLayout from "../screen/Layout/PrevLayout";


const ProfilePictureChangepage = () => {
  const { user, dispatch2 } = useContext(UserContext);

  const [role, setRole] = useState(ROLETYPE.JUBU);
  const [refresh, setRefresh] = useState(1);

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
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'프로필 사진 변경'}>
      <ProfilePictureChangecontainer />
    </PrevLayout>
  );
};

export default  ProfilePictureChangepage;
