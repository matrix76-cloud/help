

import React, { Fragment, useEffect} from "react";

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";

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

const DetailHeader = ({containerStyle, headername}) => {

  const navigation = useNavigate();

  const _handlePrev = () =>{

    navigation(-1);

  }
  return (
    <Container>
 
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginLeft:20}}>
        <Text value={headername} size={18}></Text>
      </div>


    </Container>


  );
};

export default DetailHeader;