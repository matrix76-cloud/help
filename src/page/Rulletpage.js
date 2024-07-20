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
import RoomInfocontainer from "../container/RoomInfocontainer";
import Communitycontainer from "../container/Communitycontainer";
import Rulletcontainer from "../container/Rulletcontainer";

const Rulletpage = () => {


  return (
    <PrevLayout
      menu={true}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"홍여사 경품"}
    >
      <Rulletcontainer />
    </PrevLayout>
  );
};

export default Rulletpage;
