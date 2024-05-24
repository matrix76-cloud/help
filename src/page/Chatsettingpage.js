

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Heartcontainer from '../container/Heartcontainer';
import Rangesettingcontainer from '../container/Rangesettingcontainer';
import Chatsettingcontainer from '../container/Chatsettingcontainer';

const Container = styled.div`

`

const Chatsettingpage = ({containerStyle}) => {

  const { state } = useLocation();
  
  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'대화방 설정'}>
      <Chatsettingcontainer STORE_ID={state.STORE_ID}/>
    </PrevLayout>
  );
}

export default Chatsettingpage;
