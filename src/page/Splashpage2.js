import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Splashcontainer from '../container/Splashcontainer';
import Splashcontainer2 from '../container/Splashcontainer2';
import Layout from '../screen/Layout/HomeLayout';


const Container = styled.div`

`

const Splashpage2 = ({containerStyle}) => {

  const navigate = useNavigate();

  return (
    <Layout menu ={false} bottom ={false} header={false}>
      <Splashcontainer2/>
    </Layout>

  );
}

export default Splashpage2;
