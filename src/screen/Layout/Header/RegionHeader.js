

import React, { Fragment, useEffect} from "react";

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";
import ImageLeftButton from "../../../common/ImageLeftButton";

const Container = styled.div`
  display:flex;
  flex-direction: row;
  align-items : center;
  justify-content : space-between;
  height:50px;
  background-color :white;
  color :white;
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;

`

const RegionHeader = ({containerstyle, headername}) => {

  const navigation = useNavigate();


  const _handleSearch =() =>{
    navigation("/search")
  }

  return (
    <Container>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginLeft:20}}>
        <Text value={headername} size={18}></Text>
      </div>

      <div onClick={_handleSearch}>
        <ImageLeftButton buttontext={'검색'} round={false} source={imageDB.search} imgwidth={15} 
        containerStyle={{marginRight:"15px"}} />
      </div>

    </Container>


  );
};

export default RegionHeader;