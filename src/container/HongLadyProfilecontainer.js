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
import MyItem from "../components/MyItem";
import HongItem from "../components/HongItem";

const Container = styled.div`
  margin-top:60px;
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

const Emptyline = styled.div`
  background-color: #ededed;
  height: ${({height}) => height}px;
`

const BoxLayer = styled.div`
display: flex;
height: 150px;
justify-content: flex-start;
align-items: flex-start;
padding: 10px;
flex-direction:column;
margin-top:20px;

`
const Box = styled.div`
  min-height:100px;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items: flex-start;
  padding-left: 10px;
  text-align:left;
  margin-top:20px;
`
const Box2 = styled.div`

  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items: flex-start;
  padding-left: 10px;
  text-align:left;
  flex-wrap: wrap;
`
const Box3 = styled.div`

  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items: flex-start;
  padding-left: 10px;
  text-align:left;

`

const HongLadyProfilecontainer = () => {
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

      <HongItem USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fwoman3.png?alt=media&token=f3b9e09b-60ec-4c1d-ad8d-10b4a76cc9b0'} USER_NICKNAME={'이선자'} ADDR={'남양주 지금동'}
            SCORE1={9} SCORE2={29} SCORE3={9} SCORE4={50} bgcolor={'#ffdda5'}/>
    
      <Emptyline heigth={5}/>

      <BoxLayer>
        <Label content={"자기 소개"}  fontsize={20}/>
        <Box>
          나는 다산동에 거주하고 있고 정말 일을 잘하는 사람입니다 
          아이를 셋을 육아 하고 있습니다
          나는 다산동에 거주하고 있고 정말 일을 잘하는 사람입니다 
          아이를 셋을 육아 하고 있습니다
 
        </Box>
      </BoxLayer>

      <Emptyline heigth={10}/>



      <BoxLayer>
        <Label content={"나의 강점"}  fontsize={20}/>
        <Box2>
        <Button
                buttonText={"성실해요"}
                callback={()=>{}}
                containerStyle={{
                  color: "#fff",
                  background: "#ff4e19",
                  width: "130px",
                  height: "35px",
                  margin:5,
                  fontSize: "12px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
          />
               <Button
                buttonText={"일처리가 꼼꼼해요"}
                callback={()=>{}}
                containerStyle={{
                  color: "#fff",
                  background: "#ff4e19",
                  width: "130px",
                  height: "35px",
                  margin:5,
                  fontSize: "12px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
          />
             <Button
                buttonText={"단정한 사람이에여"}
                callback={()=>{}}
                containerStyle={{
                  color: "#fff",
                  background: "#ff4e19",
                  width: "130px",
                  height: "35px",
                  margin:5,
                  fontSize: "12px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
          />
        </Box2>
      </BoxLayer>

      <BoxLayer>
        <Label content={"홍여사 활동이력"}  fontsize={20}/>
        <Box3>
        <Button
                buttonText={"다산동 집청소 2024년 7월" }
                callback={()=>{}}
                containerStyle={{
                  color: "#fff",
                  background: "#19a5ff",
                  width: "230px",
                  height: "35px",
                  margin:5,
                  fontSize: "12px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
          />
               <Button
                buttonText={"일처리가 꼼꼼해요 일감 2024년 6월"}
                callback={()=>{}}
                containerStyle={{
                  color: "#fff",
                  background: "#19a5ff",
                  width: "230px",
                  height: "35px",
                  margin:5,
                  fontSize: "12px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
          />
             <Button
                buttonText={"이사 청소 진행 2024년 4월"}
                callback={()=>{}}
                containerStyle={{
                  color: "#fff",
                  background: "#19a5ff",
                  width: "230px",
                  height: "35px",
                  margin:5,
                  fontSize: "12px",
                  borderRadius:"5px",
                  boxShadow :"none"
                }}
          />
        </Box3>
      </BoxLayer>

      <Emptyline heigth={5}/>

      </div>
    
    </Container>
  );
};

export default React.memo(HongLadyProfilecontainer);
