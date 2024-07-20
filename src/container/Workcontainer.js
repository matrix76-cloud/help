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


import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import { MdOutlineGpsFixed } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { BiCalendarPlus } from "react-icons/bi";
import SortModalEx from "../components/SortModalEx";
import ServiceModalEx from "../components/ServiceModalEx";
import MapModalEx from "../components/MapModalEx";

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
const FilterButton2 = styled.div`
  display: flex;
  padding: 5px 20px;
  border-radius: 15px;
  font-size: 12px;
`

const RefreshLayout = styled.div`
  position: fixed;
  bottom: 120px;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 20px;
  font-size: 14px;

  right: 20px;
`;


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

const Stickposition = styled.div`
  display : flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position : sticky;
  top:50px;
  background:#fff;
  z-index:3;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 10px 10px, rgba(0, 0, 0, 0.01) 0px 3px 3px;

`




const Workcontainer = ({role}) => {
  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [sortmodal, setSortmodal] = useState(false);
  const [servicemodal, setServicemodal] = useState(false);
  const [mapmodal, setMapmodal] = useState(false);


  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {

    console.log("new Value",newValue)
    setValue(newValue);
  };

  useEffect(()=>{
    setSortmodal(sortmodal);
  },[refresh])



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
    {category:REQUESTTYPE.MEALPREPARAION,requestinfo:Requestcleanmessages, requestcontent:"반찬이나 찌개 요리를 아주 잘해요",star:"4", rate:"4.0", view:"(10)",use:"5",region:"남양주시 다산동", heart:"17",items:['식사준비','이사청소','집청소'], check:true, price:"30000원",date:"2024-06-28"},
    {category:REQUESTTYPE.HOME,requestinfo:Requestcleanmessages, requestcontent:"집청소나 침대 청소 필요하면 연락주세요 ",star:"3", rate:"3.0", view:"(32)",use:"10",region:"남양주시 지금동",date:"2024-06-28", heart:"25",items:['집청소'], check:true, price:"50000원", datedisplay:"D-3"},
    {category:REQUESTTYPE.WALKING,requestinfo:Requestcleanmessages, requestcontent:"아이 등하원 도와드려요",star:"2", rate:"2.0", view:"(8)",use:"0",date:"2024-07-04",region:"구리시 토평동", datedisplay:"D-3", heart:"30",items:['아이등하원', '간병하기'], price:"100000원",date:"2024-06-28"},


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


  const _handleworkinfo = () =>{

  }
    


  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  
  const _handlesort = () =>{
    setSortmodal(!sortmodal);
    setRefresh((refresh) => refresh +1);
  }

  const _handleservice = () =>{
    setServicemodal(!servicemodal);
    setRefresh((refresh) => refresh +1);
  }

  const _handlemapset = () =>{
    setMapmodal(!mapmodal);
    setRefresh((refresh) => refresh +1);
  }


  const Sortmodalcallback =(data)=>{
    console.log("sortmodal", data);
    setSortmodal(false);
    setRefresh((refresh) => refresh +1);
  }
  const Servicemodalcallback =(data)=>{
    setServicemodal(false);
    setRefresh((refresh) => refresh +1);
  }

  const Mapmodalcallback =(data)=>{
    setMapmodal(false);
    setRefresh((refresh) => refresh +1);
  }


  useEffect(()=>{
    setSortmodal(sortmodal);
    setServicemodal(servicemodal);
    setMapmodal(mapmodal);
  },[refresh])

  return (
    <>

    {
      sortmodal == true && <SortModalEx callback={Sortmodalcallback} data={['거리순','리뷰많은순','호감도높은순','높은금액순','지원자많은수']}/>
    }

    {
      servicemodal == true && <ServiceModalEx callback={Servicemodalcallback} data={[
        REQUESTTYPE.HOME,REQUESTTYPE.MOVE,
        REQUESTTYPE.MEALPREPARAION,REQUESTTYPE.WALKING,
        REQUESTTYPE.DOLBOM,REQUESTTYPE.ERRAND,
        REQUESTTYPE.TAKECARE,REQUESTTYPE.HEAVYLOAD,
        REQUESTTYPE.HOSPITAL,REQUESTTYPE.OFFICECLEAN,
        REQUESTTYPE.RECIPE,REQUESTTYPE.SCHOOL,
        REQUESTTYPE.SHOPPING,REQUESTTYPE.DOGHOSPITAL,
        REQUESTTYPE.DOGWALKING,REQUESTTYPE.MOVE,
        REQUESTTYPE.HOME]}/>
    }

    {
      mapmodal == true && <MapModalEx callback={Mapmodalcallback}/>
    }


    {loading == true ? (<Loading containerStyle={{ marginTop: 200 }} />) :
      <div style={{marginTop:50}}>
          <Congratulation>
          <div  style={{padding: "5px 10px", background:"#fff", width:"150px",borderRadius: "20px", color:"#928b8b"}} onClick={_handleworkinfo}
          >일한만큼 바로 입금</div>

          <div style={{marginTop:15, fontSize:16, color:'#fff'}}>떼일걱정 없는 에스크</div>
          <div style={{marginTop:15, fontSize:14, color:'#fff'}}>받을돈 걱정 말고 편하게 일하세요</div>

          </Congratulation>

          <img src={imageDB.banner2} style={{width:"100%", height:160}}/>

          <Stickposition top={0}>
            <FilterRow top={10} className="filter">
              <FilterButton onClick={_handlesort}><CgArrowsExchangeAltV  size={18}/><span style={{paddingLeft:5}}>거리순</span></FilterButton>
              <FilterButton><GrPowerReset size={16}/><span style={{paddingLeft:5}}>초기화</span></FilterButton>
              <FilterButton onClick={_handleservice}><BiCalendarPlus size={16}/><span style={{paddingLeft:5}}>서비스</span></FilterButton>
              <FilterButton onClick={_handlemapset}><MdOutlineGpsFixed size={18}/><span style={{paddingLeft:5}}>지역</span></FilterButton>
              <FilterButton><CgSearch size={18} /><span style={{paddingLeft:5}}>검색</span></FilterButton>
            </FilterRow>
          </Stickposition>




            {
              hongtaskitems.map((data)=>(
                <>
                <Task item={data}/>
                <Emptyline height={5}/>
                </>
              ))
            }







        <StoreInfo height={170} />


      <RefreshLayout>
        <Button buttonText={"일감구하기 \n 등록"} callback={()=>{}} containerStyle={{color: "#fff",background: "#073dff9c",width: "60px",height: "60px",fontSize: "12px",margin :"2px",borderRadius:"50px"}}/>
      </RefreshLayout>

      </div>
    }
    </>
  );
};

export default React.memo(Workcontainer);
