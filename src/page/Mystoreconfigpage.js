

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';

import Layout from '../screen/Layout/HomeLayout';
import Configcontainer from '../container/Configcontainer';
import ConfigLayout from '../screen/Layout/ConfigLayout';
import Storecontainer from '../container/Storecontainer';
import PrevLayout from '../screen/Layout/PrevLayout';
import MyStorecontainer from '../container/Mystorecontainer';
import MyStoreconfigcontainer from '../container/Mystoreconfigcontainer';

const Container = styled.div`

`



const Mystoreconfigpage = ({containerStyle}) => {

  const {state} = useLocation();

  console.log("Storepage", state);

  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'매장관리'}>
      <MyStoreconfigcontainer STORE_ID={state.STORE_ID} SCROLLY={state.SCROLLY}/>
    </PrevLayout>
  );
}

export default Mystoreconfigpage;
