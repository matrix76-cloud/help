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
import CheckstatusModalEx from "../components/CheckstatusModalEx";

const Container = styled.div`
  margin-top:90px;
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

const Congration = styled.div`

  color :#999;
  margin-bottom:100px;
  margin-top:20px;

`
const TableInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 13px;

`

const Info = styled.div`
  background: #8b8787;
  padding: 10px 0px;
  color: #fff;

`

const resultitems =[
  {time:"09:30", content:"스타벅스쿠폰", name:"이행*", addr:"남양주 다산동"},
  {time:"09:31", content:"햅버거상품권", name:"김상*", addr:"서울 아현동"},
  {time:"09:31", content:"CU상품권", name:"이은*", addr:"수원시 인제동"},
  {time:"09:32", content:"스타벅스쿠폰", name:"장수*", addr:"전라도 나주"},
  {time:"09:32", content:"포인트200", name:"최민*", addr:"제주 서귀포시"},
  {time:"09:33", content:"햅버거상품권", name:"호유*", addr:"경상남도 남해"},
  {time:"09:37", content:"스타벅스쿠폰", name:"김민*", addr:"서울 서초구"},
  {time:"09:38", content:"CU상품권", name:"이철*", addr:"수원시 서리동"},
  {time:"09:38", content:"햅버거상품권", name:"사수*", addr:"대구시 다산동"},
  {time:"09:39", content:"CU상품권", name:"은혁*", addr:"수원시 신도심"},
  {time:"09:40", content:"CU상품권", name:"강수*", addr:"서울 중구"},
  {time:"09:41", content:"햅버거상품권", name:"전민*", addr:"수원시 다산동"},
  {time:"09:41", content:"스타벅스쿠폰", name:"전수*", addr:"대구시 수성구"},
  {time:"09:42", content:"햅버거상품권", name:"김영*", addr:"서울 신림동"},
  {time:"09:42", content:"스타벅스쿠폰", name:"자유*", addr:"경상남도 진해"},
  {time:"09:44", content:"포인트200", name:"해남*", addr:"수원시 다산동"},
  {time:"09:47", content:"햅버거상품권", name:"서유*", addr:"서울 다산동"},
  {time:"09:48", content:"CU상품권", name:"김민*", addr:"수원시 수산동"},
  {time:"09:50", content:"포인트200", name:"자영*", addr:"경상남도 남해"},
  {time:"09:50", content:"스타벅스쿠폰", name:"유자*", addr:"남양주 지금동"},
  
]

const Rulletcontainer = () => {
  const navigate = useNavigate();

  const [state, setState] = useState(-1);
  const [count, setCount] = useState(10);
  const [number, setNumber] = useState(0);

  const [successitem, setSuccessitem] = useState([]);

  const [refresh, setRefresh] = useState(1);

  const [checkstatus, setCheckstatus] = useState(false);



  var rolLength = 6; // 해당 룰렛 콘텐츠 갯수
  var setNum; // 랜덤숫자 담을 변수
  var hiddenInput = document.createElement("input");
  hiddenInput.className = "hidden-input";

  const location = useLocation();


  const scrollPositions  = useRef();




  useEffect(() => {
    // 설정된 시간 간격마다 setInterval 콜백이 실행된다. 
    
    const id = setInterval(() => {
      // 타이머 숫자가 하나씩 줄어들도록
      setCount((count) => count - 1);

      let items = [];
      setSuccessitem(items);


  
      items.push(resultitems[number]);
      items.push(resultitems[number+1]);
      items.push(resultitems[number+2]);
      items.push(resultitems[number+3]);
      items.push(resultitems[number+4]);



      setNumber((number) => number+1);
      setSuccessitem(items);

      setRefresh((refresh) => refresh+1);
    }, 1000);
    
    // 0이 되면 카운트가 멈춤
    if(count === 0) {
       clearInterval(id);
    }
    return () => clearInterval(id);
    // 카운트 변수가 바뀔때마다 useEffecct 실행
  }, [count]);

  useEffect(() => {

    let items = [];
    setSuccessitem(items);

    items.push(resultitems[0]);
    items.push(resultitems[1]);
    items.push(resultitems[2]);
    items.push(resultitems[3]);
    items.push(resultitems[4]);


    setSuccessitem(successitem);
    setNumber(number);

  },[refresh])

  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  const rRandom = () => {
    var min = Math.ceil(0);
    var max = Math.floor(rolLength - 1);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const rRotate = () => {
    var panel = document.querySelector(".rouletter-wacu");
    var btn = document.querySelector(".rouletter-btn");
    var deg = [];
    // 룰렛 각도 설정(rolLength = 6)
    for (var i = 1, len = rolLength; i <= len; i++) {
      deg.push((360 / len) * i);
    }
    
    // 랜덤 생성된 숫자를 히든 인풋에 넣기
    var num = 0;
    document.body.append(hiddenInput);
    setNum = hiddenInput.value = rRandom();
    
    // 애니설정
    var ani = setInterval(() => {
      num++;
      panel.style.transform = "rotate(" + 360 * num + "deg)";
      btn.disabled = true; //button,input
      btn.style.pointerEvents = "none"; //a 태그
      
      // 총 50에 다달했을때, 즉 마지막 바퀴를 돌고나서
      if (num === 50) {
        clearInterval(ani);
        panel.style.transform = `rotate(${deg[setNum]}deg)`;
      }
    }, 50);
  };
  
  // 정해진 alert띄우기, custom modal등
  const RLayerPopup = async(num) => {
    switch (num) {
      case 1:
        setState(1);
        break;
      case 3:
        setState(2);
        break;
      case 5:
        setState(3);
        break;
      default:
        setState(4);
    }

    setCheckstatus(true);

    var btn = document.querySelector(".rouletter-btn");
    btn.disabled = false; //button,input
    const supdate = await useSleep(500);
    window.scrollTo(0, document.body.scrollHeight);

  };
  
  // reset
  const rReset = (ele) => {
    setTimeout(() => {
      //ele.disabled = false;
      // ele.style.pointerEvents = "auto";
      RLayerPopup(setNum);
      hiddenInput.remove();

  


    }, 5500);
  };

  const _handlestart = async() =>{
    rRotate();
    rReset();

    const update = await useSleep(5000);

  }

  const statuscallback = () =>{

  }
  

  return (
    <Container>


      {checkstatus == true ? (
        <CheckstatusModalEx callback={statuscallback} state={state}></CheckstatusModalEx>
      ) : null}


        <div class="rouletter">
          <div class="rouletter-bg">
              <div class="rouletter-wacu"></div>
          </div>
          <div class="rouletter-arrow"></div>
          <button class="rouletter-btn" onClick={_handlestart}>경품참여</button>
        </div>



        {
        <div>

        <Info>오늘 하루 동안 경품 당첨자 현황입니다</Info>
        <TableInfo>
        <table style={{marginTop:20, width:"80%"}}>

            <tbody>
              {
                successitem.map((data)=>(
                  <tr>
                  <td className="rullettd">{data.time}</td>
                  <td className="rullettd">{data.content}</td>
                  <td className="rullettd">{data.name}</td>
                  <td className="rullettd">{data.addr}</td>
                </tr>
                ))
              }

            </tbody>
          </table>
                            
        </TableInfo>
        </div>
      }



        {/* {
          state == 4 &&
          <Congration id="congratulation"  ref={scrollPositions}>
              <img src={imageDB.fail} style={{width:'20%'}} />
              <div style={{marginTop:10}}>
              <div>홍여사 경품 이벤트는 하루 한번 이용가능 합니다</div>
              <div>다음기회를 이용해주세요 </div>
              </div>
          </Congration> 
 
        }

        {
          (state == 1 || state == 2 || state ==3) &&
          <Congration id="congratulation"  ref={scrollPositions}>
              <img src={imageDB.success} style={{width:'40%'}} />
              <div style={{marginTop:10}}>
              <div>홍여사 경품 이벤트는 하루 한번 이용가능 합니다</div>

              <div>쿠폰함으로 홍여사시스템에서 확인후 경품 보내드립니다</div>
              </div>
          </Congration> 
 
        } */}
   

    
    </Container>
  );
};

export default React.memo(Rulletcontainer);
