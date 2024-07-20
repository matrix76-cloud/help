
import React,{useState, useEffect, useRef, useContext} from 'react';

import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, unstable_HistoryRouter} from "react-router-dom";
import styled from 'styled-components';
import Label from '../common/Label';
import { imageDB } from '../utility/imageData';
import Image from '../common/Image';
import Text from '../common/Text';
import { theme } from '../theme/theme';
import { useSleep } from '../utility/common';
import Loading from '../common/Loading';
import { get_storeinfoForSTOREID, get_storeinfoForUSERID, get_storeviewcheck, registerstore, regist_storeview, updatenoticesettingstore, updatestore } from '../service/StoreService';
import Storegate from '../components/Storegate';
import Storemain from '../components/Storemain';
import Storeintroduce from '../components/Storeintroduce';
import Storeevent from '../components/Storeevent';
import Storefee from '../components/Storefee';
import Storethema from '../components/Storethema';
import Storecheck from '../components/Storecheck';
import Storeguide from '../components/Storeguide';
import Storeposition from '../components/Storeposition';
import Storeowner from '../components/Storeowner';
import Storereview from '../components/Storereview';
import Storebutton from '../components/Storebutton';
import Storetopbutton from '../components/Storetopbutton';
import Storeimageaccessory from '../components/Storeimageaccessory';
import { UserContext } from '../context/User';
import { MaroneContent } from '../utility/maroneDefine';
import GuideLabel from '../components/GuildeLable';
import Eventcreate from '../components/Eventcreate';
import Button from '../common/Button';
import { FaCamera } from "react-icons/fa";
import { uploadImage } from '../service/CheckService';



const Container = styled.div`
  height :100%;
  margin-bottom :70px;
`
const MainView = styled.div`
  padding :5%;
  display:flex;
  flex-direction:column;
`
const FilterContainer = styled.div`
  padding :0px 10px;
  display : flex;
  justify-content: center;
  flex-direction : row;
  height :50px;
  background-color :#fff;
  border-bottom : 1px solid #000;
  position:sticky;
  top:0px;
  padding: 0px 10px;

`
const TrendingXScroll = styled.div`
    display: flex;
    flex-direction: row;
    flex-direction: row;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    overflow-x: auto;
`
const Row = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
`
const StoreTypeName = styled.div`
    display: flex;
    margin-right :10px;
    width : max-content;
    height:40px;
    font-weight:600;
    border-bottom : ${({contenttype, type}) => contenttype === type ? "3px solid #000" :"null" };
`

const StoreTypeText = styled.a`
    font-size: 15px;
    justify-content: flex-start;
    color :#000;
    display: flex;
    align-items: center;

`

const EmptyRow = styled.div`
  background-color :#F7F7F7;
  height:20px;
`

const Cameraview = styled.div`
  border: 1px solid rgb(237, 237, 237);
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-left:5px;
`




const MyStoreordercontainer = ({containerStyle, STORE}) => {

 const { user, dispatch2 } = useContext(UserContext);
 const [refresh, setRefresh] = useState(1);
 const [storenotice, setStorenotice] = useState('');

 const [storeimageary, setStoreimageary] = useState([]);

 const navigation = useNavigate();


 const [storename, setStorename] = useState('');

 const [storeintroduce, setStoreintroduce] = useState('');
 const [storestarttime, setStorestarttime] = useState('');
 const [storeendtime, setStoreendtime] = useState('');
 const [storetel, setStoretel] = useState('');


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

     let image_ = await ImageUpload(uri, email);
     const IMGTYPE = true;
     console.log("uri", image_);

     storeimageary.push(image_);


     setStoreimageary(storeimageary);
     setRefresh((refresh) => refresh +1);


   });
 };


 const _handlestoreregister =async() =>{

  if(user.uid == ''){
    alert("로그인이 필요한 메뉴입니다");
    return;
  }

  const STORENAME = storename;
  const STORESTARTTIME = storestarttime;
  const STOREENDTIME = storeendtime;
  const STOREINTRODUCE = storeintroduce;
  const STORENOTICE = storenotice;
  const STORETEL = storetel;
  const STOREIMAGEARY = storeimageary;
  const STORESTATUS = "unregist";

   
  console.log("store", STORENAME, STORESTARTTIME,user);

  if(STORE == null)
  {
    const store = await registerstore({user,STORENAME,STORESTARTTIME,STOREENDTIME,STOREINTRODUCE,STORENOTICE
      ,STORETEL,STOREIMAGEARY,STORESTATUS});
  }else{

    const USER_ID = user.uid;

    console.log("USERID", USER_ID);
    const store = await updatestore({USER_ID,STORENAME,STORESTARTTIME,STOREENDTIME,STOREINTRODUCE,STORENOTICE
      ,STORETEL,STOREIMAGEARY,STORESTATUS});
  }



  navigation("/config");

 }

 useEffect(()=>{

  async function FetchData(){

    const USER_ID = user.uid;

    const storeitem = await get_storeinfoForUSERID({USER_ID});

    console.log("storeitem", storeitem);

    if(storeitem){
      setStorename(storeitem.STORENAME);
      setStorenotice(storeitem.STORENOTICE);
      setStoreintroduce(storeitem.STOREINTRODUCE);
      setStorestarttime(storeitem.STORESTARTTIME);
      setStoreendtime(storeitem.STOREENDTIME);
      setStoretel(storeitem.STORETEL);
      setStoreimageary(storeitem.STOREIMAGEARY);
  
      setRefresh((refresh) => refresh +1);
    }



  }
  FetchData();

 }, [])

 useEffect(()=>{
  setStorename(storename);
  setStorenotice(storenotice);
  setStoreintroduce(storeintroduce);
  setStorestarttime(storestarttime);
  setStoreendtime(storeendtime);
  setStoretel(storetel);
  setStoreimageary(storeimageary);

 },[refresh])
    
 const _handlenoticeregister = async() =>{

  // const STORENOTICE = storenotice;
  // const update = await updatenoticesettingstore({STORE_ID,STORENOTICE});
  // alert("사장님 말씀이 정상적으로 등록 되었습니다");


 }

 useEffect(()=>{
  window.scrollTo(0,0);
    return () => {
  };
},[])


  return (
    <Container style={containerStyle}>
       <GuideLabel
            containerStyle={{marginTop:50}}
            height={140}
            LabelText={'입점문의'} SubLabelText={MaroneContent.storeorder}/>

   
      <MainView>
        <StoreTypeText>{'가게이름'}</StoreTypeText>
        <input type="text"
              className='inputgeneral'
              value ={storename}
              onChange = {e => {
                setStorename(e.target.value);
                setRefresh(refresh => refresh + 1);
              }}
            />
      </MainView>

      <MainView>
        <StoreTypeText>{'사장님 한말씀'}</StoreTypeText>
        <input type="text"
              className='inputgeneral'
              placeholder ={"사장님 한말씀 을 입력 하세요"}
              value ={storenotice}
              onChange = {e => {
                setStorenotice(e.target.value);
                setRefresh(refresh => refresh + 1);
              }}
            />
      </MainView>


      <MainView>
        <StoreTypeText>{'가게영업시간'}</StoreTypeText>
        <input type="text"
              className='inputgeneral'
              placeholder ={"시작시간을 숫자로 압력해주세여 예)2000"}
              value ={storestarttime}
              onChange = {e => {
                setStorestarttime(e.target.value);
                setRefresh(refresh => refresh + 1);
          }}/>
        <input type="text"
              className='inputgeneral'
              placeholder ={"종료시간을 숫자로 압력해주세여 예)0400"}
              value ={storeendtime}
              onChange = {e => {
                setStoreendtime(e.target.value);
                setRefresh(refresh => refresh + 1);
          }}/>
      </MainView>

      <EmptyRow/>


      <MainView>
        <StoreTypeText>{'매장소개'}</StoreTypeText>
        <textarea type="text"
              style={{fontSize:14, margin: "10px", height:200,  outline: 0,padding:"10px",
              resize: "none", border: "1px solid #ededed"}}
              placeholder ={"매장소개를 입력 하세요"}
              value ={storeintroduce}
              onChange = {e => {
                setStoreintroduce(e.target.value);
                setRefresh(refresh => refresh + 1);
              }}
            />
      </MainView>

      <EmptyRow/>


      <MainView>
        <StoreTypeText>{'매장연락처'}</StoreTypeText>
        <input type="text"
              className='inputgeneral'
              placeholder ={"매장연락처를 입력 하세요"}
              value ={storetel}
              onChange = {e => {
                setStoretel(e.target.value);
                setRefresh(refresh => refresh + 1);
              }}
            />
      </MainView>

      <EmptyRow/>

      <MainView>
        <StoreTypeText>{'매장사진'}</StoreTypeText>

        <div style={{marginTop:10, display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
          <Cameraview onClick={handleUploadClick}>
            <FaCamera  />
          </Cameraview>

          {
          storeimageary.map((data, index)=>(
            <img src={data} style={{width:"30%", marginLeft:5}}/>
          ))
          }

        </div>

        <input
            type="file"
            ref={fileInput}
            onChange={handlefileuploadChange}
            style={{ display: "none" }}
        />



   
      </MainView>

      <EmptyRow/>



      <Button
            buttonText={"입점문의"}
            callback={_handlestoreregister}
            containerStyle={{
              backgroundColor : "#FFF",
              color: "#000",
              border : "1px solid #ededed",
              width: "80%",
              margin : "10px 10% 10px 10%",
              height: "40px",
              fontSize: "16px",
              borderRadius: "5px",
  
            }}
            />







    </Container>
  );
}

export default MyStoreordercontainer;
