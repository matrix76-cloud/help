import React,{useState, useEffect, Fragment} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Image from '../common/Image';
import { CommaFormatted, convertTo_security, getDateFullTime, getDateOrTime, getTime } from '../utility/common';
import { colors, theme } from '../theme/theme';
import { imageDB } from '../utility/imageData';
import Text from '../common/Text';
import { get_userInfoForUID } from '../service/UserService';
import Button from '../common/Button';
import { delete_review } from '../service/ReviewService';
import ReviewupdateModalEx from './ReviewupdateModalEx';
import { ReviewContent } from '../utility/contentDefine';
import ReactStars from 'react-stars';

const Container = styled.div`
 background-color : #fff;
 width:100%;

`;

const ReviewDetailItem = styled.div`
  margin: 10px 0px;
  padding: 20px;
  background-color: ${({bgcolor}) => bgcolor};
  border-radius: 5px;

`

const ReviewPersonItem = styled.div`

    display : flex;
    flex-direction : row;
    justify-content: space-between;
    align-items: center;
   
`


const ReviewContentItem = styled.div`
    padding : 10px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 20px;
    height: 40px;
    word-break: break-word;
`



const EmptyRow = styled.div`
  background-color :#F7F7F7;
  height:3px;
  width:100%;
`
const ReviewWriter = styled.div`
  display: flex;
  font-size: 12px;
  color: #999;
`
const Pictureline = styled.div`

`

const Row = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  margin-top:10px;
`
const Box = styled.div`
  height: 45px;
  width: 18%;
  background-color: #ffffff78;
  margin: 0px 2px;
  color: #000;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;

`

const BoxTotal = styled.div`
  height:50px;
  width:20%;
  margin: 0px 5px;
  color : #000;
  display:flex;
  flexDirection:column;
  justify-content : center;
  align-items:center;

`

const BoxData= styled.div`
  font-size:8px;
  margin-top:5px;

`
const BoxScore = styled.div`
  font-size:14px;
`
const BoxTotalScore = styled.div`
  font-size:16px;
`
const ActivityView = styled.div`
  font-size: 12px;
  text-decoration: underline;

`


const HongItem = ({ containerStyle,NO, USER_IMG,USER_NICKNAME,ADDR,SCORE1, SCORE2,SCORE3, SCORE4, bgcolor}) => {

  const navigate = useNavigate();
  const [reviewstatus, setReviewstatus] = useState(false);
  const [userimg, setUserimg] = useState('');
  const [refresh, setRefresh] = useState(1);



  useEffect(() => {
    async function fetchData() {


  }
  fetchData();
  }, [])


  useEffect(() => {

  }, [refresh])

  const _handleprofile = ()=>{
    navigate("/hongladyprofile");
  }


  return (
    <Container style={containerStyle}>
      <ReviewDetailItem bgcolor={bgcolor}>
            <ReviewPersonItem>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>

                <Pictureline>
                <Image
                  source={USER_IMG}
                  containerStyle={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                </Pictureline>
          

                <div style={{ paddingLeft: 10 }}>
                  <Text
                    value={USER_NICKNAME}
                    size={15}
                    containerStyle={{ justifyContent: "unset" }}
                  />
                  <Text
                    value={ADDR}
                    size={12}
                    color={"#999"}
                  />
                </div>
              </div>
        

       
            </ReviewPersonItem>

            <Row>
                  <Box>
                    <div>
                      <BoxData>출석지수(10)</BoxData>
                      <BoxScore>{SCORE1}</BoxScore>
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <BoxData>평판지수(30)</BoxData>
                      <BoxScore>{SCORE2}</BoxScore>
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <BoxData>응답지수(10)</BoxData>
                      <BoxScore>{SCORE3}</BoxScore>
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <BoxData>거래지수(50)</BoxData>
                      <BoxScore>{SCORE4}</BoxScore>
                    </div>
                  </Box>
                  <BoxTotal>
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                      <BoxData>평점</BoxData>
                      <BoxTotalScore>{SCORE1 + SCORE2 + SCORE3 + SCORE4}점</BoxTotalScore>
                    </div>
                  </BoxTotal>

            </Row>
  

       

        

      </ReviewDetailItem>
      <EmptyRow />
    </Container>
  );
}

export default HongItem;
