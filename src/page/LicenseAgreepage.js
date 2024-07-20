import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import LicenseAgreeContainer from '../container/LicenseAgreecontainer';
import Splashcontainer from '../container/Splashcontainer';
import Layout from '../screen/Layout/HomeLayout';


const Container = styled.div`

`

const LicenseAgreepage = ({containerStyle}) => {

  const navigate = useNavigate();

  return (
    <Layout menu ={false} bottom ={false} header={false}>
      <LicenseAgreeContainer/>
    </Layout>

  );
}

export default LicenseAgreepage;
