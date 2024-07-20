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
import HelpfilterLayout from "../screen/Layout/HelpfilterLayout";
import Helpfiltercontainer from "../container/Helpfiltercontainer";

const Helpfilterpage = () => {
  const { user, dispatch2 } = useContext(UserContext);



  return (
    <HelpfilterLayout menu={true} bottom={false} header={true} headerdetail={false}>
      <Helpfiltercontainer />
    </HelpfilterLayout>
  );
};

export default Helpfilterpage;
