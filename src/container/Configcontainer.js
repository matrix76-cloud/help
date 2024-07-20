
import React,{useState, useEffect, useContext, useLayoutEffect, useRef} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Label from '../common/Label';
import { imageDB } from '../utility/imageData';
import Image from '../common/Image';
import Text from '../common/Text';
import { theme } from '../theme/theme';
import { ArrayIncludeData, fn_smsShare, useSleep } from '../utility/common';
import Loading from '../common/Loading';
import { UserContext } from '../context/User';
import Badge from '../common/Badge';
import { get_review, get_reviewForUser } from '../service/ReviewService';
import { get_heartstores, get_storeinfoForUSERID } from '../service/StoreService';
import { get_coupone, get_enablestorecoupone, get_storecoupone } from '../service/CouponeService';
import { STORESTATUS, STORE_STATUS, TYPE } from '../utility/maroneDefine';
import { get_checkuser, uploadImage } from '../service/CheckService';
import Button from '../common/Button';
import { get_userInfoForUID, login, logout, reset_userdevice, Update_userimg } from '../service/UserService';
import { get_badalluser, get_baduser } from '../service/BadUserService';
import { CiCamera } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
import LadyTopItem from '../components/LadyTopItem';
import MyItem from '../components/MyItem';
import Loading2 from '../common/Loading2';
import AlertModalEx from '../components/AlertModalEx';
import GuideSwipe from '../common/GuideSwipe';
import StoreInfo from '../components/Storeinfo';
import { REQUESTTYPE } from '../utility/contentDefine';



const Container = styled.div`
  height       : 100%;
  overflow-y   : scroll;
  margin-bottom: 70px;
  margin-top   : 50px;

`
const Row = styled.div`
    display        : flex;
    flex-direction : row;
    justify-content: space-between;
    align-items    : center;
    padding        : 10px;
    flex-wrap      : wrap;
    margin         : 10px 0px;
`
const Row2 = styled.a`
    display        : flex;
    flex-direction : row;
    justify-content: space-between;
    align-items    : center;
    padding        : 10px;
    flex-wrap      : wrap;
    margin         : 10px 0px;
    color :#3f4850;
`

const MainLoginView = styled.div`
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;
    margin          : 20px 0px;
    background-color: #FFF;
    border          : 1px solid #ededed;
    height          : 60px;
    padding-top     : 20px;
    padding-bottom  : 20px;
`

const MainLoginedView = styled.div`
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;
    background-color: #F7F7F7;
    height          : 120px;
    padding     : 20px;
`

const EmptyRow = styled.div`
  background-color: #F7F7F7;
  height          : 10px;
  margin-bottom : 20px;
  margin-top:20px;
`
const CameraView = styled.div`
  height: 20px;
  width: 20px;
  position: relative;
  top: -20px;
  left: -15px;
`
const Badgecount = styled.div`
  position: relative;
  background-color: rgb(255, 78, 25);
  color: rgb(255, 255, 255);
  width: 25px;
  height: 30px;
  margin-top: unset;
  margin-right: unset;
  margin-bottom: unset;
  margin-left: 10px;
  border-radius: 5px;

`

const Box = styled.div`
  background: ${({bgcolor}) => bgcolor};
  height: ${({height}) => height}px;
  font-size: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top:10px;
`

const BoxLayer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  flex-wrap: nowrap;
  width: 1600px;
`

const BoxItem = styled.div`
  height: 110px;
  width: 180px;
  border-radius: 10px;
  margin-right: 10px;
  padding-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background : ${({bgcolor}) => bgcolor}
`
const BoxItemData = styled.div`
  margin-top: 10px;
  padding: 0px 10px;

`
const WorkItem = styled.div`
    background: #fff;
    height: 140px;
    line-height:2;
    width: 100%;
    margin: 5px auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-radius: 10px;
    margin-bottom: 10px;
    flex-direction: column;
    padding-left: 10px;
`
const LabelItem = styled.div`
    background: #949090;
    color: #fff;
    border-radius: 10px;
    padding: 5px;
    height:20px;
    display:flex;
    justify-content:center;
    align-items:center;

`
const CloseLabelItem = styled.div`
    background: #000;
    color: #fff;
    border-radius: 10px;
    padding: 5px;
    height:20px;
    margin-left:5px;
    display:flex;
    justify-content:center;
    align-items:center;

`

const LabelText = styled.div`
  font-size:14px;
  margin-top:10px;
  text-decoration: underline;

`

const CouponeItem = styled.div`
  width: 50%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:5px;


`

const EnableTag = styled.div`

  background :${({bgcolor}) => bgcolor};
  color: #fff;
  padding: 0px 5px;
  border-radius: 5px;


`

const EnableTag2 = styled.div`

  color :${({bgcolor}) => bgcolor};
  padding: 0px 5px;
  border-radius: 5px;


`

const { kakao } = window;

const Configcontainer = ({containerStyle}) => {

  const navigation                                    = useNavigate();
  const [loading, setLoading]                         = useState(false);
  const {user, dispatch2}                             = useContext(UserContext);
  const [userid, setUserid]                           = useState('');
  const [reviewitems, setReviewitems]                 = useState([]);
  const [receivecouponeitems, setReceivecouponeitems] = useState([]);
  const [storecouponeitems, setStorecouponeitems]     = useState([]);
  const [storecheckeritems, setStorecheckeritems]     = useState([]);
  const [storereviewitems, setStorereviewitems]       = useState([]);
  const [storeitem, setStoreitem]                     = useState({});
  const [heartcount, setHeartcount] = useState(0);
  const [badusercount, setBadusercount] = useState(0);
  const [storename, setStorename] = useState("");

  const [userimg, setUserimg] = useState(user.img);
  const [refresh, setRefresh] = useState(1);

  const [alert, setAlert] = useState(false);
  
  useEffect(()=>{
    setUserimg(userimg);
    setAlert(alert);

  },[refresh]);
  const LoginCallback = () =>{
      navigation("/login");
  }
  const _handleHeart = () =>{

      if(user.uid ==''){
          alert("로그인이 필요한 메뉴입니다");
          return;
      }

      if(heartcount == 0){
          alert("찜한 업체가 없습니다");
          return;
      }
      navigation("/heart");
  }
  const _handleRecent = () =>{
      if(user.uid ==''){
          alert("로그인이 필요한 메뉴입니다");
          return;
      }
      navigation("/recent");
  }
  const _handleRangesetting = () =>{
      if(user.uid ==''){
          alert("로그인이 필요한 메뉴입니다");
          return;
      }
      navigation("/rangesetting");
  }
  const _handleReceivecoupone = () =>{
      if(user.uid ==''){
          alert("로그인이 필요한 메뉴입니다");
          return;
      }
      navigation("/receivecoupone");
  }
  const _handleReview =() =>{
      if(user.uid ==''){
          alert("로그인이 필요한 메뉴입니다");
          return;
      }
      navigation("/myreview");
  }
  const _handleStorecoupone = () =>{
      navigation("/storecoupone", {state :{STORE_ID : storeitem.STORE_ID}});
  }
  const _handleStorecheckers = () =>{
      navigation("/checkadmin", {state :{STORE : storeitem}});
  }
  const _handleStorereview = () =>{
      navigation("/reviewadmin", {state :{STORE_ID : storeitem.STORE_ID}});
  }
  const _handleChatconfig = () =>{
      navigation("/chatsetting", {state :{STORE_ID : storeitem.STORE_ID}});
  }
  const _handleFrequentquestion = () => {
      navigation("/frequentquestion");     
  }
  const _handleKakaocenter = () => {
      navigation("/kakaocenter");     
  }
  const _handleNotice = () => {
      navigation("/notice");     
  }
  const _handleBaduser = () => {
      navigation("/baduser", { state: { STORE_ID: storeitem.STORE_ID } });
  }
  const _handleMystore = () => {
      navigation("/mystore", { state: { STORE_ID: storeitem.STORE_ID } });
  }
  const _handleMystoreconfig = () => {
    navigation("/mystoreconfig", { state: { STORE_ID: storeitem.STORE_ID } });
  }
  const _handleEvent =()=>{
    navigation("/eventlist");
  }


  const _handleLogout = async() =>{

      setLoading(true);
      const USERID   = user.uid;
      const DEVICEID = user.deviceid;
      const update   = await reset_userdevice({USERID,DEVICEID});
      const user2    = await logout();

      user['email']       = '';
      user['uid']         = '';
      user['deviceid']    = '';
      user['type']        = '';
      user['nickname']    = '';
      user['updatetoken'] = '';
 
      dispatch2(user);
      setLoading(false);
  }

  const _handleLadyAuth = () =>{
    navigation("/hongladyphoneauth");  
  }

  useEffect(()=>{
    window.scrollTo(0,0);
      return () => {
    };
  },[])

  useEffect( ()=>{

    




  }, [])

  useEffect(() =>{
    async function UserLogin(uniqueId){

      setLoading(true);
      // 아이디와 패스워드 값을 가져오자
      const DEVICEID = uniqueId;

      let email = 'kkan2222@gmail.com';
      let password='11111111';
      const user2 = await login({email, password});
      

      setLoading(false);

      const Sleeptime =  await useSleep(1000);


      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
      center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
      level: 4 // 지도의 확대 레벨
      };

      var map = new kakao.maps.Map(mapContainer, mapOption);



      const USER_ID = user2.user.uid;
      const user3 = await get_userInfoForUID({USER_ID});
    
                
     
      user['email'] = email;
      user['uid'] = user2.user.uid;
      user['type'] = user3.USER_TYPE;
      user['nickname'] = user3.USER_NICKNAME;
      user['user_type'] = user3.USER_TYPE;
      user['img'] = user3.USER_IMAGE;

      user["distance"] = user3.DISTANCE;

      const latitude = user.latitude;
      const longitude = user.longitude;


      dispatch2(user);



    

    }

    // async function Process(){
    //   // 찜한목록, 
    //     // const USER_ID = user.uid;
    //     // console.log("USER_ID", USER_ID);
    //     // var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    //     // mapOption = { 
    //     // center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
    //     // level: 4 // 지도의 확대 레벨
    //     // };

    //     // var map = new kakao.maps.Map(mapContainer, mapOption);

    // } 
    // Process();

    UserLogin("uniqueId");


  
  }, [])

  const _handleno = () =>{

   
  }

  const _handlestoreorder = () =>{

    if(user.uid ==''){
      alert("로그인이 필요한 메뉴입니다");
      return;
    }

    

    navigation("/mystoreorder", { state: { STORE: storeitem } });

  }

  const fileInput = useRef();

  const handleUploadClick = (e) => {
    fileInput.current.click();
  };

  const ALLOW_IMAGE_FILE_EXTENSION = "jpg,jpeg,png,bmp";

  const ImagefileExtensionValid = (name) => {
    const extention = removeFileName(name);

    if (
      ALLOW_IMAGE_FILE_EXTENSION.indexOf(extention) <= -1 ||
      extention == ""
    ) {
      return false;
    }
    return true;
  };
  const removeFileName = (originalFileName) => {
    const lastIndex = originalFileName.lastIndexOf(".");

    if (lastIndex < 0) {
      return "";
    }
    return originalFileName.substring(lastIndex + 1).toLowerCase();
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


    if (!ImagefileExtensionValid(filename)) {
      window.alert(
        "업로드 대상 파일의 확장자는 bmp, jpg, jpeg, png 만 가능 합니다"
      );
      return;
    }



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


      let msg = await ImageUpload(uri, email);
      const IMGTYPE = true;
      console.log("uri", msg);

      user["img"] = msg;
      dispatch2(user);

      setUserimg(msg);
      setRefresh((refresh) => refresh +1);

      const USERID = user.uid;
      const img = msg;
      await Update_userimg({USERID, img});

      

    });
  };


  const _handleCheck = ()=>{

      setAlert(true);
      setRefresh((refresh) => refresh +1);
  }

  const alertclosecallback = () =>{
    setAlert(false);
    setRefresh((refresh) => refresh +1);

  }

  const _handleprofilepicture =() =>{
    navigation("/profilepicturechange");
  }

  const _handlehistory = () =>{
    navigation("/historylist");
  }
  const _handlecoupone = () =>{
    navigation("/couponelist");
  }
  const _handlepoint = () =>{
    navigation("/pointlist");
  }

  const _handlehongrequest = () =>{
    navigation("/hongrequest");
  }

  const _handlework = () =>{

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

    let item = {category:REQUESTTYPE.HOME,requestinfo:Requestcleanmessages,requestcontent:"엄마처럼 손이 깔끔한 분 모셔요", rate:"5.0", view:"(10)",use:"5",info:"정기적인청소 / 아파트 / 30평대 / 청소시간3시간 / 오후시간대 / 남성요청",region:"남양주시 다산동",date:"2024-07-01", datedisplay:"마감임박", price:"50000원"};
    navigation("/detailtask2",{state:{Item:item}});
  }


  return (
    <Container style={containerStyle}>
    
    {
      loading == true ? (<></>) :(     
         <>

        {
          alert == true && 
            <AlertModalEx callback={alertclosecallback}/>
        }

        {user.uid == "" ? (
          <MainLoginView>
            <Label
              press={true}
              callback={LoginCallback}
              content={"로그인 "}
              fontweight={700}
              containerStyle={{ color: "#FF4E19" }}
            />
            <Text
              value={"회원로그인 하고 홍여사의 혜택을 받으세요"}
              size={14}
              containerStyle={{ marginTop: 10 }}
            />
          </MainLoginView>
        ) : (
          <MainLoginedView>
            <div style={{ display: "flex", flexDirection: "row", minHeight:40,
              justifyContent: "center",
              alignItems: "center"
               }}>
              <Badge
                count={"이선국 회원님"}
                height={45}
                backgroundColor={"#dbdbdb"}
                color={"#fff"}
                containerStyle={{
                  position: "relative",
                  backgroundColor: "#307bf1",
                  marginRight: "30px",
                  padding: "10px",
                  bottom: "1px",
                  borderRadius: "5px",
        
                }}
              />
              <div style={{height:55,width: 55,
                borderRadius: 50}}>
              <img src={userimg}
              style={{height:50,width:50, borderRadius:50}}
              />  
              </div>
      
              {/* <CameraView onClick={handleUploadClick}><FaCamera /></CameraView> */}

              <Button
              buttonText={"프로필 수정"}
              callback={_handleprofilepicture}
              containerStyle={{
                backgroundColor: "#FFF",
                color :"#000",
                border :"1px solid #ededed",
                borderRadius: "10px",
                fontSize: 12,
                height:20,        
                width: "80px",
              }}
            />
 
              {/* <input
                  type="file"
                  ref={fileInput}
                  onChange={handlefileuploadChange}
                  style={{ display: "none" }}
            /> */}
            </div>

            <div style={{display:"flex", flexDirection:"row", width:"100%"}}>

            <Button
              buttonText={"출석체크"}
              callback={_handleCheck}
              containerStyle={{
                backgroundColor: "#FFF",
                color :"#000",
                border :"1px solid #ededed",
                borderRadius: "10px",
                fontSize: 15,
                height:30,        
                width: "90%",
              }}
            />

            <Button
              buttonText={"로그아웃"}
              callback={_handleLogout}
              containerStyle={{
                backgroundColor: "#FFF",
                color :"#000",
                border :"1px solid #ededed",
                borderRadius: "10px",
                fontSize: 15,
                height:30,
                width: "90%",
              }}
            />
            </div>
    
   
          </MainLoginedView>
        )}

      {user.uid != "" && <> 
          <MyItem USER_IMG={'https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fwoman3.png?alt=media&token=f3b9e09b-60ec-4c1d-ad8d-10b4a76cc9b0'} USER_NICKNAME={'이선국'} ADDR={'남양주 지금동'}
            SCORE1={9} SCORE2={29} SCORE3={9} SCORE4={50} bgcolor={'#ffdda5'}/>

          <Box bgcolor={'#ededed'} height={140}>
            <div style={{textAlign:"left",lineHeight:1.7}}>홍여사 신원 인증 절차를 거치게 되면 홍여사를 이용하는 많은 고객 들에게 더욱더 많은 신뢰감을 주게되어 보다 많은 기회가 생깁니다</div>


            <Button
                buttonText={"홍여사 신원 인증 하기"}
                callback={_handleLadyAuth}
                containerStyle={{
                  backgroundColor: "#FFF",
                  color :"#000",
                  border :"1px solid #ededed",
                  borderRadius: "10px",
                  fontSize: 15,
                  height:40,
                  width: "90%",
                }}
              />

          </Box>


          <Box bgcolor={'#ededed'} height={140}>
            <div style={{textAlign:"left",lineHeight:1.7}}>홍여사 프로필 작성</div>
  
            
            <Button
                buttonText={"홍여사 프로필 작성하러 가기(2/5)"}
                callback={_handleLadyAuth}
                containerStyle={{
                  backgroundColor: "#FFF",
                  color :"#000",
                  border :"1px solid #ededed",
                  borderRadius: "10px",
                  fontSize: 15,
                  height:40,
                  width: "90%",
                }}
              />
              <div style={{textAlign:"left"}}>홍여사 프로필 작성을 모두 완료 하게 되면 홍여사 선택에 좀더 유리한 입장이 됩니다</div>

          </Box>


          <Box bgcolor={'#fff'} height={120}>
            <div style={{textAlign:"left"}}>홍여사에 대해 알아보아요</div>

            <GuideSwipe delaytime={1000}/>
         
          </Box>


          <Box bgcolor={'#ededed'} height={220}>
            <div style={{textAlign:"left"}}>동네 인증</div>


            
            <div style={{textAlign:"left", marginTop:10}}>현재 선택된 동네는 남양주 다산동입니다</div>
          
            <div id="map" className="ConfigMap" style={{marginTop:30}}></div>

          </Box>


          <Box bgcolor={'#ededed'}>
            <div style={{textAlign:"left"}}>구인 요청 목록</div>

            <div style={{display:"flex", flexDirection:"column"}}>

                <WorkItem>
                
                  <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                    <LabelItem>구인요청</LabelItem>
                    <CloseLabelItem>마감된 일감</CloseLabelItem>
                    <div style={{paddingLeft:10, fontSize:12}}>2024년 6월 20일</div>

                    <div style={{position: "absolute",right: '20px'}}>6명 지원중</div>
                  </div>
           
                  <LabelText onClick={_handlework}>7월 31일 날 집청소를 도와줄분을 찾아여</LabelText>
                  <Button
                    buttonText={"지원자 목록보러 가기"}
                    callback={_handlehongrequest}
                    containerStyle={{
                      backgroundColor: "#FFF",
                      color :"#000",
                      border :"1px solid #ededed",
                      borderRadius: "10px",
                      fontSize: 12,
                      height:20,        
                      width: "120px",
                    }}/>
                  <div></div>
                </WorkItem>

                <WorkItem>
                  <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                  <LabelItem>구인요청</LabelItem>
                  <div style={{paddingLeft:10, fontSize:12}}>2024년 6월 20일</div>
                  <div style={{position: "absolute",right: '20px'}}>2명 지원중</div>
                  </div>

                  <LabelText onClick={_handlework}>유치원 등하원 도와줄 분이 어디 없나여?</LabelText>
                  <Button
                    buttonText={"지원자 목록보러 가기"}
                    callback={_handlehongrequest}
                    containerStyle={{
                      backgroundColor: "#FFF",
                      color :"#000",
                      border :"1px solid #ededed",
                      borderRadius: "10px",
                      fontSize: 12,
                      height:20,        
                      width: "120px",
                    }}/>
                </WorkItem>



             
            </div>



          </Box>


          <Box bgcolor={'#ededed'}>
            <div style={{textAlign:"left"}}>구직 요청 목록</div>

            <div style={{display:"flex", flexDirection:"column"}}>

            

                <WorkItem>
                <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                  <LabelItem>구직요청</LabelItem>
                  <CloseLabelItem>마감된 일감</CloseLabelItem>
                  <div style={{paddingLeft:10, fontSize:12}}>2024년 6월 20일</div>
              
                  </div>
                  <LabelText onClick={_handlework}>다산동 집청소을 아침에 해주세여</LabelText>
                  <EnableTag2 bgcolor={'#1c5db2'}>요청 확인 하지 않음</EnableTag2>
                </WorkItem>

                <WorkItem>
                <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                  <LabelItem>구직요청</LabelItem>
                  <div style={{paddingLeft:10, fontSize:12}}>2024년 6월 20일</div>
       
                  </div>
                  <LabelText onClick={_handlework}>다산동 아파트청소를 7월 20일날 도와주세요</LabelText>
                  <EnableTag2 bgcolor={'#1c5db2'}>요청을 확인함</EnableTag2>
                </WorkItem>


                <WorkItem>
                <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                  <LabelItem>구직요청</LabelItem>
                  <div style={{paddingLeft:10, fontSize:12}}>2024년 6월 20일</div>
       
                  </div>
                  <LabelText onClick={_handlework}>다산동 아파트청소를 7월 20일날 도와주세요</LabelText>
  

                  <Button
                    buttonText={"대화가능"}
                    callback={()=>{}}
                    containerStyle={{
                      backgroundColor: "#FF4E19",
                      color :"#fff",
                      borderRadius: "10px",
                      fontSize: 14,
                      height:40,   
                      margin : "0 auto",     
                      width: "90%",
                    }}/>

                </WorkItem>


             
            </div>



          </Box>

          <Box bgcolor={'#ededed'}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{textAlign:"left", padding:"0px 10px"}}>결재내역 관리</div>

            <Button
                    buttonText={"결재 내역 보기"}
                    callback={_handlehistory}
                    containerStyle={{
                      backgroundColor: "#FFF",
                      color :"#000",
                      borderRadius: "10px",
                      fontSize: 14,
                      height:20,     
                      width: "30%",
                    }}/>
            </div>
         
            <div style={{lineHeight:1.6}}>
              <div style={{textAlign:"left"}}>홍여사 시스템에서 현재 결재 한 결재 건수는 총 2건 / 220,000원 입니다</div>
              <div style={{textAlign:"left"}}>
              <div>정산처리 된 금액 200,000원</div>
              <div>홍여사에서 에스크 보유된 금액 120,000원</div>
              </div>
            </div>
       
           
          </Box>

          <Box bgcolor={'#ededed'} >
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{textAlign:"left"}}>입금내역 관리</div>

            <Button
                    buttonText={"입금 내역 보기"}
                    callback={_handlehistory}
                    containerStyle={{
                      backgroundColor: "#FFF",
                      color :"#000",
                      borderRadius: "10px",
                      fontSize: 14,
                      height:20,     
                      width: "30%",
                    }}/>
            </div>
         
            <div style={{textAlign:"left"}}>최근 입금일자 는 2024년 7월 20일 240,000원이 국민은행에 이행* 계좌 로 입급되었습니다</div>
          </Box>


          <Box bgcolor={'#ededed'} height={120}>
            <div style={{textAlign:"left"}}>쿠폰 포인트 관리</div>

            <div style={{display:"flex", flexDirection:"row", marginTop:10}}>
              <CouponeItem onClick={_handlecoupone}>
              <img src={imageDB.FilterNewStore} style={{width:30}}/>쿠폰 3장 보유</CouponeItem>
              <CouponeItem onClick={_handlepoint}>
              <img src={imageDB.FilterNewStore} style={{width:30}}/>240,000 포인트</CouponeItem>
            </div>
          </Box>

      

        </>}

      
        <EmptyRow />
        
        <Label content={'고객관리'}  fontsize={18} containerStyle={{marginTop:10}}/>


        <Row onClick={_handleEvent}>
          <Label
            callback={_handleno}
            content={"이벤트보기 (등록된 이벤트 5개)"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10 }}
          />
          <Image
            source={imageDB.right}
            containerStyle={{ width: "18px", display: "flex" }}
          />
        </Row>


        <Row onClick={_handleFrequentquestion}>
          <Label
            callback={_handleno}
            content={"자주묻는 질문"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10 }}
          />
          <Image
            source={imageDB.right}
            containerStyle={{ width: "18px", display: "flex" }}
          />
        </Row>
        <Row onClick={_handleKakaocenter}>
          <Label
            callback={_handleno}
            content={"1:1 카톡문의"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10,display:"flex",alignItems:"center" }}
          />
          <Image
            source={imageDB.right}
            containerStyle={{ width: "18px", display: "flex" }}
          />
        </Row>

        <Row2 href={fn_smsShare("010-6214-9756")}>
          <Label
            callback={_handleno}
            content={"상담원 연결"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10,display:"flex",alignItems:"center" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "45%",
            }}
          >
            <div style={{ fontSize: 14 }}>평일 10:00 ~ 18:00</div>
            <Image
              source={imageDB.right}
              containerStyle={{ width: "18px", display: "flex" }}
            />
          </div>
        </Row2>

        <Row onClick={_handleNotice}>
          <Label
            callback={_handleno}
            content={"공지사항"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10,display:"flex",alignItems:"center" }}
          />
          <Image
            source={imageDB.right}
            containerStyle={{ width: "18px", display: "flex" }}
          />
        </Row>

        <Row onClick={_handleNotice}>
          <Label
            callback={_handleno}
            content={"약관 및 정책"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10,display:"flex",alignItems:"center" }}
          />
          <Image
            source={imageDB.right}
            containerStyle={{ width: "18px", display: "flex" }}
          />
        </Row>


        <EmptyRow />


        <StoreInfo height={170} containerStyle={{ marginBottom: "20px" }} />

   
      </>)
  
    }

   

    </Container>
  );
}

export default Configcontainer;
