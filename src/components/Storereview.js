import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { theme } from '../theme/theme';
import { ReviewContent } from '../utility/reviewDefine';
import { get_review } from '../service/ReviewService';
import { ProgressBar } from 'primereact/progressbar';
import { imageDB } from '../utility/imageData';
import Image from '../common/Image';
import Empty from '../common/Empty';
import ReviewItem from './ReviewItem';
import { get_baduser } from '../service/BadUserService';
import { UserContext } from '../context/User';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: flex-start;
  padding:20px;


`
const Col = styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
  width :100%;
  margin-top:20px;

`
const Col1 = styled.div`
  display : flex;
  flex-direction : column;
  width :100%;
  margin-top:20px;

`
const EmptyRow = styled.div`
  background-color :#F7F7F7;
  height:3px;
  width:100%;
`

const Row = styled.div`
  display : flex;
  flex-direction : row;
  justify-content: center;
  align-items: center;

`
const ReviewSelectItem = styled.div`
  display : flex;
  justify-content: space-start;
  align-items: center;
  background : ${({bgcolor}) =>bgcolor};
  width : 100%;
  height :40px;
  margin : 2px 0px;
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
const Storereview = ({containerStyle, store, create, SELF}) => {

  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);

  const [reviewitems, setReviewitems] = useState([]);
  const [totalitemcount, setTotalitemcount] = useState(0);

  const [categoryreviewitems, setCategoryreviewitems]= useState([]);
  const [refresh, setRefresh] = useState(1);
  const _handlereviewwrite = async (store) => {

    if(SELF == true){
      return;
    }
    if(create == false){
      alert("본인 상점입니다");
      return;
    }
    
    console.log("user inforamtion", user);
    
    if (user.uid == '') {
      alert("로그인이 필요한 메뉴입니다");
      return;
    }
    

    //부정사용자인지 여부확인하고 부정사용자 이면 리뷰 못쓰게 하자
    const USER_ID = user.uid;
    const STORE_ID = store.STORE_ID;
    const badUseritems = await get_baduser({ USER_ID, STORE_ID });
    

    if (badUseritems.length != 0) {
      alert("불량사용자로 등록되어 댓글기능을 사용하지 못합니다 감사합니다");
      return;
    } 

    navigate("/review",{state:{STORE:store}});
  }

  const percentage = (count)=>{


    return count/totalitemcount * 100;
  }
  const percentagecolor = (count)=>{


    if (count == 0) {
      return "#f9f9f9";
    } else {
      return "#ffb00c";
    }
   
  }

   useEffect(()=>{
   
    let reviewlist = [];
    let reviewcontentTmp = [];

    reviewcontentTmp = ReviewContent;
     
    async function fetchData(){

      const STORE_ID = store.STORE_ID;

      reviewlist= await get_review({STORE_ID});

      let iTotalcount = 0;
      reviewcontentTmp.map((data, index) => {
        data.count = 0; 

        reviewlist.map((subdata, subindex) => {
          subdata.ITEMS.map((review, reviewindex) => {
            if (data.content == review) {
              reviewcontentTmp[index].count = reviewcontentTmp[index].count + 1;

              console.log("reveiwcontentTmp", reviewcontentTmp);
            }
          });
        });
        iTotalcount++;
      });
      setTotalitemcount(iTotalcount);
      setCategoryreviewitems(reviewcontentTmp);
      setReviewitems(reviewlist);


		}
		fetchData();
  }, []);

  useEffect(()=>{
    setReviewitems(reviewitems);
    setTotalitemcount(totalitemcount);
    setCategoryreviewitems(categoryreviewitems);
  },[refresh]);

  const _handleReviewMore = () => {
    navigate("/reviewall", { state: { REVIEWITEMS: reviewitems } });
  }

  return (
    <Container style={containerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text
          value={"이용후기(" + reviewitems.length + ")건"}
          containerStyle={{ fontWeight: 600 }}
          size={14}
        />
        <div
          onClick={() => {
            _handlereviewwrite(store);
          }}
        >
          <Text
            value={"리뷰작성하기"}
            color={theme.grey}
            containerStyle={{ fontWeight: 400, textDecoration: "underline" }}
            size={14}
          />
        </div>
      </div>

      <Col>
        {categoryreviewitems.map((data, index) => (
          <ReviewSelectItem bgcolor={"#f9f9f9"}>
            <ReviewPercentItem
              width={"100%"}
              bgcolor={percentagecolor(data.count)}
            >
              <Row>
                <Text
                  value={data.imagecontent}
                  size={16}
                  containerStyle={{ marginRight: 5 }}
                />
                <Text value={data.content} size={14} />
              </Row>
              <div>
                <Text value={data.count} size={14} />
              </div>
            </ReviewPercentItem>
          </ReviewSelectItem>
        ))}
      </Col>
      <Col1>
        {reviewitems.map((data, index) => (
          <>
            {index < 2 && (
              <ReviewItem
                data={data}
                myreview={false}
                index={index}
                storeinreview={true}
              />
            )}
          </>
        ))}
      </Col1>

      {reviewitems.length > 2 && (
        <>
          <Button
            buttonText={"댓글 더보기 " + reviewitems.length + "건"}
            callback={_handleReviewMore}
            containerStyle={{
              backgroundColor : "#ededed",
              color: "#000",
              width: "90%",
              margin: "10px 0px 30px 10px",
              height: "40px",
              fontSize: "14px",
              border: "1px solid #d0d0d0",
              borderRadius: "5px",
            }}
          />
        </>
      )}
    </Container>
  );
}

export default Storereview;
