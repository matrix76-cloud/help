import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Chatcontainer from "../container/Chatcontainer";
import Layout from "../screen/Layout/HomeLayout";
import DetailLayout from "../screen/Layout/DetailLayout";

const Container = styled.div``;

const Chatpage = ({ containerStyle }) => {
  const navigate = useNavigate();

  return (
    <DetailLayout
      menu={true}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"채팅"}
    >
      <Chatcontainer />
    </DetailLayout>
  );
};

export default Chatpage;
