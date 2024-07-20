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
import Empty from "../common/Empty";
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

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import ReceiveDoc from "../components/ReceiveDoc";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  margin-top:${({top})=> top}px;
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





const Hongcontainer = ({role}) => {
  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {

    console.log("new Value",newValue)
    setValue(newValue);
  };


  const Requestcleanmessages =[


    {type:"request", show:false, index:1, info:"언제마다 청소하시기를 원하시나여?",response:"정기적 청소"},
  
    {type:"request", show:false, index:1, info:"청소 가격은 얼마정도로 희망하시나여?",response:"30000원"},

    {type:"request", show: false, index:5, info:"청소가 필요한 곳을 선택해주세요", response:"아파트"},
  
   
    {type:"request", show: false, index:7, info:"집은 몇평인가요?", response:"20평대"},
  
    {type:"response", show:false, index:8, requesttype:"대상평수", request:""},
  
    {type:"request", show: false, index:9, info:"청소시간을 선택해주세요?",response:"청소끝날때까지"},
  
    {type:"response", show:false, index:10,requesttype:"청소시간", request:""},
  
    {type:"request", show: false, index:11, info:"청소하는 시간대는 언제가 좋을까요?", response:"저녁시간"},
  

    {type:"request", show: false, index:13, info:"고객님의 성별은 무엇인가여?", response:"여성"},

  ]
  const taskitems = [
    {category:REQUESTTYPE.HOME,requestinfo:Requestcleanmessages,requestcontent:"엄마처럼 손이 깔끔한 분 모셔요", rate:"5.0", view:"(10)",use:"5",info:"정기적인청소 / 아파트 / 30평대 / 청소시간3시간 / 오후시간대 / 남성요청",region:"남양주시 다산동",date:"2024-07-01", datedisplay:"마감임박", price:"50000원"},
    {category:REQUESTTYPE.HOME,requestinfo:Requestcleanmessages, requestcontent:"집을 너무 청소가 안되서 노련한 아주머니의 손길이 필요합니다", rate:"4.0", view:"(32)",use:"10", info:"하루만 청소 / 빌라 / 10평미만 / 청소끝날때까지 / 오후시간대 / 여성요청",region:"남양주시 지금동",date:"2024-06-28", datedisplay:"마감임박", price:"협의필요	"},
    {category:REQUESTTYPE.MOVE,requestinfo:Requestcleanmessages, requestcontent:"이사후에 짐 정리하고 청소 같이 해주실분을 구합니다", rate:"2.0", view:"(8)",use:"0", info:"이사청소 / 가구 / 베란다 청소",region:"남양주시 지금동",date:"2024-07-04", datedisplay:"D-3", price:"20000원"},
    {category:REQUESTTYPE.DOLBOM,requestinfo:Requestcleanmessages, requestcontent:"맞벌이 부부라서 아이를 잠깐 봐주실수 있는 이모님 구해요", rate:"3.0", view:"(59)",use:"1", info:"아이 1명 / 오후시간대",region:"남양주시 다산동",date:"2024-07-02", datedisplay:"D-1", price:"150000원"},
    {category:REQUESTTYPE.HOME,requestinfo:Requestcleanmessages, requestcontent:"거실 소파 청소랑 욕실 청소를 깔끔하게 해주실분을 찾아요", rate:"5.0", view:"(8)",use:"3", info:"하루만 청소 / 빌라 / 20평대 / 청소시간2시간  / 오후시간대 / 여성요청",region:"구리시 토평동",date:"2024-07-01", datedisplay:"D-1", price:"70000원"},
    {category:REQUESTTYPE.MEALPREPARAION,requestinfo:Requestcleanmessages, requestcontent:"맛있는 봄나물 반찬과 찌개 요리 부탁 드려요", rate:"1.0", view:"(4)",use:"1", info:"반찬3개 / 찌개",region:"남양주시 별내동",date:"2024-07-11", datedisplay:"D-11", price:"40000원"},
    {category:REQUESTTYPE.WALKING,requestinfo:Requestcleanmessages, requestcontent:"아이 학원 시간에 바래다주고 데리고 올 이모님 구합니다", rate:"2.0", view:"(15)",use:"4", info:"동네 학원 / 2군데 / 오후4시~오후6시",region:"남양주시 호평동",date:"2024-07-09", datedisplay:"D-4", price:"30000원"},

  ]

  const hongtaskitems = [
    {category:REQUESTTYPE.MEALPREPARAION,requestinfo:Requestcleanmessages, requestcontent:"반찬이나 찌개 요리를 아주 잘해요",star:"4", rate:"4.0", view:"(10)",use:"5",region:"남양주시 다산동", heart:"17",items:['식사준비','이사청소','집청소'], check:true, price:"30000원"},
    {category:REQUESTTYPE.HOME,requestinfo:Requestcleanmessages, requestcontent:"집청소나 침대 청소 필요하면 연락주세요 ",star:"3", rate:"3.0", view:"(32)",use:"10",region:"남양주시 지금동",date:"2024-06-28", heart:"25",items:['집청소'], check:true, price:"50000원"},
    {category:REQUESTTYPE.WALKING,requestinfo:Requestcleanmessages, requestcontent:"아이 등하원 도와드려요",star:"2", rate:"2.0", view:"(8)",use:"0",date:"2024-07-04",region:"구리시 토평동", datedisplay:"D-3", heart:"30",items:['아이등하원', '간병하기'], price:"100000원"},


  ]



  useEffect(()=>{

  },[refresh])


  // 로그인 상태 여부 : 디바이스 정보에 따라 움직인다
  // 현재 위치 경도를 구하자
  // 회원 상태
  // 찜한 목록
  // 내가 쓴 댓글

  
  useEffect(() => {



  });

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


    

  
  return (
    <>

    {loading == true ? (<Loading containerStyle={{ marginTop: 200 }} />) :
      <div>


        <Box sx={{ width: '100%', marginTop:'60px' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display:"flex",justifyContent:"center" }}>
            <TabList onChange={handleChange}>
              <Tab label="홍여사님을 찾아여" value="0" />
              <Tab label="도움드릴수 있어요" value="1"/>

            </TabList>
          </Box>
          <TabPanel value="0" style={{padding:0}}>
          <Row>
            <Searchbox width={65} radius={10}>
              <img src={imageDB.search} style={{width:20}}/>
              <span style={{marginLeft:5}}>어떤 서비스가 필요하세요?</span>
            </Searchbox>

            <Searchbox width={15} radius={5} onClick={_handlemap}>
              <img src={imageDB.gps} style={{width:20}}/>
              <span>지도</span>
            </Searchbox>
          </Row>

          <Row top={-10}>
            <Row top={0}>
              <FilterButton>서비스</FilterButton>
              <FilterButton style={{marginLeft:5}}>지역</FilterButton>
            </Row>
            <FilterButton2>리뷰많은순</FilterButton2>
          </Row>

          <Emptyline height={5}/>

            {
              taskitems.map((data)=>(
                <>
                <Task item={data}/>
                <Emptyline height={5}/>
                </>
              ))
            }

  
          </TabPanel>
          <TabPanel value="1" style={{padding:0}}>  
      
            <Row>
              <Searchbox width={65} radius={10}>
                <img src={imageDB.search} style={{width:20}}/>
                <span style={{marginLeft:5}}>어떤 홍여사를 찾으시나요?</span>
              </Searchbox>
              <Searchbox width={15} radius={5} onClick={_handlemap}>
                <img src={imageDB.gps} style={{width:20}}/>
                <span>지도</span>
              </Searchbox>
            </Row>

            <Row top={-10}>
              <Row top={0}>
                <FilterButton>서비스</FilterButton>
                <FilterButton style={{marginLeft:5}}>지역</FilterButton>
              </Row>
              <FilterButton2>리뷰많은순</FilterButton2>
            </Row>

            <Emptyline height={5}/>
            {
              hongtaskitems.map((data)=>(
                <>
                    <HongTask item={data}/>
                    <Emptyline height={5}/>
                </>
              ))
            }
            
          </TabPanel>
        </TabContext>
        </Box>








        <StoreInfo height={170} containerStyle={{ marginBottom: "20px" }} />
      </div>
    }
    </>
  );
};

export default React.memo(Hongcontainer);
