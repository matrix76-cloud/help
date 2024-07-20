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
  padding :10px 0px;
  flex-wrap : wrap;
  margin-top:20px; 
`

const Themafilter = ({containerStyle, callback}) => {

  const navigate = useNavigate();
  const buttoncallback = (data)=>{
    if(data == '아파트청소'){
      callback('female');
    }else if(data == '빌라청소'){
      callback('male');
    }else if(data == '식사준비'){
      callback('two');
    }else if(data == '등원하원'){
      callback('three');
    }else if(data == '아이공부'){
      callback('four');
    }else if(data == '소파청소'){
      callback('car');
    }else if(data == '실외기청소'){
      callback('sleep');
    }else if(data == '에어컨청소'){
      callback('shower');
    }else if(data == '침대메트리스청소'){
      callback('oneshop');
    }else if(data == '가구청소'){
      callback('group');
    }else if(data == '사무실청소'){
      callback('couple');
    }else if(data == '아이놀아주기'){
      callback('male');
    }else if(data == '여성전용'){
      callback('female');
    }else if(data == '남녀공용샵'){
      callback('allhour');
    }
  }
  return (
    <Container style={containerStyle}>
      <ImageButton
        source={imageDB.ThemaWoman}
        buttoncallback={buttoncallback}
        buttontext={"집청소"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaMan}
        buttoncallback={buttoncallback}
        buttontext={"이사청소"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaGroups}
        buttoncallback={buttoncallback}
        buttontext={"사무실청소"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema20}
        buttoncallback={buttoncallback}
        buttontext={"식사준비"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema30}
        buttoncallback={buttoncallback}
        buttontext={"등원하원"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema40}
        buttoncallback={buttoncallback}
        buttontext={"아이돌봄"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaCar}
        buttoncallback={buttoncallback}
        buttontext={"심부름하기"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaSleep}
        buttoncallback={buttoncallback}
        buttontext={"간병하기"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaShower}
        buttoncallback={buttoncallback}
        buttontext={"아이공부하기"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaOneshop}
        buttoncallback={buttoncallback}
        buttontext={"병원가기"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />

      <ImageButton
        source={imageDB.ThemaCouple}
        buttoncallback={buttoncallback}
        buttontext={"요리비법전수"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaGroup}
        buttoncallback={buttoncallback}
        buttontext={"학교행사참석"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaManOnly}
        buttoncallback={buttoncallback}
        buttontext={"장보기"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaWomanOnly}
        buttoncallback={buttoncallback}
        buttontext={"애견병원가기"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaComman}
        buttoncallback={buttoncallback}
        buttontext={"애견산책	"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
    </Container>
  );
}

export default Themafilter;
