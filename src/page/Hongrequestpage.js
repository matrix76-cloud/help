import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";

import Layout from "../screen/Layout/HomeLayout";
import DetailLayout from "../screen/Layout/DetailLayout";
import Channelcontainer from "../container/Channelcontainer";
import ChatLayout from "../screen/Layout/ChatLayout";
import { UserContext } from "../context/User";
import { get_channelInfo } from "../service/ChatService";
import ChannelLayout from "../screen/Layout/ChannelLayout";
import Hongrequestcontainer from "../container/Hongrequestcontainer";
import DetailTaskLayout from "../screen/Layout/DetailHongLayout";

const Container = styled.div``;

const Hongrequestpage = ({ containerStyle }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, dispatch2 } = useContext(UserContext);
  const [headername, setHeadername] = useState('');
  const [refresh, setRefresh] = useState(1);




  useEffect(() => {
    setHeadername(headername);
  }, [refresh])

  return (
    <DetailTaskLayout
      menu={false}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={
        '지원자 목록'
      }
    >
      <Hongrequestcontainer  />
    </DetailTaskLayout>
  );
};

export default Hongrequestpage;
