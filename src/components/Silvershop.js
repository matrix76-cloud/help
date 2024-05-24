import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Text from "../common/Text";
import {
  ArrayIncludeData,
  CommaFormatted,
  KeywordAddress,
  StartTimeCurrentTimeDiff,
  distanceFunc,
  useSleep,
} from "../utility/common";
import Image from "../common/Image";
import { imageDB } from "../utility/imageData";
import { theme } from "../theme/theme";
import { UserContext } from "../context/User";
import {
  get_heartstore,
  get_storeinfoForSTOREID,
  updateheartoffstore,
  updateheartonstore,
} from "../service/StoreService";
import { get_review } from "../service/ReviewService";

const Container = styled.div``;
const ProductContentView = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0px 2.5%;
`;

const ProductRegion = styled.div`
  display: flex;
`;
const ProductReview = styled.div`
  display: flex;
`;
const ProductHeartview = styled.div`
  display: flex;
`;

const ProductNameView = styled.div`
  flex-direction: row;
  height: 25px;
  display: flex;
  margin-top: 5px;

  display: flex;
`;

const ProductDescView = styled.div`
  flex-direction: row;
  display: flex;

  height: 25px;
  flex-wrap: nowrap;
  width: 160px;
  text-align: left;
`;

const ProductInfoView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 30px;
  margin-top: 5px;
`;

const ProductPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 25px;
`;

const ProductSubPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
`;

const ProductHeartTag = styled.div`
  position: absolute;
  left: 125px;
  z-index: 2;
`;
const CloseView = styled.div`
  position: absolute;
  width: 150px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 155px;
  background: #0000009e;
  border-radius: 5px;
`;
const CloseViewText = styled.span`
  color: #9f9d9d;
  font-family: ${({ theme }) => theme.REGULAR};
  font-size: 12px;
`;

const Silvershop = ({ containerStyle, shopdata }) => {
  const navigate = useNavigate();

  const { user, dispatch2 } = useContext(UserContext);
  const [enable, setEnable] = useState(true);

  const [refresh, setRefresh] = useState(1);
  const [storedata, setStoredata] = useState(shopdata);
  const [distance, setDistance] = useState("");
  const [reviewdata, setReviewdata] = useState({});
  const [heart, setHeart] = useState(false);

  const [heartuser, setHeartuser] = useState([]);
  
  const _handleStore = (STORE_ID) => {
     user["homeref"] = window.scrollY;
     dispatch2(user);
   navigate("/store", {
     state: { STORE: storedata },
   });
  };

  useEffect(() => {
    setStoredata(storedata);
    setHeart(heart);
    
  },[refresh])




  const _handleHeart = async () => {
    // heart 처리

    const USER_ID = user.uid;

    if (USER_ID == '') {

      alert("로그인이 필요한 기능입니다");
      return;
    }
    const heart_ = await get_heartstore({ storedata, USER_ID });

    setHeart(heart_);

    const shopdata = storedata;
    if (heart_ == true) {
      const update = await updateheartoffstore({ shopdata, USER_ID });
      alert("찜처리 해제하였습니다");
    } else {
     const update = await updateheartonstore({ shopdata, USER_ID });
      alert("찜처리 하였습니다");


    }


    // async function FetchData() {
    //   const STORE_ID = storedata.STORE_ID;
    //   let FindIndex = user.premiumshoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

    //   if(FindIndex != -1){
    //     user.premiumshoplist[FindIndex].checks = storedata.checks;
    //     user.premiumshoplist[FindIndex].reviewdata = storedata.reviewdata;
    //     user.premiumshoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;

    //     user["premiumshoplist"] = user.premiumshoplist;

     
    //   }


    //   FindIndex = user.goldshoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

    //   if(FindIndex != -1){
    //     user.goldshoplist[FindIndex].checks = storedata.checks;
    //     user.goldshoplist[FindIndex].reviewdata = storedata.reviewdata;
    //     user.goldshoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;

        
    //     user["goldshoplist"] = user.goldshoplist;


    //   }


    //   FindIndex = user.silvershoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

    //   if(FindIndex != -1){
    //     user.silvershoplist[FindIndex].checks = storedata.checks;
    //     user.silvershoplist[FindIndex].reviewdata = storedata.reviewdata;
    //     user.silvershoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;

              
    //     user["silvershoplist"] = user.silvershoplist;

    //     console.log("Storedata", storedata);
  
    //   }

    //   dispatch2(user);

    //   setStoredata(storedata);

    //   setRefresh((refresh) => refresh + 1);
    // }



    // FetchData();


  };

  useEffect(() => {

    async function FetchData(){
      const STORE_ID = storedata.STORE_ID;

      const shopdata = await get_storeinfoForSTOREID({STORE_ID});

      console.log("silvershop", shopdata);

      setHeartuser(shopdata.HEARTUSER);
      setRefresh((refresh) => refresh +1);

    }
    FetchData();

  },[heartuser]);

  useEffect(() => {
    const lat1 = user.latitude;
    const lon1 = user.longitude;
    const lat2 = storedata.STORELATITUDE;
    const lon2 = storedata.STORELONGITUDE;
    const dist = distanceFunc(lat1, lon1, lat2, lon2);

    setDistance(parseInt(dist));

    setEnable(
      StartTimeCurrentTimeDiff(storedata.STORESTARTTIME, storedata.STOREENDTIME)
    );
  }, []);

  return (
    <Container style={containerStyle}>


      {enable == false ? (
        <>
          <CloseView
            onClick={() => {
              _handleStore(storedata.STORE_ID);
            }}
          >
            <CloseViewText>
              영업시간은 {storedata.STORESTARTTIME}부터입니다
            </CloseViewText>
          </CloseView>
        </>
      ) : null}

      <img
        onClick={() => {
          _handleStore(storedata.STORE_ID);
        }}
        src={storedata.STOREIMAGEARY[0]}
        style={{ width: "150px", height: "170px", borderRadius: 10 }}
      ></img>
      <ProductContentView
        onClick={() => {
          _handleStore(storedata.STORE_ID);
        }}
      >
        <ProductNameView>
          <Text
            size={16}
            value={storedata.STORENAME}
            containerStyle={{ fontWeight: 700 }}
          />
        </ProductNameView>
        <ProductDescView>
          <Text size={12} value={storedata.STOREDESC} color={theme.grey} />
        </ProductDescView>
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
                value={distance + "km · " + KeywordAddress(storedata.STOREADDR)}
                containerStyle={{
                  width: "140px",
                  justifyContent: "flex-start",
                }}
                Radius={false}
              />
            </div>
          </ProductRegion>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <ProductReview>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={imageDB.ReviewImage}
                  containerStyle={{
                    width: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  Radius={false}
                />
                <Text size={10} value={storedata.reviewdata.length} />
              </div>
            </ProductReview>
            <ProductHeartview
              onClick={(event) => {
                event.stopPropagation();
                _handleHeart();
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {ArrayIncludeData(storedata.HEARTUSER, user.uid) == true && (
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

                {ArrayIncludeData(storedata.HEARTUSER, user.uid) == false && (
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
                <Text
                  size={10}
                  value={
                    heartuser == undefined
                      ? 0
                      : heartuser.length
                  }
                />
              </div>
            </ProductHeartview>
          </div>
        </ProductInfoView>
        <ProductPriceView>
          <Text size={14} value={storedata.STOREREPRESENTIVEPRICENAME} />
        </ProductPriceView>
        <ProductSubPriceView>
          <Text
            size={14}
            value={storedata.STOREREPRESENTIVERATIO + "%"}
            color={theme.main}
            containerStyle={{ fontWeight: 700, width: "30px" }}
          />
          <Text
            size={14}
            value={CommaFormatted(storedata.STOREREPRESENTIVEPRICE) + "원"}
            color={theme.grey}
            containerStyle={{
              textDecorationLine: "line-through",
              width: "70px",
            }}
          />
          <Text
            size={15}
            value={CommaFormatted(storedata.STOREREPRESENTIVESALEPRICE) + "원"}
            containerStyle={{ fontWeight: "700" }}
          />
        </ProductSubPriceView>
      </ProductContentView>
    </Container>
  );
};

export default Silvershop;
