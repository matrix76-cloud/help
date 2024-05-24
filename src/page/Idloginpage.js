

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ConfigLayout from '../screen/Layout/ConfigLayout';
import Logincontainer from '../container/Logincontainer';
import PrevLayout from '../screen/Layout/PrevLayout';
import Idlogincontainer from '../container/Idlogincontainer';

const Container = styled.div`

`

const Idloginpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'아이디 패스워드 로그인'}>
      <Idlogincontainer/>
    </PrevLayout>
  );
}

export default Idloginpage;
