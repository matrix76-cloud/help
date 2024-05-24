import React,{useState, useEffect, Fragment} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ImageButton from '../common/ImageButton';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const ImageLayer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  padding : 10px 0px 0px;
  flex-wrap : wrap;
`


const Categoryfilter = ({containerStyle,callback}) => {

  const navigate = useNavigate();


  const buttoncallback = (data)=>{
    if(data == '한국'){
      callback('korea');
    }else if(data == '중국'){
      callback('china');
    }else if(data == '타이'){
      callback('tileland');
    }else if(data == '1인샵'){
      callback('oneshop');
    }else if(data == '왁싱'){
      callback('wacksing');
    }else if(data == '경락'){
      callback('meridian');
    }else if(data == '아로마'){
      callback('aroma');
    }else if(data == '스웨디시'){
      callback('swedish');
    }else if(data == '발마사지'){
      callback('foot');
    }else if(data == '스포츠'){
      callback('sports');
    }
  }
  return (
    <Container style={containerStyle}>
      <ImageLayer width={'18%'}>

       
        <ImageButton source={imageDB.FilterKorea} buttoncallback={buttoncallback} buttontext={'한국'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        

        <ImageButton source={imageDB.FilterChina}  buttoncallback={buttoncallback} buttontext={'중국'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterTileland} buttoncallback={buttoncallback}  buttontext={'타이'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterOneshop} buttoncallback={buttoncallback}  buttontext={'1인샵'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterWacksing} buttoncallback={buttoncallback}  buttontext={'왁싱'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterMeridian} buttoncallback={buttoncallback}   buttontext={'경락'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterAroma} buttoncallback={buttoncallback}  buttontext={'아로마'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterSports} buttoncallback={buttoncallback}  buttontext={'스포츠'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterSwedish} buttoncallback={buttoncallback}   buttontext={'스웨디시'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <ImageButton source={imageDB.FilterFoot} buttoncallback={buttoncallback}  buttontext={'발마사지'} containerStyle={{width:"18%", height:"50px", marginLeft:5, marginBottom:35}}/>
      </ImageLayer>


    </Container>
  );
}



export default Categoryfilter;
