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

import { FaCamera } from "react-icons/fa";
import AlertModalEx from "../components/AlertModalEx";


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
const CameraView = styled.div`
    height: 100px;
    width: 100px;
    border-radius: 100px;
    border: 1px solid #ededed;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    flex-direction: column;
    margin-bottom:15px;

`

const SelectCameraView = styled.div`
    height: 100px;
    width: 100px;
    border-radius: 100px;
    border: 2px double #ff0000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    flex-direction: column;
    margin-bottom:15px;
    background: #cdcdcd;

`



const ProfilePictureChangeContainer = ({role}) => {
  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);


  const [alert, setAlert] = useState(false);


  useEffect(()=>{
    setAlert(alert);
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


  const handleUploadClick= ()=>{

  }

  const alertclosecallback = () =>{
    setAlert(false);
    setRefresh((refresh) => refresh +1);

  }


  const _handleCheck = ()=>{

    setAlert(true);
    setRefresh((refresh) => refresh +1);
}


  
  return (
    <>

    {loading == true ? (<Loading containerStyle={{ marginTop: 200 }} />) :
      <div style={{marginTop:80}}>

        {
          alert == true && 
            <AlertModalEx callback={alertclosecallback}/>
        }

            
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center",flexWrap:"wrap"}}>
                <CameraView >
                  <div style={{height:55,width: 55,borderRadius: 50}}>
                    <img src={imageDB.fail} style={{height:50,width:50, borderRadius:50}}/>  
                  </div>
                    <FaCamera onClick={handleUploadClick} />
                  <div>회원선택이미지</div>
                </CameraView>

                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 1</div>
                </CameraView>
                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 2</div>
                </CameraView>
                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 3</div>
                </CameraView>
                <SelectCameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 4</div>
                </SelectCameraView>
                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 5</div>
                </CameraView>
                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 6</div>
                </CameraView>

                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 7</div>
                </CameraView>


                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 8</div>
                </CameraView>


                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 9</div>
                </CameraView>

                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 10</div>
                </CameraView>


                <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>회원이미지 11</div>
                </CameraView>
            </div>
      

            <Button
                callback={_handleCheck}
                buttonText={"프로필 사진 변경"}
                containerStyle={{
                  backgroundColor: "rgb(234 232 232)",
                  color: "rgb(0 0 0)",
                  margin: "30px auto",
                  width: "90%",
                  borderRadius: 5,
                  height: "40px",
                  boxShadow : "none",
                }}
            />



      </div>
    }
    </>
  );
};

export default React.memo(ProfilePictureChangeContainer);
