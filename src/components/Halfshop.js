import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import Image from '../common/Image';

const Container = styled.div`

`
const Row = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`
const ProductImg = styled.image``

const Halfshop = ({containerStyle, shopdata}) => {

  const navigate = useNavigate();
  
  const _handleStore = () =>{
    navigate("/store", { state: { STORE: shopdata.STORE } });
  }
  return (
    <Container style={containerStyle} onClick={_handleStore}>
        <img src={shopdata.STORE.STOREIMAGEARY[0]} style={{width:"90px", height:"90px", borderRadius:10}}></img>
        <Text size={12} value = {shopdata.STORE.STORENAME} />
    </Container>
  );
}

export default Halfshop;
