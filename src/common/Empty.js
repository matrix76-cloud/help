import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';
import Image from './Image';
import Text from './Text';
import { theme } from '../theme/theme';

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content : center;
  align-items : center;

`

const Empty = ({containerStyle, emptydata}) => {

  const navigate = useNavigate();

  return (
    <Container style={containerStyle}>
      <Image source={imageDB.question} containerStyle={{width:"30px"}} round={false} />
      <div style={{marginTop:20}}>
        <Text value={emptydata} size={14} color={theme.grey} />
      </div>
 
    </Container>
  );
}

export default Empty;
