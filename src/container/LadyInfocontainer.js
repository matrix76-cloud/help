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
import { getDateFullTime, getDateOrTime, getTime, useSleep } from "../utility/common";
import Loading from "../common/Loading";
import { collection, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../api/config";
import GuideLabel from "../components/GuildeLable";
import ChatItem from "../components/ChatItem";
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
import { CHATCONTENTTYPE, REQUESTTYPE } from "../utility/contentDefine";
import { uploadImage } from "../service/CheckService";

import Fade from "react-reveal/Fade";
import Storemap from "../components/Storemap";
import Myposition from "../components/Myposition";
import Region from "./Region";
import Calendar from "react-calendar";
import  "./Calendarex.css"
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { imageDB } from "../utility/imageData";


const Container = styled.div`
  background: #fff;
  min-height: 800px;

`;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  padding-bottom:100px;
`;

const SelectContainer = styled.div`
  border: 1px solid #ededed;
  width: 40%;
  margin: 10px 5px;
  background: #efefef;
  color:#000;
  border-radius: 10px;
  font-size:14px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0px 3px;
}

`;

const ItemBoxA = styled.div`
  background: #ededed;
  border-radius: 10px;
  padding: 20px;
  margin: 5px 10px 0px;
  color: black;
  display: flex;
  flex-direction: column;
  width: ${({width}) => width}%;
  font-size: 16px;
  text-align: left;
  min-width:200px;

`;




const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap : wrap;
  margin-top:${({top}) => top}px;
 
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemLayerA = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5px;
  margin-bottom:5px;
`;

const ItemLayerAcontent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

`;

const ItemLayerB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const ItemBoxB = styled.div`
  background: #3a3737;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 10px 0px;
  color: #fff;
  display: flex;
  flex-direction: column;
  max-width: 70%;
  justify-content: flex-end;
  font-size: 14px;
  text-align: left;
`;
const ItemBoxB2 = styled.div`
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    width: 65%;
`;

const ItemBoxB3 = styled.div`
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
    width: 65%;
`;


export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`
// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)``;





const LadyInfocontainer = ({ containerStyle, type }) => {

  const Requestcleanmessages =[


    {type:"request", show:true, index:0, info:"홍여사는 누구인가요?"},
  
    {type:"response", show:false, index:1, info:"홍여사는 우리동네에 사시는 누나 동생 친구로 여성분만이 홍여사가 될수가 있어요."},

    {type:"request", show:false, index:2, info:"홍여사로 등록하려면 어떻게 하나요?"},

    {type:"response", show:false, index:3, info:"홍여사로 등록하기 위해서는 운전면허증 이나 주민등록증을 제출 해야해요"},
    {type:"responseimg", show:false, index:4, imgs:[imageDB.license1, imageDB.license2]},

    {type:"response", show:false, index:5, info:"간편하게 본인 간편인증을 거쳐 주민등록증은 정부24에서 운전면허증은 경찰청교통민원24에서 신분증 진위여부를 확인합니다"},
    {type:"responseimg2", show:false, index:6, imgs:[imageDB.nation1, imageDB.nation2]},

    {type:"request", show:false, index:7, info:"걱정 하지 마세요"},

    {type:"request", show:false, index:8, info:"가입시 수집된 신분증은 신원확인용도 이외에는 어떠한 이용도 하지 않아요"},

    {type:"response", show:false, index:9, info:"마지막으로 홍여사님에서 가입시 등록한 전화를 통해 간단한 인터뷰를 진행해요"},

    {type:"request", show:false, index:10, info:"이제 홍여사로 등록 되었습니다. 홍여사님의 활동내용이나 체감온도등을 보고 편하게 이용해 보세요"},

    {type:"request", show:false, index:11, info:"당근시장이나 숨어 있는 고수들의 모임같은 앱에서 사람 구할때 항상 불안하고 믿음직스럽지 못했어여 "},

    {type:"response", show:false, index:12, info:"이제 믿고 맡겨 보세여, 홍여사는 책임보험에 가입되어 있습니다. 걱정 안하셔도 되요 "},

    {type:"response", show:false, index:13, info:"신원을 1차로 확인해주신 주변의 동네 여성분들로 구성되어 있어요"},


  ]


  const navigate = useNavigate();
  const [messages, setMessages] = useState(Requestcleanmessages);
  const [refresh, setRefresh] = useState(1);
  const [stepdata, setStepdata] = useState(0);
  const { user, dispatch2 } = useContext(UserContext);
  const [latitude, setLatitude] = useState(user.latitude);
  const [longitude, setLongitude] = useState(user.longitude);

  const today = new Date();
  const [date, setDate] = useState(today);

  useEffect(() => {
    setMessages(messages);



    window.scrollTo(0, document.body.scrollHeight);

  }, [refresh]);

  useEffect(() => {

    async function Fetchdata(){
      setMessages(Requestcleanmessages);

     
      messages[1].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[2].show = true;
      setRefresh((refresh) => refresh +1);

    
      await useSleep(2500);
      messages[3].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[4].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[5].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[6].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[7].show = true;
      setRefresh((refresh) => refresh +1);


      await useSleep(2500);
      messages[8].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[9].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[10].show = true;
      setRefresh((refresh) => refresh +1);


      await useSleep(2500);
      messages[11].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[12].show = true;
      setRefresh((refresh) => refresh +1);

      await useSleep(2500);
      messages[13].show = true;
      setRefresh((refresh) => refresh +1);

    }
    Fetchdata();


  }, []);



  
  useLayoutEffect(() => {


  })






  const _handleReqComplete = () =>{

  }




  
  const handleDateChange = (newDate) => {

    console.log("new date", newDate);
    setDate(newDate);
    setRefresh((refresh) => refresh +1);
  };

  return (
    <Container style={containerStyle}>
        <ShowContainer>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

          <img src={imageDB.woman} style={{width:"250px"}}/>
          </div>


            {messages.map((data, index) => (
               <>

               {/* 처음시작할때 */}
               {("request" == data.type && data.show == true) && (
                <Fade bottom delay={200}>
                                  <ItemLayerA>
                                      <Row top={5}>
                                      <Column>
                                        <ItemLayerAcontent>
                                          
                                            <ItemBoxA width={100}>
                                              <span>{data.info}</span>
                                              <span>{data.content}</span>
                                        
                                      
                                
                                            </ItemBoxA>       
                                        </ItemLayerAcontent>
                                      </Column>
                                    </Row>
                                  </ItemLayerA>
                </Fade>
 
               )}

            
               {("response" == data.type && data.show == true ) &&
               (
                <>
                <Fade bottom delay={200}>
                    <ItemLayerB>         
                        <ItemBoxB>
                        <span>{data.info}</span>   
                        </ItemBoxB>
                   </ItemLayerB>
          
                  </Fade>
                </>
               )}
               {("responseimg" == data.type && data.show == true ) &&
               (
                <>
                <Fade bottom delay={200}>
                    <ItemLayerB>         
                        <ItemBoxB2>
                            {
                              data.imgs.map((sub)=>(
                                <div style={{display:"flex", flexDirection:"row",}}>
                                    <img src={sub} style={{width:"100px"}}/>
                                </div>
                 
                              ))
                            }  
                        </ItemBoxB2>
                   </ItemLayerB>
          
                  </Fade>
                </>
               )}
               {("responseimg2" == data.type && data.show == true ) &&
               (
                <>
                <Fade bottom delay={200}>
                    <ItemLayerB>         
                        <ItemBoxB3>
                            {
                              data.imgs.map((sub)=>(
                                <div style={{display:"flex", flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
                                    <img src={sub} style={{width:"150px", height:"80px", marginBottom:"20px"}}/>
                                </div>
                 
                              ))
                            }  
                        </ItemBoxB3>
                   </ItemLayerB>
          
                  </Fade>
                </>
               )}
             </>
            ))}
          </ShowContainer>
    </Container>
  )
};

export default LadyInfocontainer;
