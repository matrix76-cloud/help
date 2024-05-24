// import React,{useState, useEffect} from 'react';
// import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
// import styled from 'styled-components';

// const Container = styled.div`

// `

// const Badge = ({containerStyle}) => {

//   const navigate = useNavigate();
//    useEffect(()=>{
//     async function fetchData(){
// 		}
// 		fetchData();
//   }, [])



//   return (
//     <Container style={containerStyle}>
   
//     </Container>
//   );
// }

// export default Badge;


import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';



const TRANSPARENT = 'transparent';

const Container = styled.div`

`
const BadgeContainer = styled.div`


`
const BadgeText = styled.span`
    color:${({color}) => color};
`




const Badge  = ({containerStyle, count, height, width,backgroundColor, color, callback, Press})=>{

  const _handleBadge = ()=>{
    callback();
  }
    return(
        <Container style={containerStyle}>
        {
            Press == true ? (<BadgeContainer   width={width} height={height} backgroundColor={backgroundColor} onClick={_handleBadge}>
                <div style={{fontSize:15, justifyContent:"center", alignItems:"center", flex:1,paddingTop:-2}}><BadgeText color={color}>{count}</BadgeText></div></BadgeContainer>)
                :(            <BadgeContainer   width={width} height={height} backgroundColor={backgroundColor}>
            <div style={{fontSize:15, justifyContent:"center", alignItems:"center", flex:1,paddingTop:-2}}><BadgeText color={color}>{count}</BadgeText></div></BadgeContainer>)
        }
        </Container>
    );
}



Badge.propTypes = {
    containerStyle : PropTypes.object,
}

Badge.defaultProps ={
    width : 25,
    height : 25,
    backgroundColor : "#DFDFDF",
    color :"#949494"
}


export default Badge;

