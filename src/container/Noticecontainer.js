import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import Button from '../common/Button';
import Question from '../components/Question';

const useqna = [{ "data1": "마원 출시 이벤트 공지사항", "data2": "마원 출시를 합니다. 마원가입자의 경우는 엄청난 혜택을 드립니다" },

]

const Container = styled.div`
  margin-top:70px;
  padding : 0px 20px;
`
const ButtonLayout = styled.div`

  display:flex;
  flex-direction : row;
  flex-wrap : wrap;
  width: 400px;
  justify-content: flex-start;
`
const QuestionLayout = styled.div`
  display:flex;
  flex-direction : column;
  justify-content: flex-start;
  margin-top:30px;
`


const Noticecontainer = ({containerStyle}) => {
  const navigation = useNavigate();
    
  const [useguidebtn, setUseguidebtn] = useState(true);
  const [couponguidebtn, setCouponguidebtn] = useState(false);
  const [reviewguidebtn, setReviewguidebtn] = useState(false);
  const [eventguidebtn, setEventguidebtn] = useState(false);

  const [refresh, setRefresh] = useState(1);

   useEffect(()=>{
    async function fetchData(){


		}
		fetchData();
  }, [])


  const _handleuseguide = () => {
    setUseguidebtn(!useguidebtn);
    setCouponguidebtn(false);
    setReviewguidebtn(false);
    setEventguidebtn(false);
    setRefresh(refresh => refresh + 1);
  }
  const _handlecouponguide = () => {
    setCouponguidebtn(!couponguidebtn);
    setUseguidebtn(false);
    setReviewguidebtn(false);
    setEventguidebtn(false);
    setRefresh(refresh => refresh + 1);
  }
  const _handlereviewguide = () => {
    setReviewguidebtn(!reviewguidebtn);
    setUseguidebtn(false);
    setCouponguidebtn(false);
    setEventguidebtn(false);
    setRefresh(refresh => refresh + 1);
  }
  const _handleeventguide = () => {
    setEventguidebtn(!eventguidebtn);
    setUseguidebtn(false);
    setCouponguidebtn(false);
    setReviewguidebtn(false);
    setRefresh(refresh => refresh + 1);
  }
  const _handleno = () => {
    
  }

  useEffect(() => {
    setUseguidebtn(useguidebtn);
    setCouponguidebtn(couponguidebtn);
    setReviewguidebtn(reviewguidebtn);
    setEventguidebtn(eventguidebtn);
  },[refresh])

  return (
    <Container style={containerStyle}>
      
        <QuestionLayout>
          {/* {
            useqna.map((item, index) => (
              <Question data1={item.data1} data2= {item.data2}></Question>
            ))
          } */}
        </QuestionLayout>

    </Container>
  );
}

export default Noticecontainer;
