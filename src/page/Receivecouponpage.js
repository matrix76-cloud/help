import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Receivecouponcontainer from '../container/Receivecouponcontainer';
import PrevLayout from '../screen/Layout/PrevLayout';

const Container = styled.div`

`

const Receivecouponpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'받은 쿠폰'}>
      <Receivecouponcontainer/>
    </PrevLayout>
  );
}

export default Receivecouponpage;
