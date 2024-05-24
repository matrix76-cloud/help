

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Heartcontainer from '../container/Heartcontainer';
import Detailmapcontainer from '../container/Detailmapcontainer';

const Container = styled.div`

`

const Detailmappage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'지도보기'}>
      <Detailmapcontainer/>
    </PrevLayout>
  );
}

export default Detailmappage;
