

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
  justify-content : space-between;
  color :white;
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
`

const ConfigHeader = ({containerStyle, headername}) => {

  const navigation = useNavigate();
 
  return (
    <Container>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginLeft:20}}>
        <Text value={headername} size={18}></Text>
      </div>

      <div style={{display:"flex", flexDirection:"row", marginRight:20, alignItems:"center"}}>
        <Image source={imageDB.bell} containerStyle={{width:15, marginRight:10}} />
      </div>

    </Container>


  );
};

export default ConfigHeader;