

import React, { Fragment, useEffect} from "react";

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";
import ImageLeftButton from "../../../common/ImageLeftButton";
import Checkfilter from "../../../components/Checkfilter";

const Container = styled.div`
  display:flex;
  flex-direction: row;
  
  align-items : center;
  height:50px;
  background-color :white;
  color :white;
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
`

const Row = styled.div`
  display:flex;
  flex-direction: row;
  align-items : center;
  height:50px;
  background-color :white;
  color :white;
  position: fixed;
  top: 0px;
  z-index: 10;
  justify-content:center;

`

const PrevHeader = ({containerStyle, headername}) => {

  const navigation = useNavigate();

  const _handlePrev = () =>{
    navigation(-1);

  }

  return (

    <Container>
      <Row>
        <div onClick={_handlePrev} style={{display:"flex"}}>
          <Image source={imageDB.prev} containerStyle={{width:15, paddingLeft:10,height:20, marginTop:3}}/>

          <div style={{paddingLeft:15}}>
          <Text size={20} value={headername}></Text>
          </div>

        </div>
    
    
      </Row>

    </Container>


  );
};

export default PrevHeader;