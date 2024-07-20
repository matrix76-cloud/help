import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import CouponeItem from '../components/CouponeItem';
import { get_coupone, get_storecoupone } from '../service/CouponeService';
import Loading from '../common/Loading';
import Text from '../common/Text';
import { get_storeinfoForSTOREID, updatecouponsettingstore } from '../service/StoreService';
import Button from '../common/Button';
import { getStoreData } from '../utility/common';

const Container = styled.div`

`

const Eventcreate = ({containerStyle, STORE_ID}) => {

  const [couponeitems, setCouponeitems] = useState([]);

  const {user, dispatch2} = useContext(UserContext);
  const [load, setLoad] = useState(false);

  const [eventname, setEventname] = useState('');
  const [eventmoney, setEventMoney] = useState('');
  const [eventsu, setEventsu] = useState(0);
  const [refresh, setRefresh] = useState(1);


  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
      // const USER_ID = user.uid;
      const storeitem = await get_storeinfoForSTOREID({STORE_ID});

      console.log("storeitem", storeitem);

      if(storeitem.STORECOUPONECONTENT != undefined){
        setEventname(storeitem.STORECOUPONECONTENT);
      }

      if(storeitem.STORECOUPONEMONEY != undefined){
        setEventMoney(storeitem.STORECOUPONEMONEY);
      }

      if(storeitem.STORECOUPONEAMOUNT != undefined){
        setEventsu(storeitem.STORECOUPONEAMOUNT);
      }

		}
		fetchData();
  }, [])

  useEffect(()=>{
    setEventname(eventname);
  },[refresh])

 const _handleeventregister = async() =>{

  if(eventname =='' || eventmoney == '' || eventsu == ''){
    alert("이벤트 내용을 입력 해주세요");
    return;
  }
  const STORECOUPONECONTENT = eventname;
  const STORECOUPONEMONEY = eventmoney;
  const STORECOUPONEAMOUNT = eventsu;
  const update = await updatecouponsettingstore({STORE_ID,STORECOUPONECONTENT,STORECOUPONEMONEY, STORECOUPONEAMOUNT});
  
  const latitude = user.latitude;
  const longitude = user.longitude;

  getStoreData({user, latitude, longitude}).then((result)=>{
    dispatch2(result);

    alert("이벤트가 정상적으로 등록 되었습니다");
   })

 }
 const _handleeventadjust = () =>{
  
 }



  return (
    <Container style={containerStyle}>

      {
        load == true ? (<Loading/>):(<>
            <div style={{display:"flex", padding:10,  flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start"}}>
            <Text value={'이벤트 내용'} containerStyle={{ paddingLeft:20}} size={14}  />
            <input type="text"
              className='inputgeneral'
              placeholder ={"이벤트 내용을 입력 하세요"}
              value ={eventname}
              onChange = {e => {
                  setEventname(e.target.value);
                  setRefresh(refresh => refresh + 1);
              }}
            />
            </div>

            <div style={{display:"flex",padding:10,  flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start", marginTop:20}}>
            <Text value={'이벤트 금액'} containerStyle={{ paddingLeft:20}} size={14}  />
            <input type="number"
              className='inputgeneral'
              placeholder ={"이벤트 금액을 입력 하세요"}
              value ={eventmoney}
              onChange = {e => {
                  setEventMoney(e.target.value);
                  setRefresh(refresh => refresh + 1);
              }}
            />
            </div>


            <div style={{display:"flex",padding:10,  flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start", marginTop:20}}>
            <Text value={'쿠폰 수량'} containerStyle={{paddingLeft:20}} size={14}  />
            <input type="number"
                 className='inputgeneral'
              placeholder ={"쿠폰수량을 입력 하세요"}
              value ={eventsu}
              onChange = {e => {
                  setEventsu(e.target.value);
                  setRefresh(refresh => refresh + 1);
              }}
            />
            </div>

            <Button
            buttonText={"이벤트 등록"}
            callback={_handleeventregister}
            containerStyle={{
              backgroundColor : "#FFF",
              color: "#000",
              border : "1px solid #ededed",
              width: "80%",
              height: "40px",
              fontSize: "16px",
              borderRadius: "5px",
              margin :"20px 10%"

            }}
          />

         
        </>)
      
      }
   
    </Container>
  );
}

export default Eventcreate;
