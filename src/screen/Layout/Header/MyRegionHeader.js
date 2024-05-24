

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

  height:40px;
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
  justify-content : space-between;
  height:40px;
  background-color :white;
  color :white;
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
`

const MyRegionHeader = ({containerstyle, headername}) => {

  const navigation = useNavigate();

  const _handleSearch =() =>{
    navigation("/search")
  }
  const _handleMap =() =>{
    navigation("/detailmap")
  }

  return (
    <Container>
      <Row>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginLeft:20}}>
          <Text value={headername} size={18}></Text>
        </div>

        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginRight:15}}>

          <div onClick={_handleSearch}>
          <ImageLeftButton buttontext={'검색'} round={false} source={imageDB.search} imgwidth={15} containerStyle={{marginRight:5}} />
          </div>
          <div onClick={_handleMap}>
          <ImageLeftButton buttontext={'지도'} round={false} source={imageDB.gps} imgwidth={15} />
          </div>
        </div>
      </Row>


    </Container>


  );
};

export default MyRegionHeader;