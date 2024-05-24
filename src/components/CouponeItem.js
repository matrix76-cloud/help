import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Image from '../common/Image';
import { CommaFormatted, getDateFullTime } from '../utility/common';
import { imageDB } from '../utility/imageData';
import { theme } from '../theme/theme';
import { deletecouponestore, updatcouponemember, updatcouponestore } from '../service/CouponeService';
import { get_userInfoForUID } from '../service/UserService';

const Container = styled.div`
  background-color : ${({index}) => index % 2 == 0 ? ('#f9f9f9') :('#fff')};
  padding :10px;

`
const ItemView = styled.div`
    display :flex;
    flex-direction : row;
    padding :20px;

    border-radius :5px;
`
const ItemView2 = styled.div`
    display :flex;
    flex-direction : row;
    padding :20px;

    border-radius :5px;


`

const ItemImageView = styled.div`
    display :flex;    
`
const ItemContentView = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-top:20px;
    justify-content: center;
    color :#696969;
    position:absolute;
` 

const ItemDataView = styled.div`
    display :flex;
    height:23px;
` 
const ItemBarcodeView = styled.div`
    display :flex;
    justify-content:center;
    align-items:center;
`

const ItemDateText = styled.div`
    font-size: 14px;
    font-family : ${({theme}) =>theme.REGULAR};

`
const BarcodeText = styled.div`
    color :#696969;
    font-size: 30px;
    font-family : 'CODE39-1';
`
const EmptyRow = styled.div`
    background-color: #F7F7F7;
    height: 10px;
    width: 100%;
    margin: 20px 0px;
`
const DeleteView = styled.div`
    width :30px;
    height :30px;
    border-radius :100px;
    justify-content:center;
    align-items : center;
    position:absolute;
    top:-15px;
    left:5px;
`

const Tag = styled.div`

    background-color : #FF4E19;
    border-radius :5px;
    justify-content:center;
    align-items:center;
    display:flex;
    height: 40px;
    width: 100px;


`

const DisableTag = styled.div`
 
    background-color : #5D5A5A;
    border-radius :5px;
    justify-content:center;
    align-items:center;
    display:flex;
    height: 40px;
    width: 100px;
    margin-left:20px;


`
const TagText = styled.span`
    font-size: 14px;
    font-family : ${({theme}) =>theme.EXTRABOLD};
    color : white;
    justify-content:center;
    align-items:center;
`


const CouponeItem = ({containerStyle, store, couponeitem, index, callback}) => {

  const [rand, setRand] = useState(0);
  const [userimg, setUserimg] = useState('');

  const _handleDelete = async() =>{
    console.log("handle delete");

          
    if(couponeitem.ENABLE == true){
        alert("유효한 쿠폰은 삭제 할수가 없습니다");
        return;
    }

    const COUPONESTORE_ID = couponeitem.COUPONESTORE_ID;

    console.log("delete back", COUPONESTORE_ID);

    const deletecoupone =  await deletecouponestore({COUPONESTORE_ID});

    
    callback();
  }
  const _handleUse= async() =>{


    const COUPONEDOC = couponeitem.COUPONEDOC;

   //COUPONMEMBER 에 ENABLE false
    const update = await updatcouponemember({COUPONEDOC});

    //COUPONESTORE 에 ENABLE false

    const update2 = await updatcouponestore({COUPONEDOC});

    couponeitem.ENABLE = false;

    alert("쿠폰이 사용 되었습니다");

    callback();



}


  useEffect(()=>{
    var min = 1000000000;
    var max = 2000000000;
    var rand =  min + (Math.random() * (max-min));
    setRand(Math.floor(rand));




  },[])

  const [reload, setReload] = useState(false);

  
  const navigate = useNavigate();


  return (
    <Container style={containerStyle} index={index}>
        {
            store == false ? (   
              <>
                <ItemView>
                  <ItemImageView>
                      <img src={imageDB.coupon} loading="lazy" style={{width:"100%", height:"170px"}}  />
                  </ItemImageView>

                  <ItemContentView>
                      <ItemDataView><ItemDateText>쿠폰 발급처 : {couponeitem.STORE_NAME}</ItemDateText></ItemDataView>
                      <ItemDataView><ItemDateText>쿠폰 금액: {CommaFormatted(couponeitem.COUPONEMONEY)+'원'}</ItemDateText></ItemDataView>
                      <ItemDataView><ItemDateText>발행일자: {getDateFullTime(couponeitem.REGISTDATE)}</ItemDateText></ItemDataView>
                      <ItemDataView><ItemDateText>일련번호: {couponeitem.COUPONEDOC}</ItemDateText></ItemDataView>
                      <ItemBarcodeView><BarcodeText>{rand}</BarcodeText></ItemBarcodeView>
                  </ItemContentView>

                </ItemView>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>

                {
                  couponeitem.ENABLE == true ?( <Tag><TagText>유효한 쿠폰</TagText></Tag>):
                  ( <DisableTag><TagText>사용할수 없는 쿠폰</TagText></DisableTag>)
                }
                </div>
               

              </> 
  
            ):(
              <>
                <ItemView2>
                <ItemImageView>
                      <img src={imageDB.coupon} loading="lazy" style={{width:"100%", height:"150px"}}  />
                </ItemImageView>
             
                <ItemContentView>
                  <ItemDataView><ItemDateText>사용자 : {couponeitem.USER_NICKNAME}</ItemDateText></ItemDataView>
                  <ItemDataView><ItemDateText>쿠폰 금액: {couponeitem.COUPONEMONEY}</ItemDateText></ItemDataView>
                  <ItemDataView><ItemDateText>발행일자: {getDateFullTime(couponeitem.REGISTDATE)}</ItemDateText></ItemDataView>
                  <ItemDataView><ItemDateText>일련번호: {couponeitem.COUPONEDOC}</ItemDateText></ItemDataView>
                  <ItemBarcodeView><BarcodeText>{rand}</BarcodeText></ItemBarcodeView>
                </ItemContentView> 
       
      
                </ItemView2>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                {
                  couponeitem.ENABLE == true ?( <Tag onClick={_handleUse}><TagText>사용가능 쿠폰</TagText></Tag>):
                  ( <DisableTag><TagText>사용불가 쿠폰</TagText></DisableTag>)
                }
                <DisableTag onClick={_handleDelete}><TagText>쿠폰 삭제</TagText></DisableTag>
                </div>

        
              </>


            )
        }
    </Container>
  );
}

export default CouponeItem;
