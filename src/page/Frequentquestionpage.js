
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Searchcontainer from '../container/Searchcontainer';
import DetailLayout from '../screen/Layout/DetailLayout';
import PrevLayout from '../screen/Layout/PrevLayout';
import Frequentquestioncontainer from '../container/Frequentquestioncontainer';

const Container = styled.div`

`

const Frequentquestionpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu={false} bottom={false} header={true} headername={'고객 문의'}>
      <Frequentquestioncontainer/>
    </PrevLayout>

  );
}

export default Frequentquestionpage;
