import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ReactStars from 'react-stars';
import { imageDB } from "../utility/imageData";
import { REQUESTTYPE } from '../utility/contentDefine';
import { FaTemperatureFull } from "react-icons/fa6";
import Button from '../common/Button';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 20px;
  line-height: 2;
  font-size:12p;x



`
const Subject = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;

`
const Subjectname = styled.div`
  text-align:left;
`
const Subjecttag = styled.div`
  background: ${({background})=> background};
  color: #151414;
  padding: 2px 10px;
  border-radius: 5px;
  margin-right:10px;
`
const Record = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 12px;
  width: 100%;
  align-items:flex-start;
`
const TaskSummary = styled.div`
  font-size: 12px;
  color: #999;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
`
const Rate = styled.div`
`
const Contentcheck = styled.div`

`
const RecordContent = styled.div`
  margin-left:2px;
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
  width: 80%;
`
const Region = styled.div`
  background: #afadac30;
  color: #716f6f;
  padding: 2px 10px;
  border-radius:10px;






`

const Check = styled.div`
border: 1px solid #ededed;
background: #ffffff;
color: #615e5e;
font-weight: 500;
padding: 0px 10px;
border-radius: 10px;
margin-right: 5px;

`

const Time = styled.div`
background: #085ed112;
color: #085ed1;

padding: 2px 10px;
border-radius:10px;
`
const Column = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;

`

const ReceiveDoc = ({containerStyle, item}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])

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

  const _handledetailhong = ()=>{
    navigate("/detailtask",{state:{Item:item}});
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
     

            </Subjectname>

            <Subjectname>
              {/* <div>     
                {item.requestcontent.slice(0, 25)}
                {item.requestcontent.length > 25 ? "..." : null}
              </div> */}
              <div style={{marginLeft:20}}>{item.category} </div>
              <div style={{marginLeft:20, color:'#ff0000'}}>{item.price}</div>

              {/* <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{color:'#ff0000'}}>{'요청가격 : '}{item.price} </div>
              </div> */}

            </Subjectname>
    
          </Subject>

          <Record>

            <Rate>    
               {item.requestcontent.slice(0, 35)}
                {item.requestcontent.length > 35 ? "..." : null}</Rate>

            <div style={{display:"flex"}}>
            <Rate>{'2024년 7월 2일 19:34분'}{item.view} </Rate>
            <RecordContent>김숙자님이 견적을 보내옴</RecordContent>
            </div>
        
      
      

          </Record>

        </Column>
 
      </div>

      
      <RegionTime>
        <Region>{'김숙자님 정보보기'}</Region>
      </RegionTime>

      <div style={{display:"flex", flexDirection:"row"}}>
                <Button
                      callback={()=>{}}
                      buttonText={"삭제하기"}
                      containerStyle={{
                        backgroundColor: "rgb(234 232 232)",
                        color: "rgb(0 0 0)",
                        margin: "10px 2px",
                        width: "150px",
                        borderRadius: 5,
                        height: "40px",
                        boxShadow : "none",
                      }}
                  />

                  <Button
                      callback={()=>{}}
                      buttonText={"견적보러가기"}
                      containerStyle={{
                        backgroundColor: "#bebebe",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "150px",
                        borderRadius: 5,
                        height: "40px",
                        boxShadow : "none",
                      }}
                  />
      </div>

    </Container>
  );
}

export default ReceiveDoc;
