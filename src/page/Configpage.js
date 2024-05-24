

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import Layout from '../screen/Layout/HomeLayout';
import Configcontainer from '../container/Configcontainer';
import ConfigLayout from '../screen/Layout/ConfigLayout';

const Container = styled.div`

`

const Configpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <ConfigLayout menu ={true} bottom ={false} header={true} headerdetail={true} headername={'내정보 설정'}>
      <Configcontainer/>
    </ConfigLayout>
  );
}

export default Configpage;
