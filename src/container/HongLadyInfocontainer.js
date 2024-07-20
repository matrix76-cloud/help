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
import Fade from "react-reveal/Fade";

const Container = styled.div`
  margin-top:90px;
  margin-bottom:70px;
`;

const TagService = styled.div`
    margin-left: 20px;
    background: #fff;
    border: 1px solid;
    width: 120px;
    border-radius: 15px;
    font-size: 12px;
    padding: 5px 0px;
`
const KeyService = styled.div`
    font-family: 'SF-Pro-Text-Semibold';
    font-size: 28px;
    width: 200px;
    margin-left: 20px;
    margin-top: 20px;
    line-height: 1.5;
    letter-spacing: 0.8;
`

const InfoBox = styled.div`
  width: auto;
  margin: 20px;
  height: ${({top}) => top}px;
  background: #f0f0f0;

  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
const InfoBoxMain = styled.div`
  padding: 20px 40px;
  display: flex;
  font-size: 18px;

`

const InfoBoxLeft = styled.div`
  width: 40%;
  border: 1px solid #000;
  padding: 10px;
  margin: 0px 20px;
  color: #222;
  font-size: 14px;
  line-height: 1.5;
`
const InfoBoxRight= styled.div`
  background: #fff;
  width: 80%;
  border: 1px solid #e1e1e1;
  padding: 10px;
  margin: 0px 20px;
  color: #5d5d5d;
  font-size: 14px;
  line-height: 2;
  display: flex;
  justify-content: flex-end;
  text-align: left;
  border-radius: 10px;
  flex-direction: column;

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

const HongLadyInfocontainer = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const scrollPositions = useRef({});

  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);
  
  return (
    <Container>
      <div style={{marginBottom:20}}>

        <TagService>홍여사 등급이란</TagService>

        <InfoBox top={300}>
 
           <InfoBoxMain><Fade cascade damping={0.1}>일 엄청 잘하는 홍여사 </Fade></InfoBoxMain>
 
 
          <InfoBoxRight><Fade cascade damping={1}>
            <div>일잘하는 홍여사의조건들을 기술</div>
            <div>홍여사 활동 30회 이상</div>
            <div>평판 지수 200이상</div>
            <div>출석 지수 100 이상</div>
    
          </Fade>
          </InfoBoxRight>
    
  
          <CameraView>
                <div style={{height:55,width: 55, borderRadius: 50}}>
                  <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
                </div>
                <div>일 엄청 잘하는 홍여사  이미지</div>
                </CameraView>

        </InfoBox>
      
        <InfoBox top={300}>
 
         <InfoBoxMain><Fade cascade damping={0.1}>일 잘하는 홍여사 </Fade></InfoBoxMain>


            <InfoBoxRight><Fade cascade damping={1}>
              <div>일잘하는 홍여사의조건들을 기술</div>
              <div>홍여사 활동 30회 이상</div>
              <div>평판 지수 200이상</div>
              <div>출석 지수 100 이상</div>
            </Fade>
            </InfoBoxRight>
              <CameraView>
            <div style={{height:55,width: 55, borderRadius: 50}}>
              <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
            </div>
            <div>일 잘하는 홍여사</div>
            </CameraView>

        </InfoBox>
        <InfoBox top={300}>
 
         <InfoBoxMain><Fade cascade damping={0.1}>일 열심히하는 홍여사 </Fade></InfoBoxMain>


            <InfoBoxRight><Fade cascade damping={1}>
              <div>일잘하는 홍여사의조건들을 기술</div>
              <div>홍여사 활동 30회 이상</div>
              <div>평판 지수 200이상</div>
              <div>출석 지수 100 이상</div>
            </Fade>
            </InfoBoxRight>
              <CameraView>
            <div style={{height:55,width: 55, borderRadius: 50}}>
              <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
            </div>
            <div>일 열심히하는 홍여사 이미지</div>
            </CameraView>

        </InfoBox>

        <InfoBox top={300}>
 
         <InfoBoxMain><Fade cascade damping={0.1}>일 열심히 배우는 홍여사 </Fade></InfoBoxMain>


            <InfoBoxRight><Fade cascade damping={1}>
              <div>일잘하는 홍여사의조건들을 기술</div>
              <div>홍여사 활동 30회 이상</div>
              <div>평판 지수 200이상</div>
              <div>출석 지수 100 이상</div>
            </Fade>
            </InfoBoxRight>
              <CameraView>
            <div style={{height:55,width: 55, borderRadius: 50}}>
              <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
            </div>
            <div>일 열심히 배우는 홍여사 이미지</div>
            </CameraView>

        </InfoBox>


        <InfoBox top={300}>
 
         <InfoBoxMain><Fade cascade damping={0.1}>일 처음시작하는 홍여사 </Fade></InfoBoxMain>


            <InfoBoxRight><Fade cascade damping={1}>
              <div>일잘하는 홍여사의조건들을 기술</div>
              <div>홍여사 활동 30회 이상</div>
              <div>평판 지수 200이상</div>
              <div>출석 지수 100 이상</div>
            </Fade>
            </InfoBoxRight>
              <CameraView>
            <div style={{height:55,width: 55, borderRadius: 50}}>
              <img src={imageDB.maroneperson2} style={{height:50,width:50, borderRadius:50}}/>  
            </div>
            <div> 일 처음시작하는 홍여사 이미지</div>
            </CameraView>

        </InfoBox>
      </div>
    
    </Container>
  );
};

export default React.memo(HongLadyInfocontainer);
