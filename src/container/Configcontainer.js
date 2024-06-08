
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
import { logout, reset_userdevice, Update_userimg } from '../service/UserService';
import { get_badalluser, get_baduser } from '../service/BadUserService';
import { CiCamera } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";

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
    align-items     : flex-start;
    margin          : 20px 3%;
    background-color: #FFF;
    border          : 1px solid #ededed;
    height          : 60px;
    padding-left    : 30px;
    padding-top     : 20px;
    padding-bottom  : 20px;
`

const MainLoginedView = styled.div`
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : flex-start;
    margin          : 20px 3%;
    background-color: #F7F7F7;
    height          : 140px;
    padding-left    : 30px;
    padding-top     : 20px;
`

const EmptyRow = styled.div`
  background-color: #F7F7F7;
  height          : 10px;
  margin-bottom : 20px;
`
const CameraView = styled.div`
  height: 20px;
  width: 20px;
  position: relative;
  top: -20px;
  left: -15px;
`

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
  
  useEffect(()=>{
    setUserimg(userimg);

  },[refresh]);
  const LoginCallback = () =>{
      navigation("/login");
  }
  const _handleHeart = () =>{

      if(user.uid ==''){
          alert("로그인이 필요한 메뉴입니다");
          return;
      }

      if(heartcount ==0){
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


  useEffect(()=>{
    window.scrollTo(0,0);
      return () => {
    };
  },[])

  useEffect( ()=>{
    setLoading(true);
    async function Process(){
                      // 찜한목록, 

      if(user.uid == ''){
        setLoading(false);
        return;
      }


      const USER_ID = user.uid;

    

      const heartitems = await get_heartstores();
      let   heartcount = 0;

      heartitems.map((data, index)=>{
          if(ArrayIncludeData(data, user.uid)){
              heartcount++;
          }
      });

      setHeartcount(heartcount);

                      //쿠폰 수령
      const receivcoupone = await get_coupone({USER_ID});


      setReceivecouponeitems(receivcoupone);
      //내가 쓴 댓글
      const reviewitems = await get_reviewForUser({USER_ID});

      setReviewitems(reviewitems);
      //점주인지 여부와 점주 상태 정보
      const storeitem = await get_storeinfoForUSERID({USER_ID});

      setStoreitem(storeitem);
      if (storeitem != null) {
        setStorename(storeitem.STORENAME);
      }



      // 쿠폰발행
      if(storeitem != null){
          const STORE_ID = storeitem.STORE_ID;

          const storecoupone = await get_enablestorecoupone({STORE_ID});
          setStorecouponeitems(storecoupone);

      }

      // 관리사
      if(storeitem != null){
          const STORE_ID    = storeitem.STORE_ID;
          const storechecks = await get_checkuser({USER_ID});
          setStorecheckeritems(storechecks);
    
      }

      // 리뷰 등록된거
      if(storeitem != null){
          const STORE_ID     = storeitem.STORE_ID;
          const storereviews = await get_review({STORE_ID});
          setStorereviewitems(storereviews);

      }
      //부정사용자
      if (storeitem != null) {
          const STORE_ID = storeitem.STORE_ID;
          const badUseritems = await get_badalluser({STORE_ID});
          setBadusercount(badUseritems.length);
    
      } 

      setLoading(false);
    } 
    Process();
  }, [])

  const _handleno = () =>{

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


  return (
    <Container style={containerStyle}>
    
    {
      loading == true ? (<></>) :(     
         <>
        {user.uid == "" ? (
          <MainLoginView>
            <Label
              press={true}
              callback={LoginCallback}
              content={"로그인 및 회원가입 >"}
              fontweight={700}
              containerStyle={{ color: "#FF4E19" }}
            />
            <Text
              value={"회원가입 하고 마원의 혜택을 받으세요"}
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
                count={user.type == TYPE.USER ? "일반회원" : storename + "점주회원"}
                height={45}
                backgroundColor={"#307bf1"}
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
      
              <CameraView onClick={handleUploadClick}><FaCamera /></CameraView>
 
              <input
                  type="file"
                  ref={fileInput}
                  onChange={handlefileuploadChange}
                  style={{ display: "none" }}
            />
            </div>

            <Text
              value={user.nickname + "으로 로그인되어 있습니다"}
              size={14}
              containerStyle={{ marginTop: 10 }}
            />

            <Button
   
              buttonText={"로그아웃"}
              callback={_handleLogout}
              containerStyle={{
                backgroundColor: "#FFF",
                color :"#000",
                border :"1px solid #ededed",
                borderRadius: "10px",
                fontSize: 17,
                height:60,
                margin: " 10px 0px",
                width: "90%",
                boxShadow: "1px 1px 1px #d1cccc",
              }}
            />
          </MainLoginedView>
        )}

        {user.type == TYPE.STORE && storeitem != null && (
          <div>
            <Row>
              <Label
                callback={_handleno}
                content={"점주메뉴"}
                fontweight={900}
                containerStyle={{ paddingLeft: 10 }}
              />
            </Row>


            <Row onClick={_handleMystore}>
              <Label
                callback={_handleno}
                content={"내 매장보기"}
                fontweight={400}
                containerStyle={{ paddingLeft: 10 }}
              />
              <Image
                source={imageDB.right}
                containerStyle={{ width: "18px", display: "flex" }}
              />
            </Row>

            <Row onClick={_handleMystoreconfig}>
              <Label
                callback={_handleno}
                content={"매장정보관리"}
                fontweight={400}
                containerStyle={{ paddingLeft: 10 }}
              />
              <Image
                source={imageDB.right}
                containerStyle={{ width: "18px", display: "flex" }}
              />
            </Row>
            <Row onClick={_handleStorecoupone}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Label
                  callback={_handleno}
                  content={"발행한 쿠폰관리"}
                  fontweight={400}
                  containerStyle={{ paddingLeft: 10 }}
                />
                {storecouponeitems.length > 0 && (
                  <Badge
                    count={storecouponeitems.length}
                    width={30}
                    height={40}
                    backgroundColor={"#dad7d7"}
                    color={"#000"}
                    containerStyle={{
                      position: "relative",
                      backgroundColor: "#dad7d7",
                      width: "20px",
                      marginLeft: "10px",
                      padding:"2.5px 0px",
                      marginTop:"-5px",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </div>
              <div>
                <Image
                  source={imageDB.right}
                  containerStyle={{ width: "18px", display: "flex" }}
                />
              </div>
            </Row>
            <Row onClick={_handleStorecheckers}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Label
                  callback={_handleno}
                  content={"관리사관리"}
                  fontweight={400}
                  containerStyle={{ paddingLeft: 10 }}
                />
                {storecheckeritems.length > 0 && (
                  <Badge
                    count={storecheckeritems.length}
                    width={30}
                    height={40}
                    backgroundColor={"#dad7d7"}
                    color={"#000"}
                    containerStyle={{
                      position: "relative",
                      backgroundColor: "#dad7d7",
                      width: "20px",
                      marginLeft: "10px",
                      padding:"2.5px 0px",
                      marginTop:"-5px",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </div>
              <div>
                <Image
                  source={imageDB.right}
                  containerStyle={{ width: "18px", display: "flex" }}
                />
              </div>
            </Row>
            <Row onClick={_handleStorereview}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Label
                  callback={_handleno}
                  content={"댓글관리"}
                  fontweight={400}
                  containerStyle={{ paddingLeft: 10 }}
                />
                {storereviewitems.length > 0 && (
                  <Badge
                    count={storereviewitems.length}
                    width={30}
                    height={40}
                    backgroundColor={"#dad7d7"}
                    color={"#000"}
                    containerStyle={{
                      position: "relative",
                      backgroundColor: "#dad7d7",
                      width: "20px",
                      marginLeft: "10px",
                      padding:"2.5px 0px",
                      marginTop:"-5px",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </div>
              <div>
                <Image
                  source={imageDB.right}
                  containerStyle={{ width: "18px", display: "flex" }}
                />
              </div>
            </Row>
            <Row onClick={_handleChatconfig}>
              <Label
                callback={_handleno}
                content={"매장대화 설정"}
                fontweight={400}
                containerStyle={{ paddingLeft: 10 }}
              />
              <div>
                <Image
                  source={imageDB.right}
                  containerStyle={{ width: "18px", display: "flex" }}
                />
              </div>
            </Row>
            <Row onClick={_handleBaduser}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Label
                  callback={_handleno}
                  content={"손님 관리"}
                  fontweight={400}
                  containerStyle={{ paddingLeft: 10 }}
                />
                {badusercount != 0 && (
                  <Badge
                    count={badusercount}
                    width={30}
                    height={40}
                    backgroundColor={"#dad7d7"}
                    color={"#000"}
                    containerStyle={{
                      position: "relative",
                      backgroundColor: "#dad7d7",
                      width: "20px",
                      marginLeft: "10px",
                      padding:"2.5px 0px",
                      marginTop:"-5px",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </div>
              <Image
                source={imageDB.right}
                containerStyle={{ width: "18px", display: "flex" }}
              />
            </Row>
          </div>
        )}

        <EmptyRow />

        <Row>
              <Label
                callback={_handleno}
                content={"일반메뉴"}
                fontweight={900}
                containerStyle={{ paddingLeft: 10 }}
              />
        </Row>

        <Row onClick={_handleHeart}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Label
              callback={_handleno}
              content={"찜한목록"}
              fontweight={400}
              containerStyle={{ paddingLeft: 10 }}
            />
            {heartcount > 0 && user.uid != "" && (
              <Badge
                count={heartcount}
                width={30}
                height={35}
                backgroundColor={"#dad7d7"}
                color={"#000"}
                containerStyle={{
                  position: "relative",
                  backgroundColor: "#dad7d7",
                  width: "20px",
                  marginLeft: "10px",
                  padding:"3px 0px",
                  marginTop:"-5px",
                  borderRadius: "5px",
                }}
              />
            )}
          </div>
          <div>
            <Image
              source={imageDB.right}
              containerStyle={{ width: "18px", display: "flex" }}
            />
          </div>
        </Row>
        <Row onClick={_handleRecent}>
          <Label
            callback={_handleno}
            content={"최근본 업체"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10 }}
          />
          <div onClick={_handleRecent}>
            <Image
              source={imageDB.right}
              containerStyle={{ width: "18px", display: "flex" }}
            />
          </div>
        </Row>

        <Row onClick={_handleReceivecoupone}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Label
              callback={_handleno}
              content={"쿠폰함"}
              fontweight={400}
              containerStyle={{ paddingLeft: 10 }}
            />
            {receivecouponeitems.length > 0 && user.uid != "" && (
              <Badge
                count={receivecouponeitems.length}
                width={30}
                height={35}
                backgroundColor={"#dad7d7"}
                color={"#000"}
                containerStyle={{
                  position: "relative",
                  backgroundColor: "#dad7d7",
                  width: "20px",
                  marginLeft: "10px",
                  padding:"2.5px 0px",
                  marginTop:"-5px",
                  borderRadius: "5px",
                }}
              />
            )}
          </div>

          <div>
            <Image
              source={imageDB.right}
              containerStyle={{ width: "18px", display: "flex" }}
            />
          </div>
        </Row>

        <Row onClick={_handleReview}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Label
              callback={_handleno}
              content={"내가 쓴 댓글"}
              fontweight={400}
              containerStyle={{ paddingLeft: 10 }}
            />
            {reviewitems.length > 0 && user.uid != "" && (
              <Badge
                count={reviewitems.length}
                width={30}
                height={35}
                backgroundColor={"#dad7d7"}
                color={"#000"}
                containerStyle={{
                  position: "relative",
                  backgroundColor: "#dad7d7",
                  width: "20px",
                  marginLeft: "10px",
                  padding:"2.5px 0px",
                  marginTop:"-5px",
                  borderRadius: "5px",
                }}
              />
            )}
          </div>
          <div>
            <Image
              source={imageDB.right}
              containerStyle={{ width: "18px", display: "flex" }}
            />
          </div>
        </Row>

        <Row onClick={_handleRangesetting}>
          <Label
            callback={_handleno}
            content={"지역범위 설정"}
            fontweight={400}
            containerStyle={{ paddingLeft: 10 }}
          />

          <div>
            <Image
              source={imageDB.right}
              containerStyle={{ width: "18px", display: "flex" }}
            />
          </div>
        </Row>

        <EmptyRow />

        <Row>
          <Label
            callback={_handleno}
            content={"고객문의"}
            fontweight={900}
            containerStyle={{ paddingLeft: 10 }}
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
            containerStyle={{ paddingLeft: 10 }}
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
            containerStyle={{ paddingLeft: 10 }}
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
            containerStyle={{ paddingLeft: 10 }}
          />
          <Image
            source={imageDB.right}
            containerStyle={{ width: "18px", display: "flex" }}
          />
        </Row>

        <Row>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Label
              callback={_handleno}
              content={"입점문의"}
              fontweight={400}
              containerStyle={{ paddingLeft: 10 }}
            />
            {(storeitem != null && storeitem.STORESTATUS == STORE_STATUS.REGIST)  && 

                <Badge
                count={'입점상태입니다'}
                height={40}
                backgroundColor={"#FFF"}
                color={"#000"}
                containerStyle={{
                  position: "relative",
                  backgroundColor: "#FFF",
                  width: "100px",
                  marginLeft: "10px",
                  borderRadius: "5px",
                }}
              />
            }
            {(storeitem != null && storeitem.STORESTATUS == STORE_STATUS.UNREGIST)  && 
              <Badge
              count={'입점대기 상태입니다'}
              height={40}
              backgroundColor={"#FFF"}
              color={"#000"}
              containerStyle={{
                position: "relative",
                backgroundColor: "#FFF",
                width: "100px",
                marginLeft: "10px",
                borderRadius: "5px",
              }}
              />
              }

        
          </div>
          <Image
            source={imageDB.right}
            containerStyle={{ width: "18px", display: "flex" }}
          />
        </Row>


   
      </>)
    }

    </Container>
  );
}

export default Configcontainer;
