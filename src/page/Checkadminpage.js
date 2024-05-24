

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import Checkadmincontainer from '../container/Checkadmincontainer';
import PrevLayout from '../screen/Layout/PrevLayout';

const Container = styled.div`

`

const Checkadminpage = ({containerStyle}) => {

  const {state} = useLocation();

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'관리사 출근부'}>
      <Checkadmincontainer STORE={state.STORE}/>
    </PrevLayout>
  );
}

export default Checkadminpage;
