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
import Chatcontainer from "../container/Chatcontainer";
import Layout from "../screen/Layout/HomeLayout";
import DetailLayout from "../screen/Layout/DetailLayout";
import Channelcontainer from "../container/Channelcontainer";
import ChatLayout from "../screen/Layout/ChatLayout";
import { UserContext } from "../context/User";
import { get_channelInfo } from "../service/ChatService";
import ChannelLayout from "../screen/Layout/ChannelLayout";

const Container = styled.div``;

const Channelpage = ({ containerStyle }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, dispatch2 } = useContext(UserContext);
  const [headername, setHeadername] = useState('');
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
  
    if (state.GROUP == undefined && state.CHECKER == undefined) {
      setHeadername(state.NICKNAME + "님과의 채팅");
    } else if (state.GROUP != undefined) {
      setHeadername(state.NICKNAME + "그룹대화방");
    } else if (state.CHECKER != undefined) {
      setHeadername(state.NICKNAME + "관리사님과의 체팅");
    }
  }, [])

  useEffect(() => {
    setHeadername(headername);
  }, [refresh])

  return (
    <ChannelLayout
      menu={true}
      bottom={false}
      header={true}
      CHANNEL_ID={state.CHANNEL_ID}
      headerdetail={true}
      headername={
        state.GROUP == undefined
          ? state.NICKNAME + "님과의 채팅"
          : state.NICKNAME + "그룹대화방"
      }
    >
      <Channelcontainer CHANNEL_ID={state.CHANNEL_ID} GENERAL={state.GENERAL} GENERALNAME={state.NICKNAME} />
    </ChannelLayout>
  );
};

export default Channelpage;
