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
import { GrDocumentText } from "react-icons/gr";
import { Badge } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Container = styled.div``;

const LogoText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'SF-Pro-Text-Semibold';
    font-weight:600;
    padding-top: 5px;
    font-size: 20px;
    padding-left: 10px;
    color :#ff4e19;

`

const CommunityHeader = () => {
  const navigation = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);

  const [refresh, setRefresh] = useState(1);
  const [region, setRegion] = useState("");

  const [positionstatus, setPositionstatus] = useState(false);



  let oldScroll = 0;

  const _handlePrev = () => {
    navigation(-1);
  };
  const _handleSearch = () => {
    navigation("/search");
  };

  const _handleHome = () => {
    navigation("/loading");
  };
  const _handlePosition = () => {
    setPositionstatus(!positionstatus);
    setRefresh((refresh) => refresh + 1);
  };

  const positioncallback = () => {
    setPositionstatus(false);
    setRefresh((refresh) => refresh + 1);
  };


  useEffect(() => {

    setRegion(user.region1 + " " + user.region2);

    const handleHeader = () => {
      if (oldScroll > window.scrollY) {
        document.getElementById("header").style.top = "0px";
        document.getElementById("header").style.height = "40px";
      } else {
        document.getElementById("header").style.position = "fixed";
        document.getElementById("header").style.top = "0px";
        document.getElementById("header").style.height = "40px";
      }
      oldScroll = window.scrollY;
    };

    window.addEventListener("scroll", handleHeader);

    return () => {
      window.removeEventListener("scroll", handleHeader);
    };
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


  useEffect(() => {
    setPositionstatus(positionstatus);
  }, [refresh]);

  const _handleconfig = () =>{
    navigation("/config");
  }

  const _handleDoc = () =>{
    navigation("/chat");
  }
  

  return (
    <Container
      id="header"
      style={{
        zIndex: 999,
        position: "fixed",
        background: "#fff",
        width: "100%",
        height: "60px",
        top: -10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {positionstatus == true ? (
        <PostionModalEx callback={positioncallback}></PostionModalEx>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 5,
          marginLeft: 0,
          width:'50%'
        }}
      >
        {
          <>
      
            {
              <div onClick={_handlePosition}>
                <Text
                  value={region}
                  size={18}
                  containerStyle={{ fontWeight: 700 }}
                ></Text>
              </div>
            }
            <div
              style={{ display: "flex", paddingLeft: 5 }}
              onClick={_handlePosition}
            >
              <AiOutlineCaretDown size={22} />
            </div>
          </>
        }
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

export default CommunityHeader;
