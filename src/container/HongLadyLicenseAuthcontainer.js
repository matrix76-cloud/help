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
import { uploadImage } from "../service/CheckService";
import { FaCamera } from "react-icons/fa";



const BoxLayer = styled.ul`
  height: ${({height})=> height}px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding: 5%;
  flex-direction: column;
  list-style-type :disc;
`
const PictureBoxLayer = styled.div`
  height: 200px;
  background: #ededed;
  width: 90%;
  margin-top: 20px;
  display:flex;
  justify-content:center;
  align-items:center;

`
const LineScan = styled.div`
  position: relative;
  height: 15px;
  background: #ff004e40;
  width: 100%;
    &:after { 
      content: "스캔중입니다.";
      display: flex;
      justify-content: center;
      align-items: center;
      color:#fff;
      font-size: 12px;
  } 
`
const BoxLayerContent = styled.li`
  font-size:12px;
  margin:10px;
`



const HongLadyLicenseAuthcontainer = ({role}) => {
  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [licenseimg, setLicenseimg] = useState('');

  const [extractvalue, setExtractvalue] = useState('');

  const fileInput = useRef();


  const handleUploadClick = (e) => {
    fileInput.current.click();
  };

  const ImageUpload = async (data, data2) => {
    const uri = data;
    const email = data2;
    const URL = await uploadImage({ uri, email });
    return URL;
  };

    
  const handlefileuploadChange = async (e) => {
    let filename = "";
    const file = e.target.files[0];
    filename = file.name;



    var p1 = new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let img = reader.result;
        resolve(img);
      };
    });
    const getRandom = () => Math.random();
    const email = getRandom();

    p1.then(async (result) => {
      const uri = result;
      setLicenseimg(uri);

      let pos = uri.indexOf(",")

      const base64 = uri.substring(pos+1, uri.length);

      console.log("base64", base64);

   
      setRefresh((refresh) => refresh +1);

      callGoogleVIsionApi(base64).then(()=>{

      })

    });
  };


  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  useEffect(()=>{

    setLicenseimg(licenseimg);
    setExtractvalue(extractvalue);

  }, [refresh])



  const callGoogleVIsionApi = async(base64)=>{
    let url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDik5b11Cw3vqJewRGAKPN8jWs90Ye_pEU";

   
    console.log("base64", base64);


    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              { type: 'WEB_DETECTION', maxResults: 5 },
            ],
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("return data", data);
        setExtractvalue(data.responses[0].fullTextAnnotation.text);
        setRefresh((refresh) => refresh +1);
        // this.setState({
        //   fullTextAnnotation: data.responses[0].fullTextAnnotation.text,
        // });
      })
      .catch((err) => console.log('error : ', err));
  };


  const _handleauthcomplete = () =>{
    navigate("/config")
  }


  
  return (
    <>

    {loading == true ? (<Loading containerStyle={{ marginTop: 200 }}
     />) :
      <div style={{marginTop:50}}>
        <BoxLayer height={650}>
          <div>홍여사로 신원인증을 하기 위해서는 운전면허증이나 주민등록증을 첨부해주세요</div>

          <PictureBoxLayer onClick={handleUploadClick}>
            {
              licenseimg != '' && 
              <>
                  <img src={licenseimg} style={{position:"absolute", width:"90%", height:230}}/>
                  <LineScan className="scan"/>
              </>
          
            }
            {
              licenseimg == '' && 
              <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:"90%", height:230}}>
                  <FaCamera size={40}/>
              </div>
          
            }
        
          </PictureBoxLayer>

          <input
            type="file"
            ref={fileInput}
            onChange={handlefileuploadChange}
            style={{ display: "none" }}
            />
          <textarea
           type="text"
           disabled
           style={{
             fontSize: 14,
             width: "90%",
             backgroundColor: "#f9f9f9",
             height: 250,
             fontSize: "12px",
             border: "none",
             outline: 0,
             resize: "none",
             fontFamily: "SF-Pro-Text-Regular",
           }}
           value={extractvalue}
          >
            
          </textarea> 

          <BoxLayerContent>개인정보 보호법에 의거 첨부된 신분증의 경우는 서버에 보관되지 않으며 자동으로 폐기 됩니다</BoxLayerContent>

          <Button
            buttonText={"신분증 진위여부 검사결과 정상으로 확인 되었습니다."}
            callback={_handleauthcomplete}
            containerStyle={{
              backgroundColor: '#ff4e19',
              color: "#fff",
              border :"1px solid",
              margin: "10px",
              width: "100%",
              height: 45,
              fontSize: 15,
              fontFamily:"Pretendard-Regular",
              borderRadius: "5px",
              boxShadow:"none"
          }}
        /> 

        </BoxLayer>


    
   
      </div>
    }
    </>
  );
};

export default React.memo(HongLadyLicenseAuthcontainer);
