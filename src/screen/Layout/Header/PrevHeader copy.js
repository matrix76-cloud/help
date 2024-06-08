

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

`

const PrevHeader = ({containerStyle, headername}) => {

  const navigation = useNavigate();

  const _handlePrev = () =>{
    navigation(-1);

  }

  return (

    <Container>
      <Row>
        <div onClick={_handlePrev}>
          <Image source={imageDB.prev} containerStyle={{width:15, paddingLeft:10,height:20}}/>
        </div>
        <div style={{paddingLeft:30, paddingTop:5}}>
          <Text size={18} value={headername}></Text>
        </div>
    
      </Row>

    </Container>


  );
};

export default PrevHeader;