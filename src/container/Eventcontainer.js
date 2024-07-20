
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  margin-top:100px;
`
const EventMain = styled.div`

  font-size: 16px;
  color: #000;
  margin-top:200px;
  padding:20px;


`

const EventDesc1 = styled.div`
  font-size: 18px;
  color: #706c6c;
  text-align: left;
  line-height: 1.5;
  margin: 20px;

`

const Eventcontainer = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
          <EventMain>
            이벤트는 총 5가지 타입으로 만들어졌으면 좋겠습니다 
            (타임룰렛, 출석체크, 8월한달간 가입한 신규회원 이벤트, 친구추가, 이달의 활동왕)

            이벤트 예시는 내정보에서 이벤트 보기 클릭하시면 샘플이미지가 있습니다
          </EventMain>

    </Container>
  );
}

export default Eventcontainer;
