import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { CommaFormatted, distanceFunc, getDateFullTime, getDateOrTime, getTime, useSleep } from "../utility/common";
import Loading from "../common/Loading";
import { collection, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../api/config";
import GuideLabel from "../components/GuildeLable";
import ChatItem from "../components/ChatGateItem";
import { UserContext } from "../context/User";
import Button from "../common/Button";
import { MdOutlineAttachFile } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { ImBlocked } from "react-icons/im";
import {
  SlShield,
  SlPaperClip,
  SlLogout,
  SlUserUnfollow,
} from "react-icons/sl";
import { PiSiren } from "react-icons/pi";
import { createIntroMessage, createMainMessage, createMessage, get_channelInfo } from "../service/ChatService";
import { setRef } from "@mui/material";
import { CHATCONTENTTYPE } from "../utility/contentDefine";
import { get_checkuser, uploadImage } from "../service/CheckService";
import { get_review } from "../service/ReviewService";
import LicenseModalEx from "../components/LicenseModalEx";
import ApplyModalEx from "../components/ApplyModalEx";


const Container = styled.div`
  background: #fff;

`;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom:100px;

`;
const InfoBox = styled.div`
  font-size: 15px;
  margin: 15px 0px 5px;
  background: #fff6df;
  margin: 10px auto;
  width: 85%;
  padding: 10px;
  text-align: left;
  line-height: 2;
  border-radius: 10px;
  color: #777309;

`
const ItemBoxA = styled.div`
  background: #e6e6e6;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 10px 0px 5px;
  color: black;
  display: flex;
  flex-direction: column;
  width: 150px;
  font-size: 14px;
  text-align: left;
`;

const ItemBoxB = styled.div`
  background: #fa7b07;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 10px 0px;
  color: white;
  display: flex;
  flex-direction: column;
  max-width: 50%;
  justify-content: flex-end;
  font-size: 14px;
  text-align: left;
`;
const ChatbtnLayer = styled.div`
  display: flex;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  position: relative;

`;
const ChatIconLayer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60px;
  justify-content: space-around;
`;

const InputChat = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  outline: 0;
  font-family: "SF-Pro-Text-Regular";
  font-size: 16px;
  padding: 5px;
`;

const BottomLine = styled.div`
  height: 50px;
  background-color: white;
  position: fixed;
  width: 100%;
  bottom: 0;
`;
const LoadingScreen = styled.div`
  height: 700px;
  width: 100%;
  background-color: #d8d8d8;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Enter = styled.div`
  margin-top: 5%;
  text-align: left;
  padding: 3% 10px;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  display:flex;
  margin-bottom:20px;
`

const ItemLayerA = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
  margin-bottom:5px;
`;
const ChatUserImg = styled.div`
  display: flex;
  justify-content: flex-start;
  color: #000;
  padding-left: 10px;
  font-size: 12px;
`;
const ItemLayerAname = styled.div`
  justify-content: flex-start;
  font-size: 12px;
  flex-direction: row;
  display: flex;
  padding-left: 10px;
`;
const ItemLayerAcontent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ItemLayerAdate = styled.div`
  font-size: 12px;
  width: 100px;
  display: flex;
  justify-content: flex-start;
  padding-bottom:10px;
`;

const ItemLayerB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ItemLayerBBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;


`;


const ItemLayerBdate = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2px;
`;
const ItemLayerBUnread = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: flex-end;
  color :#ff6e11;
  font-family:'SF-Pro-Text-Semibold';
`;
const ImageLayer = styled.image`
  width: 60%;
    height: 150px;
    padding: 10px;
    border-radius: 20px;  
`
const StoreName = styled.div`
  font-size: 14px;
  font-weight: 600
`
const StoreAddr = styled.div`
  font-size: 12px;
  color :#aba8a8;

`
const StorePrice = styled.div`
font-size: 14px;
`

const StoreIntroduce = styled.div`
  font-size: 14px;

`

const QNAButton ={
  color: 'rgb(245 105 105)',
  background: 'rgb(238 235 235)',
  width: '80%',
  height: '45px',
  fontSize: '12px',
  margin: '5px auto',
  borderRadius: '5px',
  fontWeight: 700,
  boxShadow: 'none',
  padding :'0px 10px'
}


const Hongrequestcontainer = ({ containerStyle }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const {user, dispatch2 } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(1);
  const [licensemodal, setLicensemodal] = useState(false);
  const [applymodal, setApplymodal] = useState(false);

  const fileInput = useRef();


  useEffect(() => {

    async function Process() {


    }
    Process();

  }, []);



  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

  })

  const _handleprofile = () =>{
    navigate("/hongladyprofile");
  }

  
  return (
    <Container style={containerStyle}>

      <ShowContainer>
        <InfoBox>
          <div>{'현재 28명이 지원중입니다. 지원한 홍여사의 프로필을 보고 선택해주시기 바랍니다.'}</div>

        </InfoBox>



        <ItemLayerA>
          <Row>
            <Column>
        
              <ItemLayerAcontent>
                <ItemBoxA>
                  <div>{'이순자 님이 지원 '}</div>
                  <div>{'남양주 다산동 거주 '}</div>
                  <div>
                  <Button
                      callback={_handleprofile}
                      buttonText={"프로필보기"}
                      containerStyle={{
                        backgroundColor: "#1d1d1d",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "30px",
                        boxShadow : "none",
                      }}
                  />

                  <Button
                      callback={()=>{}}
                      buttonText={"대화하기"}
                      containerStyle={{
                        backgroundColor: "#656363",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "30px",
                        boxShadow : "none",
                      }}
                  />
                  </div>
                </ItemBoxA>     
                <ItemLayerAdate>{'2024년 7월 4일 19:00'}</ItemLayerAdate>
              </ItemLayerAcontent>
              <ItemLayerAcontent>
                <ItemBoxA>
                  <div>{'김석시 님이 지원 '}</div>
                  <div>{'구리시 토평동 거주 '}</div>
                  <div>
                  <Button
                    callback={_handleprofile}
                      buttonText={"프로필보기"}
                      containerStyle={{
                        backgroundColor: "#1d1d1d",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "30px",
                        boxShadow : "none",
                      }}
                  />

                  <Button
                      callback={()=>{}}
                      buttonText={"대화하기"}
                      containerStyle={{
                        backgroundColor: "#656363",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "30px",
                        boxShadow : "none",
                      }}
                  />
                  </div>
                </ItemBoxA>     
                <ItemLayerAdate>{'2024년 7월 7일 19:00'}</ItemLayerAdate>
              </ItemLayerAcontent>
              <ItemLayerAcontent>
                <ItemBoxA>
                  <div>{'이민호 님이 지원 '}</div>
                  <div>{'구리시 평내동 거주 '}</div>
                  <div>
                  <Button
                      callback={_handleprofile}
                      buttonText={"프로필보기"}
                      containerStyle={{
                        backgroundColor: "#1d1d1d",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "30px",
                        boxShadow : "none",
                      }}
                  />

                  <Button
                      callback={()=>{}}
                      buttonText={"대화하기"}
                      containerStyle={{
                        backgroundColor: "#656363",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "30px",
                        boxShadow : "none",
                      }}
                  />
                  </div>
                </ItemBoxA>     
                <ItemLayerAdate>{'2024년 7월 10일 23:00'}</ItemLayerAdate>
              </ItemLayerAcontent>
   
            </Column>
          </Row>
        </ItemLayerA>

      </ShowContainer>

      <div style={{position:"absolute", bottom:10, width:"100%"}}>
      <Button
                      callback={()=>{}}
                      buttonText={"지원 마감하기"}
                      containerStyle={{
                        backgroundColor: "#ff4e19",
                        color: "#fff",
                        margin: "0px auto",
                        width: "90%",
                        borderRadius: 5,
                        height: "50px",
                        boxShadow : "none",
                        fontSize:17,
                      }}
                  /> 
      </div>

    </Container>
  );
};

export default Hongrequestcontainer;
