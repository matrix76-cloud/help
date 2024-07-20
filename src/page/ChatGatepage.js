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
import Layout from "../screen/Layout/HomeLayout";
import DetailLayout from "../screen/Layout/DetailLayout";
import ChatGatecontainer from "../container/ChatGatecontainer";

const Container = styled.div``;

const ChatGatepage = ({ containerStyle }) => {
  const navigate = useNavigate();

  return (
    <DetailLayout
      menu={false}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"대화"}
    >
      <ChatGatecontainer />
    </DetailLayout>
  );
};

export default ChatGatepage;
