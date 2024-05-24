

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';

import Layout from '../screen/Layout/HomeLayout';
import Configcontainer from '../container/Configcontainer';
import ConfigLayout from '../screen/Layout/ConfigLayout';
import Storecontainer from '../container/Storecontainer';
import PrevLayout from '../screen/Layout/PrevLayout';

const Container = styled.div`

`



const Storepage = ({containerStyle}) => {

  const {state} = useLocation();

  console.log("Storepage", state.STORE);

  return <Storecontainer STORE={state.STORE} SCROLLY={state.SCROLLY} REFRESH={state.REFRESH} />;
}

export default Storepage;
