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

const Container = styled.div`
 background-color : #fff;

`;

const ReviewDetailItem = styled.div`
  margin: 20px 0px;

`
const ReviewDetailItem2 = styled.div`
  padding: 20px;

`
const ReviewPercentItem = styled.div`
  background:${({bgcolor}) =>bgcolor};
  width: ${({width}) =>width};
  height :40px;
  display : flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`
const ReviewPersonItem = styled.div`

    display : flex;
    flex-direction : row;
    justify-content: flex-start;
    align-items: center;
`
const ReviewDataItem = styled.div`

    display : flex;
    flex-direction : column;
    justify-content: space-between;


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
const ReviewContentItem2 = styled.div`
    padding : 10px 10px 20px 20px;

`
const ReviewTagItem = styled.div`
    display : flex;
    flex-direction : row;
    align-items:center;
`
const ReviewTag = styled.div`


  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  height: 30px;
  font-size: 13px;
  padding: 0px 10px;
  color: #999;
  border-radius: 2px;
`;

const EmptyRow = styled.div`
  background-color :#F7F7F7;
  height:3px;
  width:100%;
`
const BlindreviewTag = styled.div`
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #ff0000;
    padding-left: 10px;
`


const ReviewItem = ({ containerStyle, data, myreview, index, deletecallback, updatecallback,
update2callback,update3callback, storeinreview}) => {

  const navigate = useNavigate();
  const [reviewstatus, setReviewstatus] = useState(false);
  const [userimg, setUserimg] = useState('');
  const [refresh, setRefresh] = useState(1);



  function ReviewItemFindImg(content){

    const FindIndex = ReviewContent.findIndex(x=>x.content == content);

    if(FindIndex != -1){

      console.log("find image",  ReviewContent[FindIndex].imagecontent);
      return ReviewContent[FindIndex].imagecontent;
    }
  }

  const _handlereviewblind = () => {
    update2callback(data.REVIEW_ID,data.REVIWCONTENTS_SECURITY);
  }
  const _handlereviewbaduser = () => {
    update3callback(data.STORE_ID, data.USER_ID)
  }
  
  const _handlereviewdelete = () => {
    if (window.confirm("정말 댓글을 삭제하시겠습니까?")) {
      deletecallback(data.REVIEW_ID);
      alert("삭제되었습니다.");

    } else {
      alert("취소합니다.");

    }

  }
  const _handlereviewupdate = () => {
    setReviewstatus(!reviewstatus);
    setRefresh(refresh => refresh + 1);
  }

  const reviewupdatecallback = (reviewcontent) => {
    setReviewstatus(false);
    updatecallback(reviewcontent, data.REVIEW_ID);
  }

  useEffect(() => {
    async function fetchData() {

    const USER_ID = data.USER_ID;
    const user = await get_userInfoForUID({USER_ID});
    setUserimg(user.USER_IMAGE);
  }
  fetchData();
  }, [])


  useEffect(() => {
      setReviewstatus(reviewstatus);
  }, [refresh])


  return (
    <Container style={containerStyle} index={index}>
      {reviewstatus == true ? (
        <ReviewupdateModalEx
          callback={reviewupdatecallback}
        ></ReviewupdateModalEx>
      ) : null}

      {storeinreview == true && (
        <>
          <ReviewDetailItem>
            <ReviewPersonItem>
              <Image
                source={userimg}
                containerStyle={{
                  width: "30px",
                  height: "30px",
                }}
              />

              <div style={{ paddingLeft: 10 }}>
                <Text
                  value={data.USER_NICKNAME}
                  size={15}
                  containerStyle={{ justifyContent: "unset" }}
                />
                <Text
                  value={getDateFullTime(data.REGISTDATE)}
                  size={12}
                  color={"#999"}
                />
              </div>
            </ReviewPersonItem>

            <ReviewContentItem>
              {data.REVIWCONTENTS_SECURITY == true ? (
                <Text
                  value={convertTo_security(data.CONTENTS)}
                  size={14}
                  containerStyle={{
                    justifyContent: "flex-start",
                    color: "#b4afaf",
                  }}
                />
              ) : (
                <Text
                  value={data.CONTENTS}
                  size={14}
               
                  containerStyle={{
                    justifyContent: "flex-start",
                    color: "#333232",
                  }}
                />
              )}
            </ReviewContentItem>

            <ReviewTagItem>
            {data.ITEMS.map((item, index) => (
                <>
                  <div>{ReviewItemFindImg(item)}</div>
                  <ReviewTag colors={"#6d6969"}>{item}</ReviewTag>
                </>
              ))}
            </ReviewTagItem>
          </ReviewDetailItem>
          <EmptyRow />
        </>
      )}

      {myreview == false && storeinreview == false && (
        <Fragment>
          <ReviewDetailItem>
            <ReviewPersonItem>
              <Image
                source={userimg}
                containerStyle={{
                  width: "30px",
                  height: "30px",
                }}
              />

              <div style={{ paddingLeft: 10 }}>
                <Text
                  value={data.USER_NICKNAME}
                  size={15}
                  containerStyle={{ justifyContent: "unset" }}
                />
                <Text
                  value={getDateFullTime(data.REGISTDATE)}
                  size={12}
                  color={"#999"}
                />
              </div>

              <Button
                buttonText={"불량 사용자신고"}
                callback={_handlereviewbaduser}
                containerStyle={{
                  color: "#fff",
                  background: "#777676",
                  width: "90px",
                  height: "25px",
                  fontSize: "12px",
                  marginLeft:"20px",
                  borderRadius:"5px"
                }}
              />
            </ReviewPersonItem>

            <ReviewContentItem>
              <Text
                value={data.CONTENTS}
                size={14}
                containerStyle={{
                  justifyContent: "flex-start",
                  color: "#333232",
                }}
              />
            </ReviewContentItem>
            {/* <div style={{ display: "flex", flexDirection: "row" }}>
              {data.REVIWCONTENTS_SECURITY == true ? (
                <Button
                  buttonText={"댓글 블라인드 처리됨"}
                  callback={_handlereviewblind}
                  containerStyle={{
                    border: "1px solid #a8a3a3",
                    color: "#999",
                    width: "130px",
                    margin: "10px 0px 0px 10px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                />
              ) : (
                <Button
                  buttonText={"댓글 블라인드"}
                  callback={_handlereviewblind}
                  containerStyle={{
                    color: "#fff",
                    background: "#FF4E19",
                    width: "130px",
                    margin: "10px 0px 0px 10px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                />
              )}

              <Button
                buttonText={"불량 사용자신고"}
                callback={_handlereviewbaduser}
                containerStyle={{
                  color: "#fff",
                  background: "#FF4E19",
                  width: "90px",
                  margin: "10px 0px 0px 10px",
                  height: "30px",
                  fontSize: "12px",
                }}
              />
            </div> */}

            <ReviewTagItem>
            {data.ITEMS.map((item, index) => (
                <>
                  <div>{ReviewItemFindImg(item)}</div>
                  <ReviewTag colors={"#6d6969"}>{item}</ReviewTag>
                </>
              ))}
            </ReviewTagItem>
          </ReviewDetailItem>
          <EmptyRow />
        </Fragment>
      )}

      {myreview == true && storeinreview == false && (
        <Fragment>
          <ReviewDetailItem2>
            <ReviewPersonItem>
              <img
                src={data.STOREIMAGEARY[0]}
                style={{ width: "90px", height: "90px", borderRadius: "5px" }}
              />

              <ReviewDataItem>
                <div style={{ paddingLeft: 10 }}>
                  <Text
                    value={data.STORENAME}
                    size={15}
                    containerStyle={{ justifyContent: "unset" }}
                  />
                  <Text
                    value={getDateFullTime(data.REGISTDATE)}
                    size={14}
                    color={"#999"}
                    containerStyle={{ justifyContent: "unset" }}
                  />
                </div>
                <div style={{ paddingLeft: 10 }}>
                  <Text
                    value={data.CONTENTS}
                    shorten={true}
                    size={14}
                    containerStyle={{
                      justifyContent: "flex-start",
                      color: "#333232",
                      paddingTop:10,
                    }}
                  />
                </div>
                {data.REVIWCONTENTS_SECURITY == true && (
                  <BlindreviewTag>
                    **관리자에 의해 블라인드 처리되었습니다
                  </BlindreviewTag>
                )}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    buttonText={"삭제"}
                    callback={_handlereviewdelete}
                    containerStyle={{
                      color: "#fff",
                      background:"#9c9898",
                      width: "50px",
                      margin: "10px 0px 0px 10px",
                      height: "20px",
                      fontSize: "11px",
                      borderRadius:"5px",
                    }}
                  />
                  <Button
                    buttonText={"수정"}
                    callback={_handlereviewupdate}
                    containerStyle={{
                      color: "#fff",
                      background:"#ff4e19",
                      width: "50px",
                      margin: "10px 0px 0px 10px",
                      height: "20px",
                      fontSize: "11px",
                      borderRadius:"5px",
                    }}
                  />
                </div>
              </ReviewDataItem>
            </ReviewPersonItem>

            <ReviewTagItem>
              {data.ITEMS.map((item, index) => (
                <>
                  <div>{ReviewItemFindImg(item)}</div>
                  <ReviewTag colors={"#6d6969"}>{item}</ReviewTag>
                </>
              ))}
            </ReviewTagItem>
          </ReviewDetailItem2>
          <EmptyRow />
        </Fragment>
      )}
    </Container>
  );
}

export default ReviewItem;
