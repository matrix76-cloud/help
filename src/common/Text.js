import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
  font-size : ${({size}) =>size}px;
  color :${({color}) =>color};
  display:flex;
  justify-content:center;
  align-items:center;
  text-align : left;

`

const Text = ({containerStyle, value, size, color,shorten}) => {


  return (
    <Container style={containerStyle} size={size} color={color}>

      <>
      {
        shorten == true ? (
          <>
          {value.slice(0, 25)}
          {value.length > 25 ? "..." : null}
          </>
        ):(<>{value}</>)
      }
      </>
      
    </Container>
  );
}

Text.defaultProps = {
  color :"#000"
}

export default Text;
