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

`;

const ReviewDetailItem = styled.div`
  background: #f9f9f9;
  margin: 20px 0px;
  padding: 10px;

`

const ReviewPersonItem = styled.div`

    display : flex;
    flex-direction : row;
    justify-content: flex-start;
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



const CommunityReviewItem = ({ containerStyle,USER_IMG,USER_NICKNAME,REGISTDATE,CONTENTS,WRITER,STAR }) => {

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


  return (
    <Container style={containerStyle} >
      <ReviewDetailItem>
            <ReviewPersonItem>
              <Image
                source={USER_IMG}
                containerStyle={{
                  width: "30px",
                  height: "30px",
                }}
              />

              <div style={{ paddingLeft: 10 }}>
                <Text
                  value={USER_NICKNAME}
                  size={15}
                  containerStyle={{ justifyContent: "unset" }}
                />
                <Text
                  value={getDateFullTime(REGISTDATE)}
                  size={12}
                  color={"#999"}
                />
              </div>
            </ReviewPersonItem>
       

       

            <ReviewContentItem>
                <Text
                  value={CONTENTS}
                  size={14}
               
                  containerStyle={{
                    justifyContent: "flex-start",
                    color: "#333232",
                  }}
                />
            </ReviewContentItem>



      </ReviewDetailItem>
      <EmptyRow />
    </Container>
  );
}

export default CommunityReviewItem;
