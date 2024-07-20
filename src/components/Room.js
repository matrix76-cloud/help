import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import ReactStars from 'react-stars';
import { imageDB } from "../utility/imageData";
import { REQUESTTYPE } from '../utility/contentDefine';

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
  text-align:left;
`

const Subject2 = styled.div`

font-size: 12px;
display: flex;
flex-direction: column;
text-align: left;
`


const Subjectname = styled.div`

`
const Subjecttag = styled.div`

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
  width: 72%;
  text-align: left;
`
const Rate = styled.div`
`
const Contentcheck = styled.div`

`
const RecordContent = styled.div`
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
  border-radius:10px;
  margin-right:5px;

`
const Time = styled.div`
  background: #085ed112;
  color: #085ed1;

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
  width:60%;
  line-height:1.8;
`
const ImageLayer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`

const Room = ({containerStyle, item}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])




  return (
    <Container style={containerStyle}>
      <div style={{ display: "flex",flexDirection: "row",justifyContent: "space-between", width: "100%"}}>

        <ImageLayer>
          <img src={item.roomimage} style={{width:"100px", height:'120px'}}/>
        </ImageLayer>

        <Column>     
          <Subject>
            <Subjecttag>

            {item.requestcontent.slice(0, 12)}
            {item.requestcontent.length > 12 ? "..." : null}

            </Subjecttag>
          </Subject>

          <Subject2>
       
            {item.prices.map((data)=>(
                <Subjecttag>
                  {data}
                </Subjecttag>
            ))}
  
          </Subject2>

          <Record>
            <ReactStars count={1} value={5} size={20} color1={'#ffd700'}  color2={'#ffd700'}/>
            <Rate>{item.rate}{item.view} </Rate>
            <Contentcheck>{' / '}</Contentcheck>
            <RecordContent>짐보관 {item.use}회 운영중</RecordContent>
          </Record>
          <TaskSummary>{item.info}</TaskSummary>
      </Column>
   
      </div>

      
      <RegionTime>
        <Region>{item.region} </Region>
        {
          item.boxdisplay == '포장박스있음' && ( <OutTime>
            <div >{item.boxdisplay}</div></OutTime>) 
        }
      </RegionTime>

    </Container>
  );
}

export default Room;
