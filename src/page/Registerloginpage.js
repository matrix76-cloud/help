

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ConfigLayout from '../screen/Layout/ConfigLayout';
import Logincontainer from '../container/Logincontainer';
import PrevLayout from '../screen/Layout/PrevLayout';
import Registerlogincontainer from '../container/Registerlogincontainer';

const Container = styled.div`

`

const Registerloginpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'회원가입'}>
      <Registerlogincontainer/>
    </PrevLayout>
  );
}

export default Registerloginpage;
