

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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.05);
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
        <div onClick={_handlePrev} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Image source={imageDB.prev} containerStyle={{width:15, paddingLeft:10,height:20}}/>

         
          <Text size={20} value={headername} containerStyle={{paddingLeft:10}}></Text>
          

        </div>
    
    
      </Row>

    </Container>


  );
};

export default PrevHeader;