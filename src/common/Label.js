import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`

`

const ContentText = styled.span`

  font-size: ${({fontsize}) => fontsize};
  font-weight : ${({fontweight}) => fontweight};
`

const Label = ({containerStyle, content, fontweight, callback, fontsize, press}) => {
  
  const _handlePress = () =>{
    callback();
  }

  return (

    <>
    {
      press == true ? (<Container style={containerStyle} onClick={_handlePress} >
      <ContentText  fontweight={fontweight} fontsize={fontsize}>{content}</ContentText> 
      </Container>):(<Container style={containerStyle} >
      <ContentText  fontweight={fontweight} fontsize={fontsize}>{content}</ContentText>
      </Container>)
    }
    </>

  );
}

Label.defaultProps = {
  fontweight : 700,
  fontsize:20,

}

export default Label;
