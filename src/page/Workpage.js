
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
import Workcontainer from "../container/Workcontainer";
import WorkLayout from "../screen/Layout/WorkLayout";


const Workpage = () => {
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

  const switchrole =(role)=>{
    setRole(role);
    setRefresh((refresh) => refresh +1);
  }


  return (
    <WorkLayout callback={switchrole} menu={true} bottom={false} header={true} headerdetail={true}>
      <Workcontainer role={role}/>
    </WorkLayout>
  );
};

export default Workpage;
