import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Image from './Image';


const TRANSPARENT = 'transparent';

const Container = styled.div`
    background-color :transparent;
    width :100%;
    position :absolute;
    z-index :2;
    top:330px;


`
const AdvertiseView= styled.div`



`


const AdvertiseCloseView = styled.div`
    display:flex;
    flex-direction : row;
    z-index :2;
    top:320px;
    left:240px;
    position:absolute;


`

const AdvertiseCloseText = styled.span`
    color : #ffffff;
    font-family : ${({theme}) =>theme.BOLD};
    font-size:14px;
`



const InitAlert  = ({containerStyle, Image, onCloseStop})=>{


    useEffect(() => {
    document.body.style= `overflow: hidden`;
    return () => document.body.style = `overflow: auto`
    }, [])

    return(
        <Container style={containerStyle}>
            <AdvertiseCloseView  >
                <div onClick={onCloseStop}>
                    <AdvertiseCloseText>오늘 하루보지 않기</AdvertiseCloseText>
                </div>         
            </AdvertiseCloseView>     
            <img src={Image} style={{width:"100%"}}/>
           

        </Container>
    );
}



InitAlert.propTypes = {
    containerStyle : PropTypes.object,
}

export default InitAlert;
