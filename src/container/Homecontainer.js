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
import LadyTopItem from "../components/LadyTopItem";
import Swipe2 from "../common/Swipe2";

import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import { MdOutlineGpsFixed } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { BiCalendarPlus } from "react-icons/bi";
import { LuBox } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";

import { MdOutlineAddHomeWork } from "react-icons/md";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
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
  height: 5px;
`;

const TrendingYScroll = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const RoomTag = styled.div`
  background: #198aff;
  color: #fff;
  border-radius: 20px;
  font-size: 10px;
  width: 50%;
  padding: 9px;
  position: relative;
  top: 5px;
  left:45%;
  animation: box-ani 1s linear infinite;
  z-index: 2;
  line-height:1.6;

  &:after { 
    content: "";
    border-top: 20px solid #198aff;
    border-left: 10px solid transparent;
    border-right: 18px solid transparent;
    position: absolute;
    left: 10%;
    right: 80%;
    top: 65px;
    margin: 0 auto;
    width: 0;
    height: 0;
}

`

const Congratulation = styled.div`
    position: absolute;
    top: 680px;
    z-index: 3;
    font-size: 14px;
    color: #fff;
    display: flex;
    left: 30px;
    flex-direction:column;

`

const LadyGuide = styled.div`
    position: absolute;
    top: 680px;
    z-index: 3;
    font-size: 14px;
    color: #fff;
    display: flex;
    left: 30px;
    flex-direction:column;

`

const Congratulation2 = styled.div`
  position: absolute;
  top: 480px;
  z-index: 3;
  font-size: 14px;
  color: #fff;
  display:flex;
  left: 30px;

`
const MainRound = styled.div`
  height: 60px;
  width: 100%;
  background: rgb(255, 255, 255);
  z-index: 5;
  display: flex;
  position: absolute;
  top: 200px;
  border-top-right-radius: 55px;
  border-top-left-radius: 50px;

`
const MainRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  z-index:6;
  margin-top:-50px;
  position:relative;
`;


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
  width: 150px;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`


const Homecontainer = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const scrollPositions = useRef({});

  const [render, setRender] = useState(1);
  
  const { user, dispatch2 } = useContext(UserContext);
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");

  const [advertiseclose, setAdvertiseclose] = useState(false);
  const [checkadvertiseclose, setCheckadvertiseclose] = useState(false);
  const [popupitem, setPopupitem] = useState({});

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [refreshpos, setRefreshpos] = useState(1);
  
  const [bannerimgs, setBannerimgs] = useState([]);
  const [banner2imgs, setBanner2imgs] = useState([]);
  const [switchcheck, setSwitchcheck] = useState(false);
  const [storeviewitems, setStoreviewitems] = useState([]);
  const [storerecentitems, setStorerecentitems] = useState([]);
  const [premium, setPremium] = useState(false);
  const [premiumshops, setPremiumshops] = useState([]);
  const [gold, setGold] = useState(false);
  const [goldshops, setGoldshops] = useState([]);
  const [silver, setSilver] = useState(false);
  const [silvershops, setSilvershops] = useState([]);

  const [ypos, setYpos] = useState(0);

  const [shopcount, setShopcount] = useState(0);

  const [themafiltervalue, setThemafiltervalue] = useState([]);
  const [preferencefiltervalue, setPreferencefiltervalue] = useState([]);
  const [pricefiltervalue, setPricefiltervalue] = useState([]);

  const [filterinitialize, setFilterinitialize] = useState(false);
  const [ref, setRef] = useState(null);

  const [searching, setSearching] = useState(false);

  const [searchcategory, setSearchcategory] = useState("");
  const [searchthema, setSearchThema] = useState("");

  const [scrollY, setScrollY] = useState(0);

  const [advertise, setAdvertise] = useState(true);

  const Switchcallback = (data) => {
    setSwitchcheck(data);

    setRefresh((refresh) => refresh + 1);
  };

  useEffect(()=>{



  },[refresh])







  // 로그인 상태 여부 : 디바이스 정보에 따라 움직인다
  // 현재 위치 경도를 구하자
  // 회원 상태
  // 찜한 목록
  // 내가 쓴 댓글

  
  useLayoutEffect(() => {
    //   setLoading(true);

    const now = moment();

    let time = moment(now).subtract(1, "days").unix();

    let time2 = moment(now).unix();

    const popupdate = window.localStorage.getItem("popup");

    // if (popupdate /1000 >= time && popupdate /1000 < time2 ) {
    //   setAdvertise(false);
    // }else{
    //   setAdvertise(true);
    // }

    setAdvertise(true);
    


    console.log("popupdate", popupdate);

    let banner1 = [];
    banner1.push(imageDB.sample);
    banner1.push(imageDB.sample2);


    setBannerimgs(banner1);

    let banner2 = [];
    banner2.push(imageDB.banner1);

    setBanner2imgs(banner2);



  setRefresh((refresh) => refresh + 1);

  }, [user]);



  const _handleRoom = () =>{

    navigate("/room");
  }
  


  function preventDefault(e) {
    e.preventDefault();
  }


  const themafiltercallback = (data) => {
    const thema = data;

    console.log("thema", thema, data);

    navigate("/request", { state: { REQUESTTYPE: thema } });


  };

  const _handlehelpfilter = () =>{
    navigate("/helpfilter");
  }




  const _handleinfo = () =>{
    navigate("/info");
  }
  const _handleroominfo = () =>{
    navigate("/roominfo");
  }  
  const _handlerullet = () =>{
    navigate("/rullet");
  }
  const _handleladyinfo = () =>{
    navigate("/ladyinfo");  
  }
  const _handlecommunity = () =>{
    navigate("/community");  
  }

  const _handlehongladyinfo = () =>{
    navigate("/hongladyinfo");
  }
  
  return (
    <>

    {
      advertise == true && 
        <AdvertiseModalEx/>
    }
    {loading == true ? (<Loading containerStyle={{ marginTop: 200 }} />) :
      <div style={{position:"relative", top:20}}>

      <div style={{position: "absolute",top: '70px',zIndex: 5, color:"#fff"}}>홍여사 잘 표현 해줄수 있는 이미지가 들어갔으면 좋을듯 합니다 이부분은 저랑 한번 애기 부탁</div>

      <Swipe2 images={bannerimgs} delaytime={3000} height={250}>
      </Swipe2>

        <MainRound></MainRound>
        <MainRow>
          <Row2>
            <Label content={"어떤일을 도와드릴까요?"} />
            <Button
                buttonText={"홍여사 서비스 알아보기"}
                callback={_handleinfo}
                containerStyle={{
                  color: "#fff",
                  background: "#ff4e19",
                  width: "130px",
                  height: "25px",
                  fontSize: "12px",
                  margin :"20px 0px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
              />
          </Row2>
          <Label content={"동네근처의 홍여사에 일감을 맡겨보세요"} fontsize={'12px'} />
          <Helpfilter callback={themafiltercallback} />
        </MainRow>

  


        <Emptyline />
  


 
  

        <LadyGuide >
          <div  className="event" onClick={_handlerullet} style={{    
            padding: "5px 10px",
            border: "1px solid #fff",
            width:"100px",
            borderRadius: "20px"}}
          >홍여사 경품이벤트</div>

        <div style={{marginTop:15, fontSize:14}} className="blink">하루에 한번씩 홍여사 룰렛을 돌려보고 선물 받아가세요</div>
  
        </LadyGuide>

        <img src={imageDB.banner2} style={{width:"100%"}}/>
      
  
        <Stickposition top={0}>
            <FilterRow top={10} className="filter">
              <FilterButton onClick={_handlehelpfilter} ><MdOutlineAddHomeWork  size={18}/><span style={{paddingLeft:5}}>홍여사를 구해요</span></FilterButton>
              <FilterButton ><LuBox size={16}/><span style={{paddingLeft:5}}>공간을 등록</span></FilterButton>
            </FilterRow>
          </Stickposition>


        <Row top={0}>
          <Row2>
            <Label content={"최근에 도움주신 홍여사님 평가입니다"} />
            <MoreButton buttonText={"전체보기"} />
          </Row2>
          <ReviewItem USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fwoman3.png?alt=media&token=f3b9e09b-60ec-4c1d-ad8d-10b4a76cc9b0'} USER_NICKNAME={'김상미-애견산책'} REGISTDATE={'2024:04:30'} CONTENTS={'우리강아지가 너무 좋아했어요.. 혼자 있는 강아지가 너무 불쌍했는데.... 이제 걱정이 없어 졌어요'} WRITER={'이은*'} STAR={5}/>
          <ReviewItem USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fpngtree-sexy-girl-wearing-a-wreath-image_1080943.jpeg?alt=media&token=5286e72d-cc2b-41f0-b8d7-2859a8a774de'} USER_NICKNAME={'이행자-집청소'} REGISTDATE={'2024:05:01'} CONTENTS={'아주머니가 오셔서 집안청소를 아주 깔끔하게 해주셨고 너무 손이 야무지셧어여'} WRITER={'김정*'} STAR={4}/>     
        </Row>
        <Emptyline />

        <Row top={0}>
          <Label content={"우리 동네의 가장 일잘하는 홍여사님을 소개합니다"} containerStyle={{width:"100%", textAlign:"left"}}/>

          <Button
                buttonText={"홍여사 등급제도란?"}
                callback={_handlehongladyinfo}
                containerStyle={{
                  color: "#fff",
                  background: "#ff4e19",
                  width: "130px",
                  height: "25px",
                  fontSize: "12px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
          />

          <span style={{fontSize:12,textAlign:"left"}}>이부분은 현재 홍여사의 등수가 실시간으로 변경 되고 있는 느낌을 주는 화면이엇으면 좋겠습니다</span>
      
          <LadyTopItem NO={1} USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fwoman3.png?alt=media&token=f3b9e09b-60ec-4c1d-ad8d-10b4a76cc9b0'} USER_NICKNAME={'이성미'} ADDR={'남양주 지금동'}
          SCORE1={9} SCORE2={29} SCORE3={9} SCORE4={50} bgcolor={'#f7deca'}/>
          <LadyTopItem  NO={2} USER_IMG={imageDB.maroneperson2} USER_NICKNAME={'홍화자'} ADDR={'구리시 토평동'}
           SCORE1={8} SCORE2={19} SCORE3={7} SCORE4={39} bgcolor={'#ededed'}/>
          <LadyTopItem  NO={3} USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F0.7980197103316427.png?alt=media&token=b42b7632-1656-433e-9551-e141d8413bbd'} USER_NICKNAME={'이희경'} ADDR={'남양주 다산동'} 
           SCORE1={9} SCORE2={12} SCORE3={6} SCORE4={40} bgcolor={'#ededed'}/>
 

        </Row>
        <Emptyline />


        <Row top={0}>
          <Label content={"집에 공간이 남나여? 공간을 빌려주고 용돈버세요"} />
          {/* <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
          <Button
                buttonText={"공간 등록하기"}
                callback={()=>{}}
                containerStyle={{
                  color: "#fff",
                  background: "#ff4e19",
                  width: "90px",
                  fontSize: "13px",
                  margin :"10px 10px 0px 0px",
                  borderRadius:"5px"
                }}
          />

            <Button
                buttonText={"공간 사용하기"}
                callback={_handleRoom}
                containerStyle={{
                  color: "#fff",
                  background: "#ff4e19",
                  width: "90px",
                  fontSize: "13px",
                  margin :"10px 10px 0px 0px",
                  borderRadius:"5px"
                }}
          />
          </div> */}
        

          <RoomTag>우리집 남은공간에 짐을 보관해주고 돈을 벌어볼까?(캠핑도구, 헌옷, 책장)
            <div onClick={_handleroominfo} style={{fontSize:14}}>{"공간대여 서비스 알아보기"}</div>
          </RoomTag>
    
          <img src={imageDB.roomsample2} style={{width:"100%", marginTop:-40}}/>


        </Row>

        <Emptyline />

        <Row top={0}>
          <Label content={"우리 동네 일상이 궁금해요"} />


          <div style={{height:200, backgroundColor:'#ff0000', width:"100%"}}>


            <div>
            <Button
                buttonText={"일상속으로 들어가기"}
                callback={_handlecommunity}
                containerStyle={{
                  color: "#000",
                  background: "#fff",
                  width: "120px",
                  fontSize: "13px",
                  borderRadius:"5px",
                  boxShadow:"none",
                }}
            />

            </div>

            <div style={{fontSize:10, color:"#fff",fontSize:16}}>
                이미지가 들어가야 하는곳입니다
            </div>
          </div>


    



        </Row>

        <Emptyline />


        <StoreInfo height={170} containerStyle={{ marginBottom: "20px" }} />
      </div>
    }
    </>
  );
};

export default React.memo(Homecontainer);
