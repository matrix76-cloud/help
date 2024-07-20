import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ImageButton from '../common/ImageButton';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:center;
  padding :20px;
  flex-wrap : wrap;
  margin-top:50px; 
`

const Helpfiltercontainer = ({containerStyle}) => {

  const navigate = useNavigate();
  const buttoncallback = (data)=>{
    console.log("buttoncallback", data);

    navigate("/request", { state: { REQUESTTYPE: data } });
  }
  return (
    <Container style={containerStyle}>
      <ImageButton
        source={imageDB.ThemaWoman}
        buttoncallback={buttoncallback}
        buttontext={"집청소"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaMan}
        buttoncallback={buttoncallback}
        buttontext={"이사청소"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema20}
        buttoncallback={buttoncallback}
        buttontext={"식사준비"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema30}
        buttoncallback={buttoncallback}
        buttontext={"등원하원"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema40}
        buttoncallback={buttoncallback}
        buttontext={"아이돌봄"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaCar}
        buttoncallback={buttoncallback}
        buttontext={"심부름하기"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaSleep}
        buttoncallback={buttoncallback}
        buttontext={"간병하기"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaShower}
        buttoncallback={buttoncallback}
        buttontext={"무거운짐나르기"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaOneshop}
        buttoncallback={buttoncallback}
        buttontext={"병원데리고가기"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaGroups}
        buttoncallback={buttoncallback}
        buttontext={"사무실청소"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaCouple}
        buttoncallback={buttoncallback}
        buttontext={"요리비법전수"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaGroup}
        buttoncallback={buttoncallback}
        buttontext={"학교행사참석"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaManOnly}
        buttoncallback={buttoncallback}
        buttontext={"장보기"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaWomanOnly}
        buttoncallback={buttoncallback}
        buttontext={"애견병원가기"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaComman}
        buttoncallback={buttoncallback}
        buttontext={"애견산책"}
        round={false}
        containerStyle={{ height: "70px", marginBottom: 25, width: "18%" }}
      />
    </Container>
  );
}

export default Helpfiltercontainer;
