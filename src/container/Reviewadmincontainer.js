
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { get_review, update_review2 } from '../service/ReviewService';
import ReviewItem from '../components/ReviewItem';
import { add_baduser, get_baduser } from '../service/BadUserService';

const Container = styled.div`
  margin-top:60px;


`

const Reviewadmincontainer = ({containerStyle, STORE_ID}) => {
  const [storereviewitems, setStorereviewitems] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(1);
   useEffect(()=>{
    async function fetchData(){
      const storereviews = await get_review({STORE_ID});
      setStorereviewitems(storereviews);

		}
		fetchData();
   }, [])
  
  const update2callback = async (REVIEW_ID, REVIWCONTENTS_SECURITY) => {

    if (REVIWCONTENTS_SECURITY == true) {
      alert("블라인드 처리된 댓글을 해제하였습니다");

    } else {
      alert("댓글이 블라인드 처리 되었습니다");
    }

    const SECURITY = !REVIWCONTENTS_SECURITY;
    const updatereview = await update_review2({ SECURITY, REVIEW_ID });
    
    async function fetchData() {
      const storereviews = await get_review({STORE_ID});
      setStorereviewitems(storereviews);

      setRefresh(refresh => refresh + 1);
		}
		fetchData();
  }
  const update3callback = async (STORE_ID, USER_ID) => {

    // 부정 사용자로 이미 신고했는지 여부 확인

    const badUseritems = await get_baduser({ USER_ID, STORE_ID });
    
    console.log("baduser", USER_ID, STORE_ID);
    if (badUseritems.length != 0) {
      alert("이미 등록된 불량 사용자 입니다");
      return;
    } else {
         // 부정 사용자로 신고가 안되어 있다면 신고 하자
      const updatereview = await add_baduser({ USER_ID, STORE_ID });

      alert("불량사용자로 등록하였습니다"); 
    }


  }

  useEffect(() => {
    setStorereviewitems(storereviewitems);
  }, [refresh])

  return (
    <Container style={containerStyle}>
      {
        storereviewitems.map((data, index)=>(
          <ReviewItem data={data} myreview={false} update2callback={update2callback}
            update3callback={update3callback}
            storeinreview={false}
            index={index} containerStyle={{ padding: 10 }} />
        ))
      } 
    </Container>
  );
}

export default Reviewadmincontainer;
