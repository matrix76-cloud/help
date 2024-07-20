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
// import Calendar from "react-calendar";
import  "./Calendarex.css"
import "react-calendar/dist/Calendar.css";
import moment from "moment";

import { Calendar,DateObject } from "react-multi-date-picker"

const format = "MM/DD/YYYY";



const Container = styled.div`
  background: #d8d8d8;
  min-height: 800px;

`;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 180px;
  padding-bottom:100px;
`;

const SelectContainer = styled.div`
  border: 1px solid #ededed;
  width: 40%;
  margin: 10px 5px;
  background: ${({check}) => check == true ? ('#3a3737'):('#fff')};
  color: ${({check}) => check == true ? ('#fff'):('#000')};
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
  background: #fff;
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
  max-width: 50%;
  justify-content: flex-end;
  font-size: 14px;
  text-align: left;
`;


export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`
// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)``;





const Requestcontainer = ({ containerStyle, callback, type }) => {

  const Requestcleanmessages =[


    {type:"initialize", show:true, index:0, info:"몇가지 정보만 알려주시면 실시간으로 견적을 받을수 있어요"},

    {type:"request", show:false, index:1, info:"언제마다 청소하시기를 원하시나여?",select : false, multi:false, items:[
    {check : false, key:"정기", content:"정기적 청소", response:"정기적 청소"},
    {check : false, key:"1회", content:"1회만 청소", response:"1회만 청소"}]},
  
    {type:"response", show:false, index:2, requesttype:"청소주기",  request:""},


    {type:"requestdate", show:false, index:3, info:"청소하는 시기를 언제로 할까요 ?",select : false, multi:false, items:[],date:true },
    
    {type:"response", show:false, index:4, requesttype:"청소일자",  request:""},

    {type:"request", show: false, index:5, info:"청소가 필요한 곳을 선택해주세요",select : false, multi:true, items:[
    {check : false, key:"아파트", content:"아파트", response:"아파트"},
    {check : false, key:"빌라", content:"빌라", response:"빌라"},
    {check : false, key:"단독주택", content:"단독주택", response:"단독주택"},
    {check : false, key:"오피스텔", content:"오피스텔", response:"오피스텔"},]},
  
    {type:"response", show:false, index:6, requesttype:"청소대상",  request:""},
  
    {type:"request", show: false, index:7, info:"집은 몇평인가요?",select : false, multi:false, items:[
    {check : false, key:"10평미만", content:"10평미만", response:"10평미만"},
    {check : false, key:"10평대", content:"10평대", response:"10평대"},
    {check : false, key:"20평대", content:"20평대", response:"20평대"},
    {check : false, key:"30평대", content:"30평대", response:"30평대"},
    {check : false, key:"40평대", content:"40평대", response:"40평대"},
    {check : false, key:"50평대", content:"50평대", response:"50평대"},]},
  
    {type:"response", show:false, index:8, requesttype:"대상평수", request:""},
  
    {type:"request", show: false, index:9, info:"청소시간을 선택해주세요?",select : false, multi:false, items:[
      {check : false, key:"3시간", content:"3시간", response:"3시간"},
      {check : false, key:"4시간", content:"4시간", response:"4시간"},
      {check : false, key:"5시간", content:"5시간", response:"5시간"},
      {check : false, key:"청소끝날때까지", content:"청소끝날때까지", response:"청소끝날때까지"},]},
  
    {type:"response", show:false, index:10,requesttype:"청소시간", request:""},
  
    {type:"request", show: false, index:11, info:"청소하는 시간대는 언제가 좋을까요?",select : false, multi:false, items:[
        {check : false, key:"협의가능", content:"협의가능", response:"협의가능"},
        {check : false, key:"오전시간", content:"오전시간", response:"오전시간"},
        {check : false, key:"저녁시간", content:"저녁시간", response:"저녁시간"},]},
  
    {type:"response", show:false, index:12,requesttype:"청소하는 시간대", request:""},

    {type:"request", show: false, index:13, info:"고객님의 성별은 무엇인가여?",select : false, multi:false, items:[
      {check : false, key:"남성", content:"남성", response:"남성"},
      {check : false, key:"여성", content:"여성", response:"여성"},]},

    {type:"response", show:false, index:14,requesttype:"고객님 성별", request:""},

    {type:"requestregion", show: false, index:15, map:true, info:"고객님이 계신 지역을 선택해주세요"},
    {type:"response", show:false, index:16,requesttype:"고객님이 계신 지역", request:""},

    {type:"requestcomplete", complete: true, show: false, index:17, info:"고객님이 작성하신 요구사항은 다음과 같습니다"},

  ]

  const Requestmovemessages =[

    {type:"initialize", show:true, index:0, info:"몇가지 정보만 알려주시면 실시간으로 견적을 받을수 있어요"},
  
    {type:"request", show:true, index:1, info:"이사할때 어떤것을 도와드릴까여?",select : false, multi:false, items:[
    {check : false, key:"부엌정리", content:"부엌정리", response:"부엌정리"},
    {check : false, key:"짐정리", content:"짐정리", response:"짐정리"},
    {check : false, key:"집청소", content:"집청소", response:"집청소"},
    {check : false, key:"옷정리", content:"옷정리", response:"1옷정리"}]},


  
    {type:"response", show:false, index:2, requesttype:"이사할때 도움범위",  request:""},


    {type:"requestdate", show:false, index:3, info:"이사하는 시기는 언제인가요 ?",select : false, multi:false, items:[],date:true },
    
    {type:"response", show:false, index:4, requesttype:"이사일자",  request:""},

    {type:"request", show: false, index:5, info:"이사를 하는곳을 선택해주세요",select : false, multi:true, items:[
    {check : false, key:"아파트", content:"아파트", response:"아파트"},
    {check : false, key:"빌라", content:"빌라", response:"빌라"},
    {check : false, key:"단독주택", content:"단독주택", response:"단독주택"},
    {check : false, key:"오피스텔", content:"오피스텔", response:"오피스텔"},]},
  
    {type:"response", show:false, index:6, requesttype:"청소대상",  request:""},
  
    {type:"request", show: false, index:7, info:"집은 몇평인가요?",select : false, multi:false, items:[
    {check : false, key:"10평미만", content:"10평미만", response:"10평미만"},
    {check : false, key:"10평대", content:"10평대", response:"10평대"},
    {check : false, key:"20평대", content:"20평대", response:"20평대"},
    {check : false, key:"30평대", content:"30평대", response:"30평대"},
    {check : false, key:"40평대", content:"40평대", response:"40평대"},
    {check : false, key:"50평대", content:"50평대", response:"50평대"},]},
  
    {type:"response", show:false, index:8, requesttype:"대상평수", request:""},
  
    {type:"request", show: false, index:9, info:"이사 도와줄시간을 선택해주세요?",select : false, multi:false, items:[
      {check : false, key:"3시간", content:"3시간", response:"3시간"},
      {check : false, key:"4시간", content:"4시간", response:"4시간"},
      {check : false, key:"5시간", content:"5시간", response:"5시간"},
      {check : false, key:"청소끝날때까지", content:"이사끝날때까지", response:"이사끝날때까지"},]},
  
    {type:"response", show:false, index:10,requesttype:"이사 도와줄시간", request:""},
  
    {type:"request", show: false, index:11, info:"이사하는 시간대는 언제인가요?",select : false, multi:false, items:[
        {check : false, key:"오전시간", content:"오전시간", response:"오전시간"},
        {check : false, key:"저녁시간", content:"저녁시간", response:"저녁시간"},]},
  
    {type:"response", show:false, index:12,requesttype:"이사하는 시간대", request:""},

    {type:"request", show: false, index:13, info:"고객님의 성별은 무엇인가여?",select : false, multi:false, items:[
      {check : false, key:"남성", content:"남성", response:"남성"},
      {check : false, key:"여성", content:"여성", response:"여성"},]},

    {type:"response", show:false, index:14,requesttype:"고객님 성별", request:""},

    {type:"requestregion", show: false, index:15, map:true, info:"고객님이 계신 지역을 선택해주세요"},
    {type:"response", show:false, index:16,requesttype:"고객님이 계신 지역", request:""},

    {type:"requestcomplete", complete: true, show: false, index:17, info:"고객님이 작성하신 요구사항은 다음과 같습니다"},

  
  
  ]
  const Requestmealpreparationmessages =[

    {type:"initialize", show:true, index:0, info:"몇가지 정보만 알려주시면 실시간으로 견적을 받을수 있어요"},
  
    {type:"request", show:true, index:1, info:"어떤식사 준비를  도와드릴까여?",select : false, multi:false, items:[
    {check : false, key:"일상적인 식사", content:"일상적인 식사", response:"일상적인 식사"},
    {check : false, key:"가족모임 식사", content:"가족모임 식사", response:"가족모임 식사"}]},
    {type:"response", show:false, index:2, requesttype:"어떤 식사준비인가요?",  request:""},

    {type:"requestdate", show:false, index:3, info:"식사준비 하는 시기는 언제인가요 ?",select : false, multi:false, items:[],date:true },
    {type:"response", show:false, index:4, requesttype:"식사준비일자",  request:""},

    {type:"request", show: false, index:5, info:"식사준비 하는곳을 선택해주세요",select : false, multi:true, items:[
    {check : false, key:"아파트", content:"아파트", response:"아파트"},
    {check : false, key:"빌라", content:"빌라", response:"빌라"},
    {check : false, key:"단독주택", content:"단독주택", response:"단독주택"},
    {check : false, key:"오피스텔", content:"오피스텔", response:"오피스텔"},]},
  
    {type:"response", show:false, index:6, requesttype:"식사준비 하는곳",  request:""},
  
    {type:"request", show: false, index:7, info:"준비해야 하는 식사는 무엇인가요?",select : false, multi:false, items:[
    {check : false, key:"아침식사", content:"아침식사", response:"아침식사"},
    {check : false, key:"점심식사", content:"점심식사", response:"점심식사"},
    {check : false, key:"저녁식사", content:"저녁식사", response:"저녁식사"},
    {check : false, key:"모든식사", content:"모든식사", response:"모든식사"}]},
  
    {type:"response", show:false, index:8, requesttype:"준비해야하는 식사", request:""},
  
    {type:"request", show: false, index:9, info:"식사준비시에 해야할 내용을 선택해주세요?",select : false, multi:false, items:[
      {check : false, key:"반찬2개+찌개", content:"반찬2개+찌개", response:"반찬2개+찌개"},
      {check : false, key:"반찬3개+찌개", content:"반찬3개+찌개", response:"반찬3개+찌개"},
      {check : false, key:"반찬4개+찌개", content:"반찬4개+찌개", response:"반찬4개+찌개"},
      {check : false, key:"협의필요", content:"협의필요", response:"협의필요"},]},
  
    {type:"response", show:false, index:10,requesttype:"식사준비시에 해야할 내용", request:""},
  
    {type:"request", show: false, index:11, info:"식사 준비에 장보기와 설겆이가 포함되나여?",select : false, multi:false, items:[
        {check : false, key:"장보기포함", content:"장보기만포함", response:"장보기만포함"},
        {check : false, key:"장보기포함", content:"설겆이만포함", response:"설겆이만포함"},
        {check : false, key:"장보기미포함", content:"장보기 설겆이모두포함", response:"장보기 설겆이모두포함"},
        {check : false, key:"장보기미포함", content:"장보기 설겆이미포함", response:"장보기 설겆이미포함"},]},
  
    {type:"response", show:false, index:12,requesttype:"식사 준비에 장보기와 설겆이가 포함되나여?", request:""},


      {type:"request", show: false, index:13, info:"고객님의 성별은 무엇인가여?",select : false, multi:false, items:[
        {check : false, key:"남성", content:"남성", response:"남성"},
        {check : false, key:"여성", content:"여성", response:"여성"},]},

    {type:"response", show:false, index:14,requesttype:"고객님 성별", request:""},

    {type:"requestregion", show: false, index:15, map:true, info:"고객님이 계신 지역을 선택해주세요"},
    {type:"response", show:false, index:16,requesttype:"고객님이 계신 지역", request:""},

    {type:"requestcomplete", complete: true, show: false, index:17, info:"고객님이 작성하신 요구사항은 다음과 같습니다"},

  
  
  ]
  const Requestwalkingmessages =[

    {type:"initialize", show:true, index:0, info:"몇가지 정보만 알려주시면 실시간으로 견적을 받을수 있어요"},
  
    {type:"request", show:true, index:1, info:"등원 하원 해야할 아이가 몇명인가요",select : false, multi:false, items:[
    {check : false, key:"1명", content:"1명", response:"1명"},
    {check : false, key:"2명", content:"2명", response:"2명"},
    {check : false, key:"3명", content:"3명", response:"3명"}]},
    {type:"response", show:false, index:2, requesttype:"등원 하원 해야할 아이가 몇명인가요?",  request:""},

    {type:"requestdate", show:false, index:3, info:"등원하원 도와줄 하는 시기는 언제인가요 ?",select : false, multi:false, items:[],date:true },
    {type:"response", show:false, index:4, requesttype:"등원하원도와날짜",  request:""},

    {type:"request", show: false, index:5, info:"아이 연령이 어떻게 되나요?",select : false, multi:true, items:[
    {check : false, key:"만 5살 미만", content:"만 5살 미만", response:"만 5살 미만"},
    {check : false, key:"만 5살 ~ 8살", content:"만 5살 ~ 8살", response:"만 5살 ~ 8살"},
    {check : false, key:"만 8살 ~ 10살", content:"만 8살 ~ 10살", response:"만 8살 ~ 10살"},
    {check : false, key:"만 10살이상 ", content:"만 10살이상", response:"만 10살이상"},]},
  
    {type:"response", show:false, index:6, requesttype:"아이연령",  request:""},
  
    {type:"request", show: false, index:7, info:"어디에 등원하원하는것을 도와드려야 하나요?",select : false, multi:false, items:[
    {check : false, key:"학교", content:"학교", response:"학교"},
    {check : false, key:"학원", content:"학원", response:"학원"},
    {check : false, key:"유치원/어린이집", content:"유치원/어린이집", response:"유치원/어린이집"}]},
  
    {type:"response", show:false, index:8, requesttype:"어디에 등원해야 하나요", request:""},
  
    {type:"request", show: false, index:9, info:"등원하원을 도와줄 곳은 몇군데 인가요",select : false, multi:false, items:[
      {check : false, key:"1군데", content:"1군데", response:"1군데"},
      {check : false, key:"2군데", content:"2군데", response:"2군데"},
      {check : false, key:"3군데", content:"3군데", response:"3군데"},
      {check : false, key:"4군데", content:"4군데", response:"4군데"},]},
  
    {type:"response", show:false, index:10,requesttype:"등원하원을 도와줄 곳은 몇군데인가요", request:""},
  
    {type:"request", show: false, index:11, info:"등원하원이 가까운곳인가요?",select : false, multi:false, items:[
        {check : false, key:"1킬로 이내", content:"1킬로 이내", response:"1킬로 이내"},
        {check : false, key:"2킬로 이내", content:"2킬로 이내", response:"2킬로 이내"},
        {check : false, key:"2킬로 이상", content:"2킬로 이상", response:"2킬로 이상"},]},
  
    {type:"response", show:false, index:12,requesttype:"등원하원이 가까운곳인가요?", request:""},

    {type:"request", show: false, index:13, info:"등원하원 하는 시간대가 언제인가요",select : false, multi:false, items:[
      {check : false, key:"아침시간", content:"아침시간", response:"아침시간"},
      {check : false, key:"12시부터 2시", content:"12시부터 2시", response:"12시부터 2시"},
      {check : false, key:"2시부터 4시", content:"2시부터 4시", response:"2시부터 4시"},
      {check : false, key:"4시부터 6시", content:"4시부터 6시", response:"4시부터 6시"},
      {check : false, key:"6시이후", content:"6시이후", response:"6시이후"},]},

    {type:"response", show:false, index:14,requesttype:"등원하원 하는 시간대가 언제인가요", request:""},

    {type:"requestregion", show: false, index:15, map:true, info:"고객님이 계신 지역을 선택해주세요"},
    {type:"response", show:false, index:16,requesttype:"고객님이 계신 지역", request:""},

    {type:"requestcomplete", complete: true, show: false, index:17, info:"고객님이 작성하신 요구사항은 다음과 같습니다"},

  
  
  ]
  const Requestdolbommessages =[

    {type:"initialize", show:true, index:0, info:"몇가지 정보만 알려주시면 실시간으로 견적을 받을수 있어요"},
  
    {type:"request", show:true, index:1, info:"돌봐야 할 아이가 몇명인가요",select : false, multi:false, items:[
    {check : false, key:"1명", content:"1명", response:"1명"},
    {check : false, key:"2명", content:"2명", response:"2명"},
    {check : false, key:"3명", content:"3명", response:"3명"}]},
    {type:"response", show:false, index:2, requesttype:"돌봐야 할 아이가 몇명인가요?",  request:""},

    {type:"requestdate", show:false, index:3, info:"아이돌보기 도와줘야 하는 시기는 언제인가요 ?",select : false, multi:false, items:[],date:true },
    {type:"response", show:false, index:4, requesttype:"돌보기 날짜",  request:""},

    {type:"request", show: false, index:5, info:"돌봐야 할 아이 연령이 어떻게 되나요?",select : false, multi:true, items:[
    {check : false, key:"만 5살 미만", content:"만 5살 미만", response:"만 5살 미만"},
    {check : false, key:"만 5살 ~ 8살", content:"만 5살 ~ 8살", response:"만 5살 ~ 8살"},
    {check : false, key:"만 8살 ~ 10살", content:"만 8살 ~ 10살", response:"만 8살 ~ 10살"},
    {check : false, key:"만 10살이상 ", content:"만 10살이상", response:"만 10살이상"},]},
  
    {type:"response", show:false, index:6, requesttype:"아이연령",  request:""},
  
    {type:"request", show: false, index:5, info:"돌봐주는 곳을 선택해주세요",select : false, multi:true, items:[
      {check : false, key:"아파트", content:"아파트", response:"아파트"},
      {check : false, key:"빌라", content:"빌라", response:"빌라"},
      {check : false, key:"단독주택", content:"단독주택", response:"단독주택"},
      {check : false, key:"오피스텔", content:"오피스텔", response:"오피스텔"},]},
  
    {type:"response", show:false, index:8, requesttype:"어디에서 아이를 돌봐야 하나요", request:""},


    {type:"request", show: false, index:9, info:"아이를 돌봐야 하는 시간대가 언제인가요",select : false, multi:false, items:[
      {check : false, key:"12시부터 2시", content:"12시부터 3시", response:"12시부터 3시"},
      {check : false, key:"4시부터 6시", content:"3시부터 6시", response:"3시부터 6시"},
      {check : false, key:"협의필요", content:"협의필요", response:"협의필요"},]},



    {type:"response", show:false, index:10,requesttype:"아이를 돌봐야 하는 시간대가 언제인가요", request:""},

    {type:"request", show: false, index:11, info:"고객님의 성별은 무엇인가여?",select : false, multi:false, items:[
      {check : false, key:"남성", content:"남성", response:"남성"},
      {check : false, key:"여성", content:"여성", response:"여성"},]},

  {type:"response", show:false, index:12,requesttype:"고객님 성별", request:""},

    {type:"requestregion", show: false, index:13, map:true, info:"고객님이 계신 지역을 선택해주세요"},
    {type:"response", show:false, index:14,requesttype:"고객님이 계신 지역", request:""},

    {type:"requestcomplete", complete: true, show: false, index:17, info:"고객님이 작성하신 요구사항은 다음과 같습니다"},

  
  
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
  const [value, setValue] = useState(new Date());

  const [dates, setDates] = useState([

  ]);



  useEffect(() => {
    setMessages(messages);
    setStepdata(stepdata);
    setDate(date);
    callback( stepdata);
  }, [refresh]);

  useEffect(() => {

    async function Fetchdata(){
      if(type == REQUESTTYPE.HOME){
        setMessages(Requestcleanmessages);
      }else if(type == REQUESTTYPE.MOVE){
        setMessages(Requestmovemessages);
      }else if(type == REQUESTTYPE.MEALPREPARAION){
        setMessages(Requestmealpreparationmessages);
      }else if(type == REQUESTTYPE.WALKING){
        setMessages(Requestwalkingmessages);
      }else if(type == REQUESTTYPE.DOLBOM){
        setMessages(Requestdolbommessages);
      }else{
        setMessages(Requestcleanmessages);
      }
      await useSleep(1500);
      messages[1].show = true;
      setRefresh((refresh) => refresh +1);

    }
    Fetchdata();


  }, []);

  const _handleReset = () =>{

    let msgs = [];
    async function Fetchdata(){
      if(type == REQUESTTYPE.HOME){ 
        msgs = Requestcleanmessages;
        setMessages(msgs); 

      }else if(type == REQUESTTYPE.MOVE){
        msgs = Requestmovemessages;
        setMessages(msgs);

      }else if(type == REQUESTTYPE.MEALPREPARAION){
        msgs = Requestmealpreparationmessages;
        setMessages(msgs);

      }else if(type == REQUESTTYPE.WALKING){
        msgs = Requestwalkingmessages;
        setMessages(msgs);

      }else if(type == REQUESTTYPE.DOLBOM){
        msgs = Requestdolbommessages;
        setMessages(msgs);

      }else{
        msgs = Requestcleanmessages;
        setMessages(Requestcleanmessages);
      }
   
      await useSleep(1500);
    
      msgs[1].show = true;
      setMessages(msgs);
      setStepdata(0);
      setRefresh((refresh) => refresh +1);


    }
    Fetchdata();
  }


  
  useLayoutEffect(() => {


  })

  const _handleNext = (index) =>{

    const FindIndex = messages[index].items.findIndex(x=>x.check == true);

    if(FindIndex == -1){
      return;
    }

    let stepdata_ = stepdata + 1;

    setStepdata(stepdata_);
    console.log("handle next", index,messages[index].items[FindIndex].response);
    messages[index].select = true;
    messages[index +1].show = true;
    messages[index +1].request = messages[index].items[FindIndex].response;


    if(messages.length  > index + 2){
      messages[index + 2].show =true;
    }else{
      messages.push({type:"request", show: true, map:true, index:messages.length+1, info:"고객님이 계신 지역을 선택해주세요"});

    }
 
    setRefresh((refresh) => refresh +1);
  }
  const _handleDateNext = (index) =>{

    let stepdata_ = stepdata + 1;

    setStepdata(stepdata_);
    
    messages[index].select = true;
    messages[index +1].show = true;
    let day = ['일', '월', '화', '수', '목', '금', '토'];

    let dateFormat = date.getFullYear() + '년 ' + (date.getMonth()+1) + '월 '
    + date.getDate() + '일 ' +  day[today.getDay()]+ '요일';

    messages[index +1].request = dateFormat;
    messages[index + 2].show =true;

    setRefresh((refresh) => refresh +1);
  }



  const regionselect= (region1, region2, index)=>{
    let stepdata_ = stepdata + 1;

    setStepdata(stepdata_);
    
    messages[index].select = true;
    messages[index].map = false;
    messages[index +1].show = true;
    messages[index +1].request = region1 + region2;
    messages[index + 2].show =true;


    setRefresh((refresh) => refresh +1);
  }



  const _handleReqComplete = () =>{

  }

  const _handlecheck = (index, key)=>{

    messages[index].items.map((data)=>{
      data.check = false;
    })

    const FindIndex = messages[index].items.findIndex(x=>x.key == key);
    messages[index].items[FindIndex].check= true;
  
    setRefresh((refresh) => refresh +1);
  }



  
  const handleDateChange = (newDate) => {

    console.log("new date", newDate);
    setDate(newDate);
    setRefresh((refresh) => refresh +1);
  };

  return (
    <Container style={containerStyle}>
        <ShowContainer>


            {messages.map((data, index) => (
               <>

               {/* 처음시작할때 */}
               {("initialize" == data.type && data.show == true) && (
 
                    <ItemLayerA>
                       <Row top={5}>
                      <Column>
                        <ItemLayerAcontent>
                          
                            <ItemBoxA width={100}>
                              <span>{data.info}</span>
                              {
                              data.select == false ?
                              (
                                <Row top={5}>
                                {data.items.map((subdata)=>(
                                  <SelectContainer className="button" check={subdata.check}
                                  onClick={()=>{_handlecheck(index, subdata.key)}}>
                                        <div>{subdata.content}</div>
                                  </SelectContainer>
                            
                                ))}

                                <Button            
                                buttonText={"다음"}
                                callback={()=>{_handleNext(index)}}
                                containerStyle={{
                                  backgroundColor: "#F0F0F0",
                                  color :"#000",
                                  border :"1px solid #ededed",
                                  borderRadius: "10px",
                                  fontSize: 15,
                                  height:45,
                                  margin: " 10px 0px",
                                  width: "95%",
                
                                }}
                              />
                              </Row>):(<>
                                <span>
                                <span>{data.content}</span>
                                </span>
                              </>)
                              }
                      
                
                            </ItemBoxA>       
                        </ItemLayerAcontent>
                      </Column>
                    </Row>
                   </ItemLayerA>
               )}

               {/* 고객요구사항 선택 */}
               {("request" == data.type && data.show == true) && (
                  <Fade bottom delay={1000}>
                    <ItemLayerA>
                    <Row top={5}>
                      <Column>
                        <ItemLayerAcontent>
                          
                            <ItemBoxA width={100}>
                              <span>{data.info}</span>
                              {
                              data.select == false ?
                              (
                                <Row top={5}>
                                {data.items.map((subdata)=>(
                                  <SelectContainer className="button" check={subdata.check}
                                  onClick={()=>{_handlecheck(index, subdata.key)}}>
                                        <div>{subdata.content}</div>
                                  </SelectContainer>
                            
                                ))}

                                <Button            
                                buttonText={"다음"}
                                callback={()=>{_handleNext(index)}}
                                containerStyle={{
                                  backgroundColor: "#F0F0F0",
                                  color :"#000",
                                  border :"1px solid #ededed",
                                  borderRadius: "10px",
                                  fontSize: 15,
                                  height:45,
                                  margin: " 10px 0px",
                                  width: "95%",
                
                                }}
                              />
                              </Row>):(<>
                                <span>
                                <span>{data.content}</span>
                                </span>
                              </>)
                              }
                   
                    
                            </ItemBoxA>       
                        </ItemLayerAcontent>
                      </Column>
                    </Row>
                   </ItemLayerA>

                  </Fade>
        
               )}

                {/* 지역 선택 */} 
                {("requestregion" == data.type && data.show == true) && (
                  <Fade bottom delay={1000}>
                    <ItemLayerA>
                    <Row top={5}>
                      <Column>
                        <ItemLayerAcontent>
                          
                            <ItemBoxA width={100}>
                              <span>{data.info}</span>
                              {
                                data.map == true &&
                                <Region callback={regionselect} index ={index}/>    
                              }
                              
                    
                            </ItemBoxA>       
                        </ItemLayerAcontent>
                      </Column>
                    </Row>
                   </ItemLayerA>

                  </Fade>
        
               )}

                {/* 날짜 선택 */} 
               {("requestdate" == data.type && data.show == true) && (
                  <Fade bottom delay={1000}>
                    <ItemLayerA>
                    <Row>
                      <Column>
                        <ItemLayerAcontent>
                          
                            <ItemBoxA width={70}>
                              <span>{data.info}</span>
                              {
                              data.select == false ?
                              (
                              <Row top={15}>
                                
                                {/* <StyledCalendarWrapper>
                                    <StyledCalendar
                                      value={date}
                                      onChange={handleDateChange}
                                      multiple
                                      formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
                                      formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
                                      formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                                      calendarType="gregory" // 일요일 부터 시작
                                      showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                                      next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                                      prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                                      minDetail="year" // 10년단위 년도 숨기기
                                    />
                                </StyledCalendarWrapper> */}
                                <Calendar 
                                  multiple
                                  value={dates}
                                  onChange={()=>{
                                    setDates();
                                    console.log("dates", dates);
                                  }}
                                />

                                <Button            
                                buttonText={"다음"}
                                callback={()=>{_handleDateNext(index)}}
                                containerStyle={{
                                  backgroundColor: "#F0F0F0",
                                  color :"#000",
                                  border :"1px solid #ededed",
                                  borderRadius: "10px",
                                  fontSize: 15,
                                  height:45,
                                  margin: " 10px 0px",
                                  width: "95%",
                
                                }}
                              />
                              </Row>):(<>
                                <span>
                                <span>{data.content}</span>
                                </span>
                              </>)
                              }
               
                  
                            </ItemBoxA>       
                        </ItemLayerAcontent>
                      </Column>
                    </Row>
                   </ItemLayerA>

                  </Fade>
        
               )}
               
                {/* 요구사항 문서 확인 */} 
                {("requestcomplete" == data.type && data.show == true) && (
                  <Fade bottom delay={1000}>
                    <ItemLayerA>
                    <Row>
                      <Column>
                        <ItemLayerAcontent>
                          
                            <ItemBoxA width={70}>
                              <span>{data.info}</span>


                              <table style={{marginTop:20}}>
                                <thead>
                                  <tr>
                                    <th scope="col">구분</th>
                                    <th scope="col">내용</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    messages.map((data)=>(
                                      <>
                                      {
                                      data.type =='response' &&
                                      <tr>
                                      <td>{data.requesttype}</td>
                                      <td>{data.request}</td>
                                      </tr>
                                      }
                                      </>
                                
                                
                                    ))
                                  }
                                 
                                </tbody>
                              </table>
                      
               
                              <div style={{display:"flex", flexDirection:"row", marginTop:10}}>
                                    <Button            
                                    buttonText={"다시작성하기"}
                                    callback={()=>{_handleReset(index)}}
                                    containerStyle={{
                                    backgroundColor: "#8b8988",
                                    color :"#fff",
                                    border :"1px solid #ededed",
                                    borderRadius: "10px",
                                    fontSize: 15,
                                    height:35,
                                    margin: " 10px 0px",
                                    width: "150px",
                  
                                    }}/>
                                    <Button            
                                    buttonText={"요청하기"}
                                callback={()=>{_handleReqComplete(index)}}
                                containerStyle={{
                                  backgroundColor: "#FF4E19",
                                  color :"#fff",
                                  border :"1px solid #ededed",
                                  borderRadius: "10px",
                                  fontSize: 15,
                                  height:35,
                                  margin: " 10px 0px",
                                  width: "150px",
                
                                    }}/>   
                                  </div>
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
                        <span>{data.request}</span>   
                        </ItemBoxB>
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

export default Requestcontainer;
