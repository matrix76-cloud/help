import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';

const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: flex-start;
  padding:20px;
`

const Storeowner = ({containerStyle, store}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
   
      <Text value={'사장님 한말씀'} containerStyle={{fontWeight:600}} size={14}  />
      <Text value={store.STORENOTICE} containerStyle={{marginTop:20}} size={14} />
    </Container>
  );
}

export default Storeowner;
