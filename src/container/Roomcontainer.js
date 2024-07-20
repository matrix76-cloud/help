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
import Room from "../components/Room";

import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import { MdOutlineGpsFixed } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { BiCalendarPlus } from "react-icons/bi";

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
    top: 55px;
    margin: 0 auto;
    width: 0;
    height: 0;
}

`

const FilterButton2 = styled.div`
  display: flex;
  padding: 5px 20px;
  border-radius: 15px;
  font-size: 12px;
`
const Stickposition = styled.div`
  display : flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position : sticky;
  top:40px;
  background:#fff;
  z-index:3;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 10px 10px, rgba(0, 0, 0, 0.01) 0px 3px 3px;

`
const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  padding: 10px;
  margin-top: 0px;
  overflow-x: auto
`

const FilterButton = styled.div`
  display: flex;
  border: 1px solid #f0f0f0;
  padding: 5px 8px;
  border-radius: 15px;
  font-size: 12px;
  margin-right: 5px;
  min-width: 60px;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`
const HelpCheck = styled.div`
position: absolute;
top: 200px;
color: #fff;
padding:20px;

`
const Congratulation = styled.div`
    position: absolute;
    top: 90px;
    z-index: 3;
    font-size: 14px;
    color: #fff;
    display: flex;
    left: 30px;
    flex-direction:column;

`

const Roomcontainer = ({role}) => {
  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const taskitems = [
    {category:REQUESTTYPE.HOME, requestcontent:"엄마처럼 손이 깔끔한 분 모셔요", rate:"5.0", view:"(10)",use:"5",info:"정기적인청소 / 아파트 / 30평대 / 청소시간3시간 / 오후시간대 / 남성요청",region:"남양주시 다산동",date:"2024-07-01", datedisplay:"마감임박"},
    {category:REQUESTTYPE.HOME, requestcontent:"집을 너무 청소가 안되서 노련한 아주머니의 손길이 필요합니다", rate:"4.0", view:"(32)",use:"10", info:"하루만 청소 / 빌라 / 10평미만 / 청소끝날때까지 / 오후시간대 / 여성요청",region:"남양주시 지금동",date:"2024-06-28", datedisplay:"마감임박"},
    {category:REQUESTTYPE.MOVE, requestcontent:"이사후에 짐 정리하고 청소 같이 해주실분을 구합니다", rate:"2.0", view:"(8)",use:"0", info:"이사청소 / 가구 / 베란다 청소",region:"남양주시 지금동",date:"2024-07-04", datedisplay:"D-3"},
    {category:REQUESTTYPE.DOLBOM, requestcontent:"맞벌이 부부라서 아이를 잠깐 봐주실수 있는 이모님 구해요", rate:"3.0", view:"(59)",use:"1", info:"아이 1명 / 오후시간대",region:"남양주시 다산동",date:"2024-07-02", datedisplay:"D-1"},
    {category:REQUESTTYPE.HOME, requestcontent:"거실 소파 청소랑 욕실 청소를 깔끔하게 해주실분을 찾아요", rate:"5.0", view:"(8)",use:"3", info:"하루만 청소 / 빌라 / 20평대 / 청소시간2시간  / 오후시간대 / 여성요청",region:"구리시 토평동",date:"2024-07-01", datedisplay:"D-1"},
    {category:REQUESTTYPE.MEALPREPARAION, requestcontent:"맛있는 봄나물 반찬과 찌개 요리 부탁 드려요", rate:"1.0", view:"(4)",use:"1", info:"반찬3개 / 찌개",region:"남양주시 별내동",date:"2024-07-11", datedisplay:"D-11"},
    {category:REQUESTTYPE.WALKING, requestcontent:"아이 학원 시간에 바래다주고 데리고 올 이모님 구합니다", rate:"2.0", view:"(15)",use:"4", info:"동네 학원 / 2군데 / 오후4시~오후6시",region:"남양주시 호평동",date:"2024-07-09", datedisplay:"D-4"},

  ]

  const Roomitems = [
    {roomimage:imageDB.loadbox1, requestcontent:"켐핑짐, 안입는 겨울옷 맡아드려요",star:"4", rate:"4.0", view:"(10)",use:"5",region:"남양주시 다산동", heart:"17",prices:['길이 0.8~2m 높이 1.2m : 월 5000원','길이 1.2~2m 높이 2m : 월 20000원','기타: 협의필요'], check:true,boxdisplay:"포장박스있음"},
    {roomimage:imageDB.loadbox3, requestcontent:"골프채 언제든 맡겼다 찾으세요 ",star:"3", rate:"3.0", view:"(32)",use:"10",region:"남양주시 지금동",date:"2024-06-28", heart:"25",prices:['협의필요'], check:true,boxdisplay:"포장박스있음"},
    {roomimage:imageDB.loadbox3, requestcontent:"식탁 의자 등 맡아드려요",star:"2", rate:"2.0", view:"(8)",use:"0",date:"2024-07-04",region:"구리시 토평동", datedisplay:"D-3", heart:"30",prices:['길이 0.8~2m 높이 1.2m : 월 5000원','길이 1.2~2m 높이 2m : 월 20000원','기타: 협의필요'],boxdisplay:"포장박스있음"},
    {roomimage:imageDB.loadbox4, requestcontent:"헌옷 책장 책상등",star:"5", rate:"5.0", view:"(33)",use:"0",date:"2024-07-04",region:"남양주시 지금동", datedisplay:"D-3", heart:"30",prices:['길이 2m 높이 1.2m : 월 5000원','길이 1.2~2m 높이 2m : 월 20000원','기타: 협의필요']},
    {roomimage:imageDB.loadbox5, requestcontent:"잠깐 이사할때 맡아둘께요",star:"5", rate:"5.0", view:"(18)",use:"0",date:"2024-07-04",region:"남양주시 별내동", datedisplay:"D-3", heart:"30",prices:['길이 2m 높이1.2 : 월 5000원','길이 1.2~2m 높이 2m : 월 20000원','기타: 협의필요']},


  ]



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

  const _handleboxbuy = () =>{

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

          <Congratulation>
            <div  style={{padding: "5px 10px", background:"#fff", width:"150px",borderRadius: "20px", color:'#000'}} onClick={_handleboxbuy}>공간박스 구매하기</div>
          
          </Congratulation>


        <div style={{height:400,width:"100%",backgroundColor:'#0000ff'}}>
            <HelpCheck>공간 대여에 힌눈에 알기쉽게 설명이 들어갈 이미지
              디자인상 불필요 하다고 하면 메인 화면에 배너 만 유지하고 이곳은 없애도 무방 합니다(선택)
              다만 공간 박스 구매하기  버튼은 어딘가에 있어야 합니다

            </HelpCheck>
        </div>

        <Stickposition top={0}>
            <FilterRow top={0} className="filter">
              <FilterButton onClick={()=>{}}><CgArrowsExchangeAltV  size={18}/><span style={{paddingLeft:5}}>거리순</span></FilterButton>
              <FilterButton><GrPowerReset size={16}/><span style={{paddingLeft:5}}>초기화</span></FilterButton>
              <FilterButton onClick={()=>{}}><BiCalendarPlus size={16}/><span style={{paddingLeft:5}}>서비스</span></FilterButton>
              <FilterButton onClick={()=>{}}><MdOutlineGpsFixed size={18}/><span style={{paddingLeft:5}}>지역</span></FilterButton>
              <FilterButton><CgSearch size={18} /><span style={{paddingLeft:5}}>검색</span></FilterButton>
            </FilterRow>
          </Stickposition>



          {
            Roomitems.map((data)=>(
              <>
              <Room item={data}/>
              <Emptyline height={1}/>
              </>
            ))
          }


        <StoreInfo height={170} containerStyle={{ marginBottom: "20px" }} />
      </div>
    }
    </>
  );
};

export default React.memo(Roomcontainer);
