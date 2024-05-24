
import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import Text from '../common/Text';
import { theme } from '../theme/theme';
import { ReviewContent } from '../utility/reviewDefine';
import GuideLabel from '../components/GuildeLable';
import { MaroneContent } from '../utility/maroneDefine';
import Button from '../common/Button';
import { add_review } from '../service/ReviewService';
import { UserContext } from '../context/User';

const Container = styled.div`
  margin-top:50px;
`


const Col = styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
  width :90%;
  padding : 0px 5%;


`

const Row = styled.div`
  display : flex;
  flex-direction : row;
  justify-content: center;
  align-items: center;
  padding :0px 10px;

`
const ReviewItem = styled.div`
  display : flex;
  justify-content: space-start;
  align-items: center;
  background : ${({bgcolor}) =>bgcolor};
  width : 100%;
  height :40px;
  margin : 2px 0px;
  border :1px solid #ededed;
`


const Reviewcontainer = ({containerStyle,STORE}) => {
  const {user, dispatch2} = useContext(UserContext);

  const USER = user.uid;
  const navigate = useNavigate();
  const [selectItems, setSelectItems] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [reviewcontent, setReviewcontent] = useState('');
   useEffect(()=>{
    async function fetchData(){

		}
		fetchData();
    window.scrollTo(0,0);
  }, [])

  const _handleReviewCheck = (content) =>{

    const FindIndex = selectItems.findIndex(x=>x == content);

    if(FindIndex != -1){
      selectItems.splice(FindIndex, 1);
    }else{
      selectItems.push(content);
    }

    setRefresh(refresh => refresh + 1);
  }
  const CheckSelectReview = (content)=>{
    const FindIndex = selectItems.findIndex(x=>x == content);

    if(FindIndex != -1){
      return true;
    }else{
      return false;
    }
  }

  const reviewwritecallback = async() =>{
    // 매장아이디, 손님아이디, 내용 , 아이템
    
    if (selectItems.length > 2) {
      alert("2개이상 선택 할수 없습니다");
      return;
    }
    
    const USER_NICKNAME = user.nickname;
    const CONTENTS = reviewcontent;
    const ITEMS = selectItems;
    const STORENAME = STORE.STORENAME;
    const STOREIMAGEARY = STORE.STOREIMAGEARY;
    const STORE_ID = STORE.STORE_ID;
    const USER = user.uid;


    console.log("REVIEW ITEM REGIST", user);

    const registreview = await add_review({USER,STORENAME,STOREIMAGEARY,
       USER_NICKNAME, STORE_ID, CONTENTS, ITEMS});

    if(registreview != null){
      alert("댓글이 등록되었습니다");
      navigate("/store",{state:{STORE:STORE, REFRESH : false}});
    }
  }

  useEffect(()=>{
    setSelectItems(selectItems);
  }, [refresh])


  return (
    <Container style={containerStyle}>
      <GuideLabel
        height={120}
        LabelText={"리뷰작성"}
        SubLabelText={MaroneContent.review}
      />

      <Col>
        {ReviewContent.map((data, index) => (
          <ReviewItem
            onClick={() => {
              _handleReviewCheck(data.content);
            }}
            storeinreview={true}
            bgcolor={
              CheckSelectReview(data.content) == false ? "#f9f9f9" : "#ffb00c"
            }
            key={index}
          >
            <Row>
              <Text
                value={data.imagecontent}
                size={16}
                containerStyle={{ marginRight: 5 }}
              />
              <Text
                value={data.content}
                color={
                  CheckSelectReview(data.content) == false
                    ? theme.black
                    : theme.black
                }
                size={12}
              />
            </Row>
          </ReviewItem>
        ))}
      </Col>
      <div style={{ marginTop: 20, width: "90%", padding: "0px 5%" }}>
        <textarea
          type="text"
          style={{
            fontSize: 14,
            width: "95%",
            backgroundColor: "#f9f9f9",
            height: 100,
            padding: 10,
            fontSize: "12px",
            border: "none",
            outline: 0,
            resize: "none",
            fontFamily: "SF-Pro-Text-Regular",
          }}
          placeholder={"댓글을 입력해주세여"}
          onChange={(e) => {
            setReviewcontent(e.target.value);
            setRefresh((refresh) => refresh + 1);
          }}
        ></textarea>
      </div>

      <Button
        callback={reviewwritecallback}
        buttonText={"댓글 등록"}
        containerStyle={{
          backgroundColor: theme.main,
          fontSize: 16,
          margin: "20px 5%",
          color: "#fff",
          width: "90%",
          height: "40px",
          borderRadius: 5,
        }}
      />
    </Container>
  );
}

export default Reviewcontainer;
