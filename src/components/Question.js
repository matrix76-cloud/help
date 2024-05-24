import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
const Container = styled.div`

`

const QuestionLine = styled.div`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #ededed;
  height       : 50px;
  align-items  : center;

`
const QuestionItem = styled.div`
`
const QuestionButtonLayer = styled.div`
`


const AnswerLine = styled.div`
  display : flex;
  flex-direction : row;
  background : #f0f0f0;
  padding :20px 10px;
  margin-top:5px;


`
const Question = ({containerStyle, data1, data2}) => {

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(1);
  const [check, setCheck] = useState(false);



  const _handleCheck = () => {
    setCheck(!check);
    setRefresh(refresh => refresh + 1);
  }
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
   }, [])
  
  useEffect(() => {
    setCheck(check);
  },[refresh])



  return (
    <Container style={containerStyle}>
      <QuestionLine>
        <QuestionItem>
          <Text value={data1} size={14} />
        </QuestionItem>
        <QuestionButtonLayer onClick={_handleCheck}>
          {check == false && <SlArrowDown />}
          {check == true && <SlArrowUp />}
        </QuestionButtonLayer>

      </QuestionLine>
      {check == true &&
          <AnswerLine>
              <Text value={data2} size={14} color={'#999'}/>
          </AnswerLine>
      }
      
    </Container>
  );
}

export default Question;
