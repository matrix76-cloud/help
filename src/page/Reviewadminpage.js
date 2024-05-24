
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Reviewadmincontainer from '../container/Reviewadmincontainer';

const Container = styled.div`

`

const Reviewadminpage = ({containerStyle}) => {

  const {state} = useLocation();

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'댓글관리'}>
      <Reviewadmincontainer STORE_ID={state.STORE_ID}/>
    </PrevLayout>
  );
}

export default Reviewadminpage;
