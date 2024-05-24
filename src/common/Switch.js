import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import './Switch.css';

const Container = styled.div`

`
const ProductContentSelect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`

const Switch = ({containerStyle, button1, button2, Switchcallback, checkstatus}) => {
  const [check, setCheck] = useState(checkstatus);
  const _handleCheck = () =>{
    setCheck(!check);
    Switchcallback(check);
  }

  return (
    <Container style={containerStyle}>
  
    {
      check == true ?  (
          <>
          <label class="switch" style={{marginLeft:5}}>
            <input type="checkbox" checked onClick={_handleCheck} value={check} />
            <span class="slider checkround">{button1}</span>    
          </label>
          </> 
          
          ) : ( 
          <>
          <label class="switch" style={{marginLeft:5}}>
            <input type="checkbox"  onClick={_handleCheck} value={check} />
            <span class="slider round">{button2}</span>                     
          </label>  
          </>
        )
    }
    </Container>
  );
}

export default Switch;
