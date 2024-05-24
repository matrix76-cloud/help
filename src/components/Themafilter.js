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
  padding :10px;
  flex-wrap : wrap;
`

const Themafilter = ({containerStyle, callback}) => {

  const navigate = useNavigate();
  const buttoncallback = (data)=>{
    if(data == '여자관리사'){
      callback('female');
    }else if(data == '남자관리사'){
      callback('male');
    }else if(data == '20대관리사'){
      callback('two');
    }else if(data == '30대관리사'){
      callback('three');
    }else if(data == '40대관리사'){
      callback('four');
    }else if(data == '주차가능'){
      callback('car');
    }else if(data == '수면가능'){
      callback('sleep');
    }else if(data == '샤워가능'){
      callback('shower');
    }else if(data == '1인1실'){
      callback('oneshop');
    }else if(data == '단체실'){
      callback('group');
    }else if(data == '커플가능'){
      callback('couple');
    }else if(data == '남성전용'){
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
        buttontext={"여자관리사"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaMan}
        buttoncallback={buttoncallback}
        buttontext={"남자관리사"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema20}
        buttoncallback={buttoncallback}
        buttontext={"20대관리사"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema30}
        buttoncallback={buttoncallback}
        buttontext={"30대관리사"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.Thema40}
        buttoncallback={buttoncallback}
        buttontext={"40대관리사"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaCar}
        buttoncallback={buttoncallback}
        buttontext={"주차가능"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaSleep}
        buttoncallback={buttoncallback}
        buttontext={"수면가능"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaShower}
        buttoncallback={buttoncallback}
        buttontext={"샤워가능"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaOneshop}
        buttoncallback={buttoncallback}
        buttontext={"1인1실"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaGroups}
        buttoncallback={buttoncallback}
        buttontext={"단체실"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaCouple}
        buttoncallback={buttoncallback}
        buttontext={"커플가능"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaGroup}
        buttoncallback={buttoncallback}
        buttontext={"단체가능"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaManOnly}
        buttoncallback={buttoncallback}
        buttontext={"남성전용"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaWomanOnly}
        buttoncallback={buttoncallback}
        buttontext={"여성전용"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
      <ImageButton
        source={imageDB.ThemaComman}
        buttoncallback={buttoncallback}
        buttontext={"남녀공용샵"}
        round={false}
        containerStyle={{ height: "60px", marginBottom: 25, width: "18%" }}
      />
    </Container>
  );
}

export default Themafilter;
