import React,{useState, useEffect,useWindowDimensions} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Image from './Image';
import Text from './Text';
import useDimensions from "react-use-dimensions";
import { imageDB } from '../utility/imageData';

const Container = styled.div`
`

const Splash = ({containerStyle}) => {

  const navigate = useNavigate();
  const [ref, { x, y, width, height }] = useDimensions();


  return (
    <Container style={containerStyle}>
      <img src={imageDB.maroneperson} style={{width:"150px", height:"150px",
      position: "absolute",
      top: "350px",
      left: "26%"}}/>
    </Container>
  );
}

export default Splash;
