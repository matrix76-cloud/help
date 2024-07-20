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
import Eventcontainer from "../container/Eventcontainer";
import PrevLayout from "../screen/Layout/PrevLayout";

const Container = styled.div``;

const Eventpage = ({ containerStyle }) => {
  const navigate = useNavigate();

  return (
    <PrevLayout
      menu={false}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"홍여사 이벤트"}
    >
      <Eventcontainer />
    </PrevLayout>
  );
};

export default Eventpage;
