import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import Button from '../common/Button';
import Question from '../components/Question';

const useqna = [{ "data1": "[이용문의] 회원가는 어떻게 적용되나여?", "data2": "마원 회원가입을 하시면 바로 회원가를 적용받을수 있습니다 회원 혜택을 받으시라면 전화 예약시 꼭 마원화원이라고 말씀해주셔야 적용됩니다" },
  { "data1": "운영중인 업체를 등록하고 싶어요", "data2": "마원 입접을 원하실 경우, 아래와 같은 방법으로 진행해 주세여 1. 마원 고객센타로 전화 문의 2.카카오톡 채널에서 마원검색 체팅하기 3. 입점신청하기 클릭" },
  { "data1": "1:1 문의는 어떻게 하나요?", "data2": "마원앱 > 내설정 > 고객문의 " },
  { "data1": "정확한 내위치 확인이 안됩니다", "data2": "단말기 GPS 를통한 내 위치 설정시 단말기 상태에 따라 위치 인식에 예외가 발생할수 있으므로 GPS재설정을 통해 정확하게 확인해주시기 바랍니다" },
  { "data1": "고객센타 연결이 지연될때는 어떻게 하나여?", "data2": "일부시간대에는 통화량이 많아 상담사 연결이 지연될수 있습니다." },
]
const couponqna = [{ "data1": "쿠폰을 이용할수있는 매장이 보이지않아요", "data2": "마원에서 제공하는 검색옵션을 통해 쿠폰있는 매장을 검색해보세여" },
  { "data1": "쿠폰함에서 쿠폰이 사라졌어요", "data2": "사용자 하지않은 쿠폰의 경우 유효기간이 지나면 쿠폰함에서 자동으로 삭제 됩니다" }]

const reviewqna = [{ "data1": "리뷰는 어떻게 수정 삭제 되나여?", "data2": "내 계정에서 등록한 리뷰이며, 등록 후 48시간이내에만 리뷰수정/삭제가 가능합니다" },
  { "data1": "리뷰가 블라인드 처리되었어요", "data2": "1. 업체와 무관한 내용이나 동일문자의 반복등 부적합한 내용인 경우 2. 타업체을 거론한 리뷰 3. 스팸, 광고도배성 리뷰" }];
const eventqna = [{ "data1": "이벤트 내용을 확인이 안되는 경우", "data2": "내 상점에서 이벤트 내용을 직접 확인해보세요" }];

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


const Frequentquestioncontainer = ({containerStyle}) => {
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
      
      <div style={{display:"flex"}}>
        <Text value={'자주 묻는 질문'} size={14} />
      </div>

      <ButtonLayout>
        {
          useguidebtn == true ? (<Button buttonText={'이용문의'}  callback={_handleno}
            containerStyle={{ backgroundColor: "#FF5826", color: '#fff', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />) : (
              <Button buttonText={'이용문의'} callback={_handleuseguide}
                containerStyle={{ backgroundColor: "#FFF", color: '#000', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />
            )
        }
             
        {
          couponguidebtn == true ? (<Button buttonText={'쿠폰/포인트'}  callback={_handleno}
            containerStyle={{ backgroundColor: "#FF5826", color: '#fff', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />) : (
              <Button buttonText={'쿠폰/포인트'} callback={_handlecouponguide}
                containerStyle={{ backgroundColor: "#FFF", color: '#000', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />
            )
        }
        {
          reviewguidebtn == true ? (<Button buttonText={'리얼리뷰'}  callback={_handleno}
            containerStyle={{ backgroundColor: "#FF5826", color: '#fff', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />) : (
              <Button buttonText={'리얼리뷰'} callback={_handlereviewguide}
                containerStyle={{ backgroundColor: "#FFF", color: '#000', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />
            )
        }
        {
          eventguidebtn == true ? (<Button buttonText={'이벤트'}  callback={_handleno}
            containerStyle={{ backgroundColor: "#FF5826", color: '#fff', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />) : (
              <Button buttonText={'이벤트'} callback={_handleeventguide}
                containerStyle={{ backgroundColor: "#FFF", color: '#000', width: "100px", height: 40, borderRadius: 5, margin: "10px 10px 10px 0px", border: "1px solid #ededed" }} />
            )
        }


      </ButtonLayout>

      {
        useguidebtn == true && <QuestionLayout>
          {
            useqna.map((item, index) => (
              <Question data1={item.data1} data2= {item.data2}></Question>
            ))
          }
        </QuestionLayout>
      }

      {
        couponguidebtn == true && <QuestionLayout>
          {
            couponqna.map((item, index) => (
              <Question data1={item.data1} data2= {item.data2}></Question>
            ))
          }
        </QuestionLayout>
      }
          
      {
        reviewguidebtn == true && <QuestionLayout>
          {
            reviewqna.map((item, index) => (
              <Question data1={item.data1} data2= {item.data2}></Question>
            ))
          }
        </QuestionLayout>
      }

      {
        eventguidebtn == true && <QuestionLayout>
          {
            eventqna.map((item, index) => (
              <Question data1={item.data1} data2= {item.data2}></Question>
            ))
          }
        </QuestionLayout>
      }

    </Container>
  );
}

export default Frequentquestioncontainer;
