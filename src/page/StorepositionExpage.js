

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Heartcontainer from '../container/Heartcontainer';
import StorepostionExcontainer from '../container/StorepositionExcontainer';

const Container = styled.div`

`

const StorepositionExpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'매장지도 자세히보기'}>
      <StorepostionExcontainer/>
    </PrevLayout>
  );
}

export default StorepositionExpage;
