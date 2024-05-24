

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Heartcontainer from '../container/Heartcontainer';
import Photocontainer from '../container/Photocontainer';

const Container = styled.div`

`

const Photopage = ({containerStyle}) => {

  const {state} = useLocation();

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'매장사진'}>
      <Photocontainer STOREIMAGEARY = {state.STOREIMAGEARY}/>
    </PrevLayout>
  );
}

export default Photopage;
