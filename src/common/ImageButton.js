import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';
import Text from './Text';
import Image from './Image';

const Container = styled.div`

`

const ImageLayer = styled.div`
  background: #ededed;
  border-radius: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width : ${({width}) => width}
`

const ImageButton = ({containerStyle, source, buttontext, buttoncallback, imgwidth, round, width}) => {

  const navigate = useNavigate();

  const _handleClick = ()=>{
    buttoncallback(buttontext);
  }

  return (
    <Container style={containerStyle} onClick={_handleClick}>
        <ImageLayer width={width}>
           <Image source={source} Radius={round} imgwidth={imgwidth} />
        </ImageLayer>

        <Text value={buttontext} size = {10}  containerStyle={{ paddingTop:10, fontWeight:500}}/>
    </Container>
  );
}

export default ImageButton;
