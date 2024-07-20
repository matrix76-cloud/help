import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import {
  HashRouter,
  Route,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Swipe from "../common/Swipe";
import { get_banner1, get_banner2 } from "../service/BannerService";
import ImageButton from "../common/ImageButton";
import { imageDB } from "../utility/imageData";
import Text from "../common/Text";
import styled from "styled-components";

import GroupItem from "../components/GroupItem";
import Label from "../common/Label";
import Button from "../common/Button";
import CommunityItem from "../components/CommunityItem";
import Image from "../common/Image";
import ReviewItem from "../components/ReviewItem";
import CommunityReviewItem from "../components/CommunityReviewItem";

const Container = styled.div`
  margin-top:50px;
`;
const Groups = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
`

const Emptyline = styled.div`
  background-color: #ededed;
  height: ${({height}) => height}px;
`;

const NameContent = styled.div`
  font-family: 'SF-Pro-Text-Semibold';
  font-weight: 600;
  font-size: 23px;
  text-align: left;
  padding: 20px;


`

const ReviewPersonItem = styled.div`

    display : flex;
    flex-direction : row;
    justify-content: flex-start;
    align-items: center;
    padding:10px;
`

const textStyle={
    fontSize: "16px",
    width: "95%",
    minHeight: "300px",
    outline: "none",
    border: "none",
    padding: "10px",
    resize: "none",
    fontFamily: "SF-Pro-Text-Regular",
    lineHeight: 2,
    color: "#666",
}
const CommunityDetailcontainer = ({item}) => {


  const navigate = useNavigate();

  const location = useLocation();
  const scrollPositions = useRef({});
  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);
  
  return (
    <Container>

      {
        item.imgs.length > 0 && <img src={item.imgs[0]} style={{width:"100%", height:"350px"}}/>
      }


      <ReviewPersonItem>
          <Image
            source={imageDB.maroneperson2}
            containerStyle={{
              width: "30px",
              height: "30px",
            }}
          />

          <div style={{ paddingLeft: 10 }}>
            <Text
              value={item.addr}
              size={15}
              containerStyle={{ justifyContent: "unset" }}
            />
            <Text
              value={item.time}
              size={12}
              color={"#999"}
              containerStyle={{ justifyContent: "unset" }}
            />
          </div>
      </ReviewPersonItem>

      <NameContent>{item.name}</NameContent>
      <textarea style={textStyle}>{item.content}</textarea>

      {
        item.imgs.length > 1 &&
        <div >
          {
            item.imgs.map((data)=>(
              <div style={{margin:"10px"}}>
              <img src={data} style={{width:"95%", height:"300px"}}/>
              </div>
            ))
          }

        </div>
      }

    <Emptyline height={5}/>

    <CommunityReviewItem USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fwoman3.png?alt=media&token=f3b9e09b-60ec-4c1d-ad8d-10b4a76cc9b0'} USER_NICKNAME={'이상화'} REGISTDATE={'2024:04:30'} CONTENTS={'우리강아지가 너무 좋아했어요.. 혼자 있는 강아지가 너무 불쌍했는데.... 이제 걱정이 없어 졌어요'} WRITER={'이은*'} STAR={5}/>
    <CommunityReviewItem USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fpngtree-sexy-girl-wearing-a-wreath-image_1080943.jpeg?alt=media&token=5286e72d-cc2b-41f0-b8d7-2859a8a774de'} USER_NICKNAME={'이행렬'} REGISTDATE={'2024:05:01'} CONTENTS={'아주머니가 오셔서 집안청소를 아주 깔끔하게 해주셨고 너무 손이 야무지셧어여'} WRITER={'김정*'} STAR={4}/>  



   
    </Container>
  );
};

export default React.memo(CommunityDetailcontainer);
