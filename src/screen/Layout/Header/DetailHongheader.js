import React, { Fragment, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imageDB } from "../../../utility/imageData";
import Image from "../../../common/Image";
import Text from "../../../common/Text";
import SearchButton from "../../../common/SearchButton";
import ImageLeftButton from "../../../common/ImageLeftButton";
import Checkfilter from "../../../components/Checkfilter";
import { UserContext } from "../../../context/User";
import { SearchAddress, distanceFunc } from "../../../utility/common";
import {
  get_userInfoForDevice,
  login,
  update_userdevice,
} from "../../../service/UserService";
import { TYPE } from "../../../utility/maroneDefine";

import { AiOutlineCaretDown, AiOutlineDown } from "react-icons/ai";
import PostionModalEx from "../../../components/PositionModalEx";
import { get_stores } from "../../../service/StoreService";
import { ROLETYPE } from "../../../utility/contentDefine";
import { BsArrowClockwise } from "react-icons/bs";

const Container = styled.div``;

const LogoText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'SF-Pro-Text-Semibold';
    font-weight : 600;
    padding-top: 5px;
    font-size: 15px;
    padding-left: 10px;
    color :#000;

`

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`
const Switch = styled.div`
  border: 1px solid #ededed;
  padding: 5px 5px;
  margin-left: 5px;
  margin-top: 5px;
  font-size: 10px;
  border-radius: 5px;
  background: #ededed;
  display: flex;
  align-items: center;

`

const DetailHongheader = ({headername}) => {
  const navigation = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);

  const _handlePrev = () =>{
    navigation(-1);

  }

  const [refresh, setRefresh] = useState(1);

  let oldScroll = 0;




  useEffect(() => {

  }, []);

  const postlogin = async (email, password, DEVICEID) => {
    const user2 = await login({ email, password });

    if (user2 == -1) {
      const USERID = user2.user.uid;

      const updatedevice = await update_userdevice({ USERID, DEVICEID });
    }

    return new Promise((resolve, reject) => {
      resolve(user2);
    });
  };

  const getuserInfoForPhone = async ({ DEVICEID }) => {
    const USER = await get_userInfoForDevice({ DEVICEID });

    return new Promise((resolve, reject) => {
      resolve(USER);
    });
  };

  const _handleSwitch = () =>{





    setRefresh((refresh) => refresh +1);

  }

  useEffect(() => {


  }, [refresh]);

  return (
    <Row>
      <div onClick={_handlePrev} style={{display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"center", height:50}}>
        <Image source={imageDB.prev} containerStyle={{width:15, paddingLeft:10,height:20}}/>
        <Text size={18} value={headername} containerStyle={{paddingLeft:10}}></Text>
      </div>
    </Row>
  );
};

export default DetailHongheader;
