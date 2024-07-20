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
import Detailhongcontainer from "../container/Detailtaskcontainer";

import DetailTaskLayout from "../screen/Layout/DetailHongLayout";
import Detailtaskcontainer from "../container/Detailtaskcontainer";
import Detailtaskcontainer2 from "../container/Detailtaskcontainer2";


const DetailTaskpage2 = () => {
  const { user, dispatch2 } = useContext(UserContext);
  const [refresh, setRefresh] = useState(1);

  const {state} = useLocation();


  console.log("DetailTaskpage", state.Item);

  return (
    <DetailTaskLayout item={state.Item} menu={true} bottom={false} header={true} headerdetail={false}>
      <Detailtaskcontainer2 item={state.Item}/>
    </DetailTaskLayout>
  );
};

export default DetailTaskpage2;
