

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';

import Layout from '../screen/Layout/HomeLayout';
import Configcontainer from '../container/Configcontainer';
import ConfigLayout from '../screen/Layout/ConfigLayout';
import Storecontainer from '../container/Storecontainer';
import PrevLayout from '../screen/Layout/PrevLayout';
import MyStorecontainer from '../container/Mystorecontainer';

const Container = styled.div`

`



const Mystorepage = ({containerStyle}) => {

  const {state} = useLocation();

  console.log("Storepage", state);

  return (
      <MyStorecontainer STORE_ID={state.STORE_ID} SCROLLY={state.SCROLLY}/>

  );
}

export default Mystorepage;
