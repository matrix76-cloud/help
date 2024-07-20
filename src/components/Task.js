import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ReactStars from 'react-stars';
import { imageDB } from "../utility/imageData";
import { REQUESTTYPE } from '../utility/contentDefine';
import { FaTemperatureFull } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 20px;
  line-height: 2;
  font-size:12px

`
const Subject = styled.div`

  font-size: 16px;
  display: flex;
  flex-direction:column;
`
const Subjectname = styled.div`
  flex-direction: row;
  display: flex;
  align-items:center;


`
const Subjecttag = styled.div`

  text-align:left;

`
const Record = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`
const TaskSummary = styled.div`
  font-size: 12px;
  color: #999;
  text-align: left;
`
const Rate = styled.div`
`
const Contentcheck = styled.div`

`
const RecordContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`

const RegionTime = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  font-size: 12px;
  margin-top:10px;
`
const Region = styled.div`
    background: #afadac30;
    color: #716f6f;
    padding: 2px 10px;
    border-radius: 10px;
    margin-right: 5px;

`
const Time = styled.div`
  background: #085ed112;
  color: #085ed1;
  font-weight: 900;
  padding: 2px 10px;
  border-radius:10px;
  margin-right:5px;
`

const OutTime = styled.div`
  border: 1px solid #ededed;
  background: #ffffff;
  color: #615e5e;
  font-weight: 500;
  padding: 0px 10px;
  border-radius: 10px;
  margin-right: 5px;

`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

`
const ImageLayer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`

const Task = ({containerStyle, item}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])

  const _handledetailhong = ()=>{
    navigate("/detailtask",{state:{Item:item}});
  }

  const seekimage = (category)=>{

    if(category == REQUESTTYPE.HOME){
      return imageDB.ThemaWoman;
    }else if(category == REQUESTTYPE.MOVE){
      return imageDB.ThemaMan;
    }else if(category == REQUESTTYPE.MEALPREPARAION){
      return imageDB.Thema20;
    }else if(category == REQUESTTYPE.WALKING){
      return imageDB.Thema30;
    }else if(category == REQUESTTYPE.DOLBOM){
      return imageDB.Thema40;
    }

  }

  return (
    <Container style={containerStyle} onClick={_handledetailhong}>
      <div style={{ display: "flex",flexDirection: "row",justifyContent: "space-between", width: "100%"}}>
        <Column>     
          <Subject>
            <Subjectname>
              <div>
                <img src={seekimage(item.category)} style={{width:"50px", height:'50px'}}/>
              </div>
              <div>
              <div style={{marginLeft:20}}>{item.category} </div>
              <div style={{marginLeft:20, color:'#ff0000'}}>{item.price}</div>
              </div>
          
              <div style={{marginLeft:20, fontSize:'12px'}}>3명의 홍여사님이 지원중</div>
           
            </Subjectname>
   
            <Subjecttag>
              {item.requestcontent}  
            </Subjecttag>
          </Subject>
          <Record>
            <RecordContent>홍여사 {item.use}회 이용</RecordContent>
  
          </Record>
    
      </Column>
      

      </div>

      <TaskSummary>{item.info}</TaskSummary>
      <RegionTime>
        <Region>{item.region} </Region>
        <Time>{item.date}</Time>

      </RegionTime>

    </Container>
  );
}

export default Task;
