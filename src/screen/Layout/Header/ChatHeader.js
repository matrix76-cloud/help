

import React, { Fragment, useEffect} from "react";

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  background-color: #d8d8d8;
  color: white;
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
`;

const ChatHeader = ({containerStyle, headername}) => {

  const navigation = useNavigate();

  const _handlePrev = () =>{

    navigation(-1);

  }
  return (
    <Container>
      <div onClick={_handlePrev}>
        <Image
          source={imageDB.prev}
          containerStyle={{ width: 15, paddingLeft: 10, height: 20 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <Text value={headername} size={16}></Text>
      </div>

      <div>
        
      </div>
    </Container>
  );
};

export default ChatHeader;