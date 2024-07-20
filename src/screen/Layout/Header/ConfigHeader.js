

import React, { Fragment, useEffect} from "react";

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";
import { GrDocumentText } from "react-icons/gr";
import { Badge } from "@mui/material";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.05);
`

const ConfigHeader = ({containerStyle, headername}) => {

  const navigation = useNavigate();

  const _handleconfig = () =>{
    navigation("/config");
  }

  const _handleDoc = () =>{
    navigation("/chat");
  }
 
  return (
    <Container>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginLeft:20}}>
        <Text value={headername} size={18}></Text>
      </div>

  
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginRight:10, width:50}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}} >
          <Image source={imageDB.bell} containerStyle={{width:20}} />
          <Badge badgeContent={0} color="warning"  style={{paddingBottom:15}}></Badge>
        </div>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}} onClick={_handleDoc}>
        <IoChatbubbleEllipsesOutline size={22} color={'#000'} />
          <Badge badgeContent={1} color="warning" style={{paddingBottom:15}} className="alertblink" ></Badge>
        </div>
      </div>

    </Container>


  );
};

export default ConfigHeader;