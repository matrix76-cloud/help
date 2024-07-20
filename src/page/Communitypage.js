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
import CommunityLayout from "../screen/Layout/CommunityLayout";

const Communitypage = () => {


  return (
    <CommunityLayout
      menu={true}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"커뮤니티"}
    >
      <Communitycontainer />
    </CommunityLayout>
  );
};

export default Communitypage;
