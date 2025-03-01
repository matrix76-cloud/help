import React,{useState, useEffect, Fragment, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useNavigation} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { ArrayIncludeData, CommaFormatted, KeywordAddress, StartTimeCurrentTimeDiff, distanceFunc } from '../utility/common';
import Image from '../common/Image';
import { imageDB } from '../utility/imageData';
import { theme } from '../theme/theme';
import { UserContext } from '../context/User';
import { get_heartstore, get_storeinfoForSTOREID, updateheartoffstore, updateheartonstore } from '../service/StoreService';
import { get_review } from '../service/ReviewService';
import { get_checkuser } from '../service/CheckService';

const Container = styled.div`

`
const ProductContentView = styled.div`
    display:flex;
    flex-direction: column;
    background-color  : #FFF;
`

const ProductRegion = styled.div`
  display:flex;
`
const ProductReview = styled.div`
  display:flex;
`
const ProductHeartview = styled.div`
  display:flex;
`

const ProductNameView= styled.div`
  flex-direction: row;
  height:25px;
  display:flex;
  margin-top:5px;
  padding-left:5px;
  display:flex;
`

const ProductDescView= styled.div`
  flex-direction: row;
  display:flex;
  padding-left:5px;
  height:25px;
`


const ProductPriceView = styled.div`
    display:flex; 
    flex-direction:row;
    justify-content:flex-end;
    align-items:flex-start;
    margin-top:5px;
  
`
const ProductInfoView = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
    height:30px;
    margin-top:5px;
`
const ProductOptionView = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
    height:30px;
    margin-top:5px;
`

const ProductSubPriceView = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:flex-end;
    margin-top:5px;
    margin-bottom:20px;
`


const TagView = styled.div`
    position: absolute;
    width :97%;
    z-index :2;
    justify-content:  flex-start;
    align-items:flex-start;
    left:10px;
    height :100px;
    flex-wrap : wrap;
    flex-direction:row;
    display:flex;
`
const TagView2 = styled.div`
    background-color :  ${({bgcolor}) => bgcolor};
    height :30px;
    margin-right:5px;
    border-radius : 5px;
    width:50px;
    justify-content:  center;
    align-items:center;
    margin-top:5px;
    display:flex;
    
`
const TagViewText = styled.span`
    color : #fff;
    font-family : Pretendard-Bold;
    font-size :12px;
`
const ProductTagView = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap : wrap;
    width:100%;
`
const ProductTag = styled.div` 
    background-color  : #ff4e19cc;
    height : 25px;
    padding : 0px 5px;
    margin-right: 3px;
    align-items: center;
    justify-content:center;
    display : flex;
    border-radius :5px;
    margin-bottom :2px;
`
const ProductTagText = styled.span`
  font-size:9.5px;
  font-family : Pretendard-Bold;
  color  : ${({color})=>color};
`
const ProductTagText2 = styled.span`
  font-size:14px;
  font-family : Pretendard-Bold;
  color  : ${({color})=>color};
`

const ProductPlusTag = styled.div`
    height : 25px;
    margin-right: 5px;
    align-items: center;
    justify-content:center;
    margin-bottom :2px;
    display : flex;
`
const ProductHeartTag = styled.div`
    position :absolute;
    right :30px;
    top:5px;
`
const GeneralChatoption = styled.div`
    padding: 2px 8px;
    font-size: 12px;
    background: #b418ec;
    display: flex;
    color: #fff;
    border-radius: 5px;
    margin-right: 5px;
`

const GroupChatoption = styled.div`
    padding: 2px 8px;
    font-size: 12px;
    background: #b09b06;
    display: flex;
    color: #fff;
    border-radius: 5px;
    margin-right: 5px;
`
const Checkoption = styled.div`
    padding: 2px 8px;
    font-size: 12px;
    background: #1850ec;
    display: flex;
    color: #fff;
    border-radius: 5px;
    margin-right: 5px;
`

const CloseView = styled.div`
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 15px;
    margin-top: 5px;
`
const CloseViewText = styled.span`
    color : #9f9d9d;
    font-family : ${({theme}) =>theme.REGULAR};
    font-size :18px;
`


const Mapshop = ({containerStyle, shopdata, simple, callback}) => {

 const navigate = useNavigate();
 const {user, dispatch2} = useContext(UserContext);
 const [enable, setEnable]= useState(true);
 const [refresh, setRefresh] = useState(1);
 const [storedata, setStoredata] = useState(shopdata);
 const [reviewdata, setReviewdata] = useState({});
 const [checks, setChecks] = useState([]);
 const [distance, setDistance] = useState('');


 const _handleClose = ()=>{
    callback();
 }

 const _handleHeart = async() =>{

    // heart 처리
    const USER_ID = user.uid;
    const heart = await get_heartstore({storedata, USER_ID});

    const shopdata = storedata;
    if(heart == true){
        alert("찜처리 해제하였습니다");

        const update = await updateheartoffstore({shopdata, USER_ID});
    }else{
        alert("찜처리 하였습니다");
   
        const update = await updateheartonstore({shopdata, USER_ID});
    }


    async function fetchData(){

        const STORE_ID = storedata.STORE_ID;
        const shopdata = await get_storeinfoForSTOREID({STORE_ID});
        setStoredata(shopdata);
        setRefresh(refresh => refresh +1);
    }
    fetchData();



 }
 const _handleStore = (STORE_ID) =>{
    navigate("/store",{state:{STORE:storedata}});
 }

 useEffect(()=>{

    async function fetchData(){
        const STORE_ID = storedata.STORE_ID;
        const reviewdata = await get_review({STORE_ID});
        storedata["reviewdata"] =reviewdata;


        const USER_ID = storedata.USER_ID;
        const checks = await get_checkuser({USER_ID});

        storedata["checks"] =checks;

        setChecks(checks);
        setReviewdata(reviewdata);

        setStoredata(storedata);
    }
    fetchData();
 },[]);



 useEffect(()=>{
    const lat1 = user.latitude;
    const lon1 = user.longitude;
    const lat2 = storedata.STORELATITUDE;
    const lon2 = storedata.STORELONGITUDE;
    const dist= distanceFunc(lat1, lon1,lat2, lon2);
    setDistance(parseInt(dist));
    setEnable(StartTimeCurrentTimeDiff(shopdata.STORESTARTTIME,shopdata.STOREENDTIME));
  }, []);


  return (
    <Container style={containerStyle}>
        {simple != true && <TagView>
            {
                  storedata.STOREFILTER.map((data, index)=>(
               
                   <TagView2 bgcolor ={'#00000099'} key={index}>
                        
                      {
                             data =='korea' && (<TagViewText>한국</TagViewText>)
                      }    
                      {
                             data =='china' && (<TagViewText>중국</TagViewText>)
                      }    
                      {
                             data =='tileland' && (<TagViewText>태국</TagViewText>)
                      } 
                      {
                             data =='oneshop' && (<TagViewText>1인샵</TagViewText>)
                      }  
                      {
                             data =='wacksing' && (<TagViewText>왁싱</TagViewText>)
                      }  
                      {
                             data =='meridian' && (<TagViewText>경락</TagViewText>)
                      }      
                      {
                             data =='sports' && (<TagViewText>스포츠</TagViewText>)
                      }        
                      {
                             data =='aroma' && (<TagViewText>아로마</TagViewText>)
                      }   
                      {
                             data =='swedish' && (<TagViewText>스웨디시</TagViewText>)
                      }  
                      {
                             data =='foot' && (<TagViewText>발마사지</TagViewText>)
                      } 
                   </TagView2>
              
                
                  ))
            }
            <ProductHeartTag>
            {
                ArrayIncludeData(storedata.HEARTUSER,user.uid)  == true ? (<Image source ={imageDB.hearton} containerStyle={{width:30}}/>) :(<Image source ={imageDB.heart} containerStyle={{width:30}}/>) 
            }  
            </ProductHeartTag>
        </TagView>  }
    
        <CloseView onClick={_handleClose}>
            <Image source={imageDB.close} containerStyle={{width:"15px", height:"15px"}}/>
        </CloseView>
    

        <div style={{backgroundColor:"#FFF", display:"flex", flexDirection:"row"}}>
            <img  onClick={()=>{_handleStore(storedata.STORE_ID)}} src={storedata.STOREIMAGEARY[0]} style={{width:"30%", height:"100px", padding:"10px", borderRadius:"15px"}}></img>

            <ProductContentView>
                <ProductNameView>
                    <Text size={17} value={storedata.STORENAME} containerStyle={{fontWeight:700}} />
                </ProductNameView>
                <ProductInfoView>
                    <ProductRegion>
                        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Image source ={imageDB.NavigationImage} containerStyle={{width:"30px", display:"flex", justifyContent:"center"}} Radius={false}/>
                        <Text size={12} value ={distance + 'km · ' + KeywordAddress(storedata.STOREADDR)} containerStyle={{width:"140px",justifyContent:"flex-start"}} Radius={false} />
                        </div>
                    </ProductRegion>

            
                    
                </ProductInfoView>    
                <ProductPriceView>
                    <Text size={12} value={storedata.STOREREPRESENTIVEPRICENAME} />
                </ProductPriceView>
                <ProductSubPriceView>
                    <Text size={14} value={storedata.STOREREPRESENTIVERATIO + '%'} color={theme.main} containerStyle={{fontWeight:700, width:"30px"}} />
                    <Text size={14} value={CommaFormatted(storedata.STOREREPRESENTIVEPRICE) + '원'} color={theme.grey} containerStyle ={{textDecorationLine: "line-through", width:"70px"}} />
                    <Text size={14} value={CommaFormatted(storedata.STOREREPRESENTIVESALEPRICE) + '원'} containerStyle ={{ fontWeight:"700"}} />
                </ProductSubPriceView>
            </ProductContentView>
        </div>



    </Container>
  );
}

export default Mapshop;
