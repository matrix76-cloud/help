import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { UserContext } from '../context/User';
import { add_couponemember, add_couponestore, get_enablestorecoupone } from '../service/CouponeService';
import { updatecouponestore } from '../service/StoreService';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: flex-start;
  padding:20px;

`
const EventButtonView = styled.div`
    display:flex;
    background-color  : #588CFF;
    margin : 5px 0px;
    flex-direction : row;
    justify-content : space-between;
    align-items:center;
    border-radius :10px;
    padding :5px;
    height:30px;
`
    

const EventButtonView2 = styled.div`
    display:flex;
    background-color  : #F0F0F0;
    margin : 5px 0px;
    flex-direction : row;
    justify-content : space-between;
    align-items:center;
    border-radius :10px;
    padding :5px;
    height:30px;
`

const EventImage = styled.div`
    display:flex;
    justify-content: center;


`

const EventImage2 = styled.div`
    display:flex;
    justify-content: center;


`
const EventImageText = styled.span`
    font-size :18px;
    font-family : ${({theme}) =>theme.BOLD};
`
const EventTextView = styled.div`
    display:flex;
    justify-content : center;
    align-items:center;

`
const EventText = styled.span`
    font-size :14px;
    font-family : ${({theme}) =>theme.BOLD};
    color :#ffffff;
`
const EventMoreText = styled.span`
    font-size :13px;
    font-family : ${({theme}) =>theme.BOLD};
    color :#ffffff;
`
const EventText2 = styled.span`
    font-size :14px;
    font-family : ${({theme}) =>theme.REGULAR};
    color :#000;
`
const EventMoreButtonView = styled.div`
    display:flex;
    flex-direction: row;
    justify-content : center;
    align-items : center;
 
`

const Maxheaderblink = styled.div`

    color: #fff;
    background-color :#fb5555;
    padding: 5px;
    font-size: 12px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    border-radius: 20px;
    animation-duration: .2s;
    animation-name: point-move;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    min-width: 50px;
    text-align: center;
    width:65%;
    animation: box-ani 1s linear infinite;
    z-index: -5;
    display:flex;

    &:after { 
        content: "";
        border-top: 15px solid #ff4e19;
        border-left: 15px solid transparent;
        border-right: 8px solid transparent;
        position: absolute;
        left: 0;
        right: 80%;
        top: 35px;
        margin: 0 auto;
        width: 0;
        height: 0;
    }
`


const Storeevent = ({containerStyle, store, create, customer}) => {

  const navigate = useNavigate();

  const [storeEventsu, setStoreEventsu] = useState(0);
  const [refresh, setRefresh] = useState(1);

  const {user, dispatch2} = useContext(UserContext);

  useEffect(()=>{
    setStoreEventsu(store.STORECOUPONEAMOUNT);

  },[])
  useEffect(()=>{
    setStoreEventsu(storeEventsu);

  },[refresh])

  const _handleCoupon = async() =>{

    if(create == true){
 
    //    navigate("/eventcreate", { state: { STORE_ID: store.STORE_ID } });
    }
    if(customer == true){


        // 로그인이필요함
        if(user.uid == ''){
            alert("로그인이 필요한 메뉴 입니다");
            return;
        }

        // 자기 상점에는 쿠폰을 가질수가 없습니다
        if(store.USER_ID == user.uid){
            alert("자신의 상점에는 쿠폰을 얻을수가 없습니다");
            return;
        }

        const STORE_ID = store.STORE_ID;

        // 쿠폰이 현재 존재 한다면 return

        const couponeitems = await get_enablestorecoupone({STORE_ID});

        const FindIndex = couponeitems.findIndex(x=>x.USER_ID == user.uid);

        if(FindIndex != -1){
            alert("해당 상점에서 이미 발급된 쿠폰이 있습니다");
            return;
        }



        // 수량이 0 이상 이다면 
        if(store.STORECOUPONEAMOUNT <= 0){
            return;
        }

    

        // 상점에서 쿠폰수량 줄이고

     
        const STORECOUPONEAMOUNT = store.STORECOUPONEAMOUNT -1;

        const update = await updatecouponestore({STORE_ID,STORECOUPONEAMOUNT});

        // 수량을 현재창에서 줄이고

    
        store.STORECOUPONEAMOUNT  = store.STORECOUPONEAMOUNT -1;

        setRefresh((refresh) => refresh +1);


        // couponestore에 등록하고
        const USER_ID = user.uid;
        const COUPONECONTENT = store.STORECOUPONECONTENT;
        const COUPONEMONEY = store.STORECOUPONEMONEY;
        const STOREIMAGE = store.STOREIMAGEARY[0];
        const STORE_NAME = store.STORENAME;
        const USER_NICKNAME = user.nickname;
        const COUPONEDOC = Date.now();

        const regist1 = await add_couponemember({
            USER_ID,
            STORE_ID,
            COUPONECONTENT,
            COUPONEMONEY,
            STOREIMAGE,
            STORE_NAME,
            USER_NICKNAME,
            COUPONEDOC,
        })



        // coupnemember에 등록하라

        const regist2 = await add_couponestore({
            USER_ID,
            STORE_ID,
            COUPONECONTENT,
            COUPONEMONEY,
            USER_NICKNAME,
            COUPONEDOC,
        })

        alert("쿠폰을 수령 하였습니다. 내정보에서 쿠폰함을 확인해주시기 바랍니다");


    }



  }
  const [couponcount, setCouponcount] = useState(0);

   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
         <Text value={'이벤트'} containerStyle={{fontWeight:600}} size={14}  />
         <div style={{marginTop:25, display:"flex", flexDirection:"column", width:"100%"}}>
                {
                    store.STORECOUPONECONTENT != undefined && 
                    <>
                     <Maxheaderblink>
                        <img src={imageDB.bottom_gps} style={{ width: '20px',height: '20px',paddingLeft: '5px'}}/>
                        <div>아래 버튼을 누르면 <br/> 쿠폰을 받을수가 있습니다</div></Maxheaderblink>
                     <EventButtonView  activeOpacity={0.8} onClick={_handleCoupon} className="Button"   >
                   
                   <EventTextView>
                       <EventImage>
                           <EventImageText>⚡️</EventImageText>
                       </EventImage>
                       <EventText>{store.STORECOUPONECONTENT}  {store.STORECOUPONEMONEY}원</EventText>
                   </EventTextView>
                   <EventMoreButtonView>
                       <div><EventMoreText>남은수량 {store.STORECOUPONEAMOUNT}개</EventMoreText></div>
                   </EventMoreButtonView>
                     </EventButtonView>
                    </>
                   
                }
     
                {
                    store.STOREEVENTS.map((data, index)=>(
                        <EventButtonView2 key={index}>
                       
                        <EventTextView>
                            <EventImage2>
                            <EventImageText>✨</EventImageText>
                            </EventImage2>
                            <EventText2>{data}</EventText2>
                        </EventTextView>
                        </EventButtonView2> 
                    ))
                }
         
         </div>
    </Container>
  );
}

export default Storeevent;
