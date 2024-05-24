import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';
import Text from './Text';
import Image from './Image';

const Container = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  border: 1px solid #ededed;
  padding: 5px;
  border-radius: 5px;
  width:50px;
`

const ImageLayer = styled.div`
  background: #fff;
  border-radius: 100px;
  width: ${({imgwidth}) => imgwidth}px;
  height:  ${({imgwidth}) => imgwidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageLeftButton = ({containerStyle, source, buttontext, buttoncallback, imgwidth, round}) => {

  const navigate = useNavigate();


  return (
    <Container style={containerStyle}>
        <ImageLayer imgwidth={imgwidth} >
           <Image source={source} imgwidth={imgwidth} round={round} />
        </ImageLayer>
        <Text value={buttontext} size = {12}  containerStyle={{fontWeight:500}}/>

    </Container>
  );
}

ImageLeftButton.defaultProps ={
  imgwidth : 15,
}

export default ImageLeftButton;
