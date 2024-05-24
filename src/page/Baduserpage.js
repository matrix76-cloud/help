
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Noticecontainer from '../container/Noticecontainer';
import Badusercontainer from '../container/Badusercontainer';

const Container = styled.div`

`

const Baduserpage = ({containerStyle}) => {

  const { state } = useLocation();
  
  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
      <PrevLayout menu={false} bottom={false} header={true} headername={'사용자관리'}>
      <Badusercontainer STORE_ID={state.STORE_ID} />
      </PrevLayout>

  );
}

export default Baduserpage;
