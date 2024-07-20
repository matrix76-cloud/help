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
import Categoryfilter from "../components/Categoryfilter";
import Switch from "../common/Switch";
import Themafilter from "../components/Helpfilter";
import Label from "../common/Label";
import MoreButton from "../common/MoreButton";
import Halfshop from "../components/Halfshop";
import {
  get_storeallview,
  get_storeinfoForSTOREID,
  get_stores,
} from "../service/StoreService";
import Premiumshop from "../components/Premiumshop";
import Goldshop from "../components/Goldshop";
import Silvershop from "../components/Silvershop";
import Checkfilter from "../components/Checkfilter";
import Column from "../common/Column";
import Loading from "../common/Loading";
import CategorySubfilter from "../components/CategorySubfilter";
import InitAlert from "../common/InitAlert";
import { get_popup, update_popupcheck } from "../service/PopupService";
import StoreInfo from "../components/Storeinfo";
import { UserContext } from "../context/User";
import { get_userInfoForDevice, login } from "../service/UserService";
import {
  SearchAddress,
  convertSearchcategory,
  convertSearchtag,
  convertSearchthema,
  distanceFunc,
  useSleep,
} from "../utility/common";
import {
  PreferenceFilterArySearch,
  PriceFilterArySearch,
  TagFilterSearch,
  ThemaFilterArySearch,
  ThemaFilterSearch,
} from "../service/SearchService";

import Progress from "../common/Progress";
import { FiAlertCircle } from "react-icons/fi";
import UseScrollRestoration from "../components/UseScrollRestoration";
import Shop from "../components/Shop";
import AdvertiseModalEx from "../components/AdvertiseModalEx";
import moment from "moment";
import Helpfilter from "../components/Helpfilter";
import Managerfilter from "../components/Managerfilter";
import Roomfilter from "../components/Roomfilter";
import Button from "../common/Button";
import ReviewItem from "../components/ReviewItem";
import { width } from "@mui/system";
import { ROLETYPE, REQUESTTYPE } from "../utility/contentDefine";
import { BsArrowClockwise } from "react-icons/bs";
import Task from "../components/Task";
import HongTask from "../components/HongTask";
import RequestResponse from "../components/RequestResponse";



const Container = styled.div`

  margin-bottom:30px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  margin-top:${({top})=> top}px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left:10px;

`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Emptyline = styled.div`
  background-color: #ededed;
  height: ${({height}) => height}px;
`;

const TrendingYScroll = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Searchbox = styled.div`
  display: flex;
  background: #ededed;
  padding: 8px 13px;
  border-radius:  ${({radius}) => radius}px;
  width: ${({width}) => width}%;
`

const RoomTag = styled.div`
  background: #ff4e19;
  color: #fff;
  border-radius: 20px;
  font-size: 10px;
  width: 50%;
  padding: 9px;
  position: relative;
  top: 40px;
  animation: box-ani 1s linear infinite;
  z-index: 2;
  &:after { 
    content: "";
    border-top: 20px solid #ff4e19;
    border-left: 10px solid transparent;
    border-right: 18px solid transparent;
    position: absolute;
    left: 10%;
    right: 80%;
    top: 35px;
    margin: 0 auto;
    width: 0;
    height: 0;
}

`
const FilterButton = styled.div`
  display: flex;
  border: 1px solid #c6c6c6;
  padding: 5px 20px;
  border-radius: 15px;
  font-size: 12px;
`
const FilterButton2 = styled.div`
  display: flex;
  padding: 5px 20px;
  border-radius: 15px;
  font-size: 12px;
`
const Summary = styled.div`

display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
margin-bottom: 50px;
background-color: #f0f0f0;
padding: 20px 10px;
font-size: 14px;
margin: 0px 10px 50px;

`
const SummaryData  = styled.ul`
  list-style: inside;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`


const Empty = styled.div`
  background-color : #ededed;
  height:10px;
`
const CustomInput =styled.textarea`
    background: #fff;
    border: 1px solid #999;
    resize:none;
    margin: 10px 5% 0px;
    width: 90%;
    height:200px;
    outline:none;

`
const Description = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  color: #999;
`

const LimitLetter = styled.div`
  position: relative;
  left: 40%;
  top: -30px;
  color: #999;
  font-size: 14px;

`







const Detailtaskcontainer = ({item}) => {
  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const _handleComplete = () =>{

  }


  console.log("detail task", item.requestinfo);



  useEffect(()=>{

  },[refresh])


  // 로그인 상태 여부 : 디바이스 정보에 따라 움직인다
  // 현재 위치 경도를 구하자
  // 회원 상태
  // 찜한 목록
  // 내가 쓴 댓글

  
  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  useEffect(() => {
 

  }, [refresh]);

  const _handlemap = () =>{
    navigate("/hongmap");
  }



  function _scrollTo(selector, yOffset = 0) {
    var elementPosition = document.getElementById(selector).offsetTop +20;

    window.scrollTo({
      top: elementPosition, //add your necessary value
      behavior: "smooth", //Smooth transition to roll
    });
  }


  const seekimage = (category)=>{

    if(category == REQUESTTYPE.HOME){
      return imageDB.ThemaWoman;
    }else if(category == REQUESTTYPE.MOVE){
      return imageDB.ThemaMan;
    }else if(category == REQUESTTYPE.MEALPREPARAION){
      return imageDB.Thema20;
    }else if(category == REQUESTTYPE.WALKING){
      return imageDB.Thema30;
    }else if(category == REQUESTTYPE.DOLBOM){
      return imageDB.Thema40;
    }

  }

  
  return (
    <Container>

    {loading == true ? (<Loading containerStyle={{ marginTop: 200 }} />) :
      <Row top={20}>
        <div style={{height:'100px', borderBottom:"1px solid #ededed", width:"100%",
          display: "flex",justifyContent: "center",alignItems: "center"}}>
        <div>   <img src={seekimage(item.category)} style={{width:"50px", height:'50px'}}/></div>
        <div>잘읽은 사과99</div>
        </div>
      </Row>

    }
    <Layout>

      {
        item.requestinfo.map((data)=>(
          <RequestResponse question={data.info} answer={data.response}/>
        ))
      }
 
   

        <Summary>
          <div>김도은 고객님은</div>
          <SummaryData>
            <li>2024년 6월 29일 홍여사어풀에 가입했어요</li>
            <li>5번째 홍여사를 이용중이에요</li>
            <li>남양주 다산동에 거주중</li>
          </SummaryData>
        </Summary>

    </Layout>




    <Empty/>


    <div style={{fontSize:18, fontWeight:700, marginTop:30}}>견적설명</div>
    <Description>서비스진행방식, 홍여사이력, 홍여사 도움시 별도로 요청할 내용등을 작성해주세여</Description>

    <CustomInput type="text" height={250} />

    <LimitLetter>0/200</LimitLetter>

    <Button            
      buttonText={"견적서 제출"}
      callback={()=>{_handleComplete()}}
      containerStyle={{
        boxShadow:"none",
        backgroundColor: "#ff4e19",
        color:"rgb(250 249 249)",
        border :"1px solid #ededed",
        borderRadius: "10px",
        fontSize: 17,
        height:45,
        margin: "10px 5% 100px",
        width: "90%",

      }}
    />
    </Container>
  );
};

export default React.memo(Detailtaskcontainer);
