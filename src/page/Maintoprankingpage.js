

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Heartcontainer from '../container/Heartcontainer';
import Photocontainer from '../container/Photocontainer';
import Maintoprankingcontainer from '../container/Maintoprankingcontainer';

const Container = styled.div`

`

const Maintoprankingpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'Top 랭킹'}>
      <Maintoprankingcontainer/>
    </PrevLayout>
  );
}

export default Maintoprankingpage;
