

import React, { Fragment, useContext, useEffect, useState} from "react";

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";
import { SlLogout, SlUserUnfollow } from "react-icons/sl";
import { PiSiren } from "react-icons/pi";
import { SlUser } from "react-icons/sl";
import { createIntroMessage, createMainMessage, get_channelInfo, updateChannel } from "../../../service/ChatService";
import { useSleep } from "../../../utility/common";
import { get_userInfoForUID } from "../../../service/UserService";
import { UserContext } from "../../../context/User";
import { CHATCONTENTTYPE } from "../../../utility/contentDefine";
import { get_storeinfoForUSERID } from "../../../service/StoreService";

const Container = styled.div`
  height: 160px;
  background-color: #fff;
  color: white;
  position: fixed;
  top: 0px;
  right:0px;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid #bdb9b9;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:flex-start;
  height:${({height}) => height}px;
  width:100%;
  padding-left:20px;
`

const RowTask = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
  height:${({height}) => height}px;
  width:100%;
  padding: 0px 20px;
  flex-wrap: wrap;
  width: 90%;

`

const PrevItem = styled.div`
  position : absolute;
  top:20px;
  right:10px;

`



const RequestHeader = ({containerStyle, headername, task, step, allstep}) => {

  const navigation = useNavigate();

  const [stepstr, setStepstr] = useState('');
  const [steprate, setSteprate] = useState(0);

  const _handlePrev = () =>{
    navigation(-1);
  }

  useEffect(()=>{
 
    let str = allstep +"단계중 "+step+"단계를 설정하였습니다";
    setStepstr(str);

    setSteprate(step/allstep * 100);
  })
  return (
    <Container>
      <Row height={60}>
        <PrevItem onClick={_handlePrev}>
          <Image
            source={imageDB.close}
            containerStyle={{ width: 15, paddingLeft: 10, height: 20 }}
          />
        </PrevItem>
        <Text value={headername} size={20}></Text>
      </Row>
      <RowTask height={30}>
        <Text value={task} size={14}  color={'#999'}></Text>
      </RowTask>
  
      <Row height={30}>
 
        <progress class="progress" id="progress" value={steprate} min="0" max="100">
        </progress>
        <div style={{paddingLeft:10}}>
        <div style={{display:"flex"}}>
          <div><Text value={ parseInt(step / allstep *100) + '%'} size={14} color={'#FF4E19'} ></Text></div>
        </div>
        </div>
      </Row>
      <Row height={30}>
      <div style={{display:"flex"}}>
      <div><Text value={stepstr} size={14} color={'#FF4E19'} ></Text></div>
      </div>
      </Row>

    </Container>
  );
};

export default RequestHeader;