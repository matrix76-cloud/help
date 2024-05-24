import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { ArrayIncludeData, CommaFormatted, KeywordAddress, StartTimeCurrentTimeDiff, distanceFunc } from '../utility/common';
import Image from '../common/Image';
import { imageDB } from '../utility/imageData';
import { theme } from '../theme/theme';
import { UserContext } from '../context/User';
import { get_heartstore, get_storeinfoForSTOREID, updateheartoffstore, updateheartonstore } from '../service/StoreService';
import { get_review } from '../service/ReviewService';
import { LazyLoadImage } from "react-lazy-load-image-component";


const Container = styled.div`
`
const ProductContentView = styled.div`

    display:flex;
    flex-direction: column;
    background-color  : #FFF;
    padding :0px 2.5%;

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

  display:flex;
`

const ProductDescView= styled.div`
  flex-direction: row;
  display:flex;

  height:25px;
  flex-wrap: nowrap;
  width: 160px;
  text-align: left;
`

const ProductInfoView = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    height:30px;
    margin-top:5px;
`

const ProductPriceView = styled.div`
    display:flex; 
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
 
  
`

const ProductSubPriceView = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
    margin-top:25px;
`

const ProductHeartTag = styled.div`
    position: absolute;
    left: 125px;
    z-index: 2;
`
const CloseView = styled.div`
    position: absolute;
    width: 150px;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    background: #0000009e;
    border-radius:5px;
`
const CloseViewText = styled.span`
    color : #9f9d9d;
    font-family : ${({theme}) =>theme.REGULAR};
    font-size :12px;
`

const Recentshop = ({containerStyle, STORE}) => {
  const navigate = useNavigate();

  console.log("Recentshop", STORE);

  const {user, dispatch2} = useContext(UserContext);
  const [enable, setEnable]= useState(true);

  const [refresh, setRefresh] = useState(1);

  const [distance, setDistance] = useState('');
  const [reviewdata, setReviewdata] = useState({});

  const _handleStore = () =>{
    navigate("/store", { state: { STORE: STORE,  } });
  }

  const _handleHeart = async() =>{

    // heart 처리
    const USER_ID = user.uid;

    const storedata = STORE;
    const heart = await get_heartstore({storedata, USER_ID});

    const shopdata = STORE;
    if(heart == true){
        alert("찜처리 해제하였습니다");
        const update = await updateheartoffstore({shopdata, USER_ID});
    }else{
        alert("찜처리 하였습니다");
        const update = await updateheartonstore({shopdata, USER_ID});
    }


    async function fetchData(){

        const STORE_ID = STORE.STORE_ID;
        const shopdata = await get_storeinfoForSTOREID({STORE_ID});


        setRefresh(refresh => refresh +1);
    }
    fetchData();

  }
  useEffect(()=>{

    async function fetchData(){
      const STORE_ID = STORE.STORE_ID;
      const reviewdata = await get_review({STORE_ID});
      setReviewdata(reviewdata);
  }
  fetchData();

  },[refresh]);

  useEffect(()=>{
    const lat1 = user.latitude;
    const lon1 = user.longitude;
    const lat2 = STORE.STORELATITUDE;
    const lon2 = STORE.STORELONGITUDE;
    const dist= distanceFunc(lat1, lon1,lat2, lon2);



    setDistance(parseInt(dist));

    setEnable(
      StartTimeCurrentTimeDiff(STORE.STORESTARTTIME, STORE.STOREENDTIME)
    );
  }, []);

  return (
    <Container
      style={containerStyle}
      onClick={() => {
        _handleStore();
      }}
    >


      <img
        loading="lazy"
        decoding="async"
        data-src={imageDB.basic}
        src={STORE.STOREIMAGEARY[0]}
        style={{
          width: "120px",
          height: "120px",
          background: "#ededed",
          borderRadius: 10,
        }}
      ></img>

      <ProductContentView>
        <ProductNameView>
          <Text
            size={16}
            value={STORE.STORENAME}

          />
        </ProductNameView>
        <ProductInfoView>
          <ProductRegion>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={imageDB.NavigationImage}
                containerStyle={{
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
                Radius={false}
              />
              <Text
                size={10}
                value={
                  distance + "km · " + KeywordAddress(STORE.STOREADDR)
                }
                containerStyle={{
                  justifyContent: "flex-start",
                }}
                Radius={false}
              />
            </div>
          </ProductRegion>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <ProductReview>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>             
                    <Image source ={imageDB.ReviewImage} containerStyle={{width:"30px", display:"flex", justifyContent:"center"}} Radius={false}/>
                    <Text size={10} value={reviewdata.length} />
                    </div>
              
                </ProductReview>
                <ProductHeartview onClick={_handleHeart}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    {/* <Image source ={imageDB.HeartImage} containerStyle={{width:"30px", display:"flex", justifyContent:"center"}} Radius={false}/> */}

                    {ArrayIncludeData(STORE.HEARTUSER, user.uid) == true && (
                    <Image
                      source={imageDB.hearton}
                      containerStyle={{
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      Radius={false}
                    />
                  )}

                  {ArrayIncludeData(STORE.HEARTUSER, user.uid) == false && (
                    <Image
                      source={imageDB.heart}
                      containerStyle={{
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      Radius={false}
                    />
                  )}

                    <Text size={10} value={STORE.HEARTUSER == undefined ? (0):(STORE.HEARTUSER.length)} />
                    </div>
                </ProductHeartview>
          </div>
        </ProductInfoView>
    
        {/* <ProductPriceView>
          <Text size={14} value={STORE.STOREREPRESENTIVEPRICENAME} />
        </ProductPriceView> */}
        <ProductSubPriceView>
          {/* <Text size={14} value={storedata.STOREREPRESENTIVERATIO + '%'} color={theme.main} containerStyle={{fontWeight:700, width:"30px"}} />
              <Text size={14} value={CommaFormatted(storedata.STOREREPRESENTIVEPRICE) + '원'} color={theme.grey} containerStyle ={{textDecorationLine: "line-through", width:"70px"}} /> */}
          <Text
            size={15}
            value={
              CommaFormatted(STORE.STOREREPRESENTIVESALEPRICE) + "원"
            }
      
          />
        </ProductSubPriceView>
      </ProductContentView>
    </Container>
  );
}

export default Recentshop;
