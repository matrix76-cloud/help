

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ConfigLayout from '../screen/Layout/ConfigLayout';
import Logincontainer from '../container/Logincontainer';
import PrevLayout from '../screen/Layout/PrevLayout';

const Container = styled.div`

`

const Loginpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'로그인 및 회원가입'}>
      <Logincontainer/>
    </PrevLayout>
  );
}

export default Loginpage;
