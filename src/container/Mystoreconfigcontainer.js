
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
import { get_storeinfoForSTOREID, get_storeviewcheck, regist_storeview, updatenoticesettingstore } from '../service/StoreService';
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




const MyStoreconfigcontainer = ({containerStyle, STORE_ID}) => {

 const { user, dispatch2 } = useContext(UserContext);
 const [refresh, setRefresh] = useState(1);
 const [storenotice, setStorenotice] = useState('');

 const navigation = useNavigate();


 useEffect(()=>{

  async function FetchData(){

    const storeitem = await get_storeinfoForSTOREID({STORE_ID});

    setStorenotice(storeitem.STORENOTICE);
  }
  FetchData();

 }, [])

 useEffect(()=>{
  setStorenotice(storenotice);

 },[refresh])
    
 const _handlenoticeregister = async() =>{

  const STORENOTICE = storenotice;
  const update = await updatenoticesettingstore({STORE_ID,STORENOTICE});
  alert("사장님 말씀이 정상적으로 등록 되었습니다");


 }


  return (
    <Container style={containerStyle}>
       <GuideLabel
            containerStyle={{marginTop:50}}
            height={120}
            LabelText={'매장 정보 설정'} SubLabelText={MaroneContent.store}/>

   
      <MainView>
        <StoreTypeText>{'사장님 한말씀'}</StoreTypeText>

        <input type="text"
              style={{border:"none", fontSize:14, width:"80%", margin: "10px 5%"}}
              placeholder ={"사장님 한말씀 내용을 입력 하세요"}
              value ={storenotice}
              onChange = {e => {
                setStorenotice(e.target.value);
                setRefresh(refresh => refresh + 1);
              }}
            />


      </MainView>

      <Button
            buttonText={"사장님 한말씀 등록"}
            callback={_handlenoticeregister}
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

      <EmptyRow/>
      <MainView>
        <StoreTypeText>{'이벤트 설정'}</StoreTypeText>
      </MainView>

      <Eventcreate STORE_ID={STORE_ID} />




    </Container>
  );
}

export default MyStoreconfigcontainer;
