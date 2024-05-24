import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';


const Container = styled.div`
  margin-top:50px;
`


const Kakocentercontainer= ({ containerStyle }) => {
  const navigation = useNavigate();

   useEffect(()=>{
    async function fetchData(){


		}
		fetchData();
  }, [])




  return (
    <Container style={containerStyle}>

      <iframe  
      id ="map"
      border="0"
      style={{borderStyle:"none", width:"100%", height:"650px", marginTop:20}}
      src={'https://pf.kakao.com/_xnDdxgK'} />
      
    </Container>
  );
}

export default Kakocentercontainer;
