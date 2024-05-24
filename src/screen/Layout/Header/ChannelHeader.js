

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
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  background-color: #d8d8d8;
  color: white;
  position: fixed;
  top: 0px;
  right:0px;
  z-index: 10;
  width: 100%;

`;
const ButtonLayer = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  right: 0px;
`;
const ExpandDiv = styled.div`
  background-color: #fff;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const Member = styled.div`
  height: 20px;
  border: 1px solid #444343;
  color: #444343;
  font-size: 12px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0px 5px;
  margin-left: 5px;
  margin-bottom:5px;
`;

const ChannelHeader = ({containerStyle,CHANNEL_ID, headername}) => {

  const navigation = useNavigate();
  const [expand, setExpand] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [channelinfo, setChannelinfo] = useState({});
  const [usernames, setUsernames] = useState([]);
  const { user, dispatch2 } = useContext(UserContext);

  const _handlePrev = () =>{
    navigation(-1);

  }
  const _handleUser = () => {
    setExpand(!expand);
    
    setRefresh(refresh => refresh + 1);
  }
  const _handleLogout = async () => {

    if (channelinfo.OWNERID == user.uid) {
      if (!window.confirm("방주인으로 이방에서 나가게 되면 방은 자동으로 없어집니다. 방에서 나가시겠습니까?")) {
        return;
      }
    }
    let ALLUSER = [];
    const FindIndex = channelinfo.ALLUSER.findIndex((x) => x == user.uid);
    channelinfo.ALLUSER.splice(FindIndex, 1);
    ALLUSER = channelinfo.ALLUSER;

    const u = await updateChannel({ ALLUSER, CHANNEL_ID });
    let msg = ""; 
    if (channelinfo.OWNERID == user.uid) {
      const USER_ID = channelinfo.OWNERID;
      const a = await get_storeinfoForUSERID({ USER_ID });

       msg = a.STORENAME + "님이 방에서 퇴장하였습니다";
    } else {
       msg = user.nickname + "님이 방에서 퇴장하였습니다";
    }



    const CHAT_CONTENT_TYPE = CHATCONTENTTYPE.EXIT;
    try {
      await createIntroMessage({
        CHANNEL_ID,
        msg,
        CHAT_CONTENT_TYPE,
        user,
      });
      await createMainMessage({
        CHANNEL_ID,
        msg,
        user,
      });
    } catch (e) {
      console.log("error", e);
    }

    navigation("/chat");

  }

  useEffect(() => {
    async function FetchData() {
      const channelitem = await get_channelInfo({ CHANNEL_ID });
      setChannelinfo(channelitem);

      let names = [];
      channelitem.ALLUSER.map(async(data, index) => {
        let USER_ID = data;
        const user = await get_userInfoForUID({ USER_ID });
    
        names.push(user.USER_NICKNAME);
      });
      await useSleep(1000);

      setUsernames(names);
      
    }
    FetchData();
  },[])
  useEffect(() => {
    setExpand(expand);
    if (expand) {
      window.scrollTo(0, 0);
    }
  }, [refresh])
  

  return (
    <Container>
      <Row>
        <div></div>
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

        <ButtonLayer>
          <SlUser size={20} color={"#000"} onClick={_handleUser} />
          {/* <SlUserUnfollow size={20} color={"#000"} /> */}
          <SlLogout size={20} color={"#000"} onClick={_handleLogout} />
        </ButtonLayer>
      </Row>
      {expand == true && (
        <div style={{ paddingTop: 50 }}>
          <div
            style={{
              fontSize: 14,
              display: "flex",
              background: "#fff",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
            }}
          >
            {"대화 참여자(" + channelinfo.ALLUSER.length + "명)"}
          </div>
          <ExpandDiv>
            {usernames.map((data, index) => (
              <Member>{data}</Member>
            ))}
          </ExpandDiv>
        </div>
      )}
    </Container>
  );
};

export default ChannelHeader;