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
    width: 80px;
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



const Infocontainer = () => {
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

        <TagService>홍여사 서비스</TagService>
        <KeyService> <Fade cascade damping={0.1}>가치 있는 일상에 집중할 수 있도록</Fade></KeyService>

        <Fade bottom delay={500}>
        <InfoBox top={400}>
 
             <InfoBoxMain><Fade cascade damping={0.1}>간단한 절차 </Fade></InfoBoxMain>
 
 
          <InfoBoxRight><Fade cascade damping={1}>원하는 서비스 항목을 고르시고 옵션을 선택하면 주위의 홍여사에게 실시간으로 요청하신 
            일감이 전달되고 요청된 업무를 받는 홍여사는 견적를 산출하여 실시간으로 보내드려요.
            집안일 걱정 없이 맡아 드려요</Fade>
          </InfoBoxRight>
    
          <img src={imageDB.alarm} style={{width:"250px", marginTop:20, height:150}}/>
        </InfoBox>
        </Fade>
        {/* <Fade bottom delay={500}>
        <InfoBox top={550}>
          <InfoBoxMain>내 주위의 동네 아줌마가 홍여사</InfoBoxMain>
          <InfoBoxRight>
            홍여사 플랫폼에서 일해줄 홍여사님으로 등록되기 위해서는 홍여사 등록 절차를 통해 신원 확인하기 때문에
            믿고 집안일을 맡기실수 있습니다. 홍여사님은 우리주위의 누나, 이모, 엄마들만 등록 하실수 있습니다.
            홍여사님으로 활동 하고자 하는 경우 증명사진 제출및 간편인증을 통한 주민등록 초본을 발급 받아 보관하기 때문에
            믿음직 스러운 홍여사님을 만나실수가 있습니다
          </InfoBoxRight>
          <img src={imageDB.woman} style={{width:"250px", marginTop:20}}/>
        </InfoBox>
        </Fade> */}
        <Fade bottom delay={500}>
        <InfoBox top={500}>
          <InfoBoxMain>안전 거래를 위한 결제 수단 </InfoBoxMain>
          <InfoBoxRight>
            홍여사에서 집안일 도움은 고가의 비용을 유도 하지 않습니다. 견적서를 통해 합의된 비용은  신용카드로 결재 되며 
            홍여사 에스크 시스템에 의해 모든 일을 다하신 후 완료 후 지급이 되기 때문에 안전한 결제가 되며 추가 비용에 대한 부담은 없어서 믿고 
            맡기실수 있습니다
          </InfoBoxRight>
          <img src={imageDB.card} style={{width:"250px", marginTop:20}}/>
        </InfoBox>
        </Fade>



        <Fade bottom delay={500}>
        <StoreInfo height={170} containerStyle={{ marginBottom: "20px" }} />
        </Fade>
      </div>
    
    </Container>
  );
};

export default React.memo(Infocontainer);
