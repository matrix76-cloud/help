import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import Receivecouponcontainer from '../container/Receivecouponcontainer';
import PrevLayout from '../screen/Layout/PrevLayout';
import Storecouponcontainer from '../container/Storecouponcontainer';
import Eventcreatecontainer from '../container/Eventcreatecontainer';

const Container = styled.div`

`

const Eventcreatepage = ({containerStyle}) => {

  const {state} = useLocation();

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'업체 이벤트'}>
      <Eventcreatecontainer STORE_ID={state.STORE_ID}/>
    </PrevLayout>
  );
}

export default Eventcreatepage;
