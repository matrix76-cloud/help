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
  margin-top:120px;
`;

const TagService = styled.div`
    margin-left: 20px;
    background: #fff;
    border: 1px solid;
    width: 100px;
    border-radius: 15px;
    font-size: 12px;
    padding: 5px 0px;
`
const KeyService = styled.div`
    font-family: 'SF-Pro-Text-Semibold';

    font-size: 28px;
    width: 250px;
    margin-left: 20px;
    margin-top: 20px;
    line-height: 1.5;
    letter-spacing: 0.8;
    text-align : left;
`

const InfoBox = styled.div`
  width: auto;
  margin: 20px;
  height: ${({top}) => top}px;
  background: #f0f0f0;
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

`



const RoomInfocontainer = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const scrollPositions = useRef({});
  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);
  
  return (
    <Container>
      <div>

        <TagService>공간대여 서비스</TagService>
        <KeyService> <Fade cascade damping={0.1}>남아있는 공간을 빌려주고 돈을 버세요</Fade></KeyService>


        <Fade bottom delay={500}>
        <InfoBox top={400}>
 
          <InfoBoxMain><Fade cascade damping={0.1}>남은 공간 제공 </Fade></InfoBoxMain>
          <InfoBoxRight><Fade cascade damping={1}>비어있어 놀고 있는 남은 공간을 공간이 필요한 사람 에게 제공하고
          수익을 창출해보세요</Fade>
          </InfoBoxRight>
    
          <img src={imageDB.loadprofit} style={{width:"200px", marginTop:20}}/>

       
        </InfoBox>
        </Fade>

        <Fade bottom delay={500}>
        <InfoBox top={400}>
 
          <InfoBoxMain><Fade cascade damping={0.1}>짐을 간단하게 맡기자 </Fade></InfoBoxMain>
          <InfoBoxRight><Fade cascade damping={1}>홍여사에 제공 하는 안전한 계약 시스템을 통해 집에 쌓아두긴 힘든 짐을
          맡겨보세요. 홍여사에서 제공된 보관 용기에 의해 안전하게 보관 됩니다</Fade>
          </InfoBoxRight>
    
          <div style={{display:"flex", flexDirection:"row", padding:"20px 40px"}}>
          <img src={imageDB.loadbox1} style={{width:"100px", marginTop:20, height:100}}/>
          <img src={imageDB.loadbox2} style={{width:"200px", marginTop:20, height:100}}/>
          </div>
   
        </InfoBox>
        </Fade>


 



        <StoreInfo height={170} containerStyle={{ marginBottom: "20px" }} />
      </div>
    
    </Container>
  );
};

export default React.memo(RoomInfocontainer);
