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

const LadyInfopage = () => {
  const { user, dispatch2 } = useContext(UserContext);

  const {state} = useLocation();



  return (
    <PrevLayout
      menu={true}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"누가 홍여사가 될수 있나여?"}
    >
      <LadyInfocontainer />
    </PrevLayout>
  );
};

export default LadyInfopage;
