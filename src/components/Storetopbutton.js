import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { imageDB } from '../utility/imageData';
import Image from '../common/Image';

const Container = styled.div`
  position: fixed;
  background-color: #ece7e790;
  border : 1px solid #ededed;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  bottom: 70px;
  right: 10px;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  flex-direction: column;
`

const Storetopbutton = ({containerStyle,callback}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])

  const _handleTop = () =>{
    callback();
  }


  return (
    <Container style={containerStyle} onClick={_handleTop}>
      <Image source={imageDB.Up} containerStyle={{width:"15px"}}/>
      <Text value={'맨위로'} size={10}/>
   
    </Container>
  );
}

export default Storetopbutton;
