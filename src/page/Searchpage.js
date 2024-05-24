
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Searchcontainer from '../container/Searchcontainer';
import DetailLayout from '../screen/Layout/DetailLayout';
import PrevLayout from '../screen/Layout/PrevLayout';

const Container = styled.div`

`

const Searchpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'검색'}>
      <Searchcontainer/>
    </PrevLayout>

  );
}

export default Searchpage;
