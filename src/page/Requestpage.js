import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../context/User";
import Requestcontainer from "../container/Requestcontainer";
import RequestLayout from "../screen/Layout/RequestLayout";
import {REQUESTTYPE } from "../utility/contentDefine";



const Requestpage = ({ containerStyle }) => {
  const navigate = useNavigate();
  const [headername, setHeadername] = useState('');
  const [task, setTask] = useState('');
  const [refresh, setRefresh] = useState(1);
  const [step, setStep] = useState(0);
  const [allstep, setAllstep] = useState(5);
  const [messages, setMessages] = useState([]);

  const {state} = useLocation();

  const callback = (step_)=>{
    setStep(step_);
  }

  useEffect(() => {

    
    let headername = "";
    let task = "";
    let allstep = 0;

    if(state.REQUESTTYPE == REQUESTTYPE.HOME){
      headername = "집청소";
      task = "거실,주방,화장실등 집 전반을 청소합니다. 옵션으로 세탁, 창틀, 베란다를 선택 할수 있어요.";
      allstep = 8;
    }else if(state.REQUESTTYPE == REQUESTTYPE.MOVE){
      headername = "이사청소";
      task = "이사후 청소를 도와주세요. 옵션으로 베란다를 선택할수 있어요";
      allstep = 8;
    }else if(state.REQUESTTYPE == REQUESTTYPE.MEALPREPARAION){
      headername = "식사준비를 도와주세요";
      task = "아침 점심 저녁식사 준비를 도와주세요. 옵션으로 반찬가짓수와 찌개등을 선택 할수 있어요	";
      allstep = 8;

    }else if(state.REQUESTTYPE == REQUESTTYPE.WALKING){
      headername = "등원하원을 도와주세요";
      task = "학교 학원에서 등원 하원할때 도와주세요. 옵션으로 등원하원할 거리를 선택 할수 있어요	";
      allstep = 8;

    }else if(state.REQUESTTYPE == REQUESTTYPE.DOLBOM){
      headername = "아이돌보기를 도와주세요";
      task = "아이 돌보기를 도와주세요. 옵션으로 아이 돌보기시에 여러가지 활동을 선택 할수 있어요	";
      allstep = 7;

    }else{
      headername = "집청소";
      task = "거실,주방,화장실등 집 전반을 청소합니다. 옵션으로 세탁, 창틀, 베란다를 선택 할수 있어요.";
      allstep = 8;
    }

    setHeadername(headername);
    setTask(task);
    setAllstep(allstep);


    setRefresh((refresh) => refresh +1);
  }, [])

  useEffect(()=>{

    setMessages(messages);
  }, [refresh])

  return (
    <RequestLayout header={true} headername={headername} task={task} step={step} allstep={allstep}>
      <Requestcontainer callback={callback} type={state.REQUESTTYPE} />
    </RequestLayout>
  );
};

export default Requestpage;
