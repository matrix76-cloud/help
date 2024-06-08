import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Loadingcontainer from '../container/Loadingcontainer';
import Loginloadingcontainer from '../container/Loginloadingcontainer';
import Splashcontainer from '../container/Splashcontainer';
import HomeLayout from '../screen/Layout/HomeLayout';
import Layout from '../screen/Layout/HomeLayout';

const Container = styled.div`

`

const Loginloadingpage = ({containerStyle}) => {

  const navigate = useNavigate();



  

  return (
    <HomeLayout menu ={true} bottom ={true} header={false}>
      <Loginloadingcontainer/>
    </HomeLayout>

  );
}

export default Loginloadingpage;
