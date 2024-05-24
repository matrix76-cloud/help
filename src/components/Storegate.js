import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
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
import Label from "../common/Label";
import { imageDB } from "../utility/imageData";
import Image from "../common/Image";
import {
  ArrayIncludeData,
  KeywordAddress,
  distanceFunc,
} from "../utility/common";
import { theme } from "../theme/theme";
import { UserContext } from "../context/User";
import {
  get_heartstore,
  get_storeinfoForSTOREID,
  updateheartoffstore,
  updateheartonstore,
} from "../service/StoreService";
import { get_review, get_reviews } from "../service/ReviewService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 50px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f9f9f9;
`;
const Box = styled.div`
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 1px 1px #ededed;
  width: 95%;
  margin: 2.5%;
  position: absolute;
  top: -50px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 10px;
`;

const ProductInfoView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 30px;
  margin-top: 5px;
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
const Prev = styled.div`
  display: none;
`;

const Storegate = ({ containerStyle, store, prevcallback, clickcallback }) => {
  const { user, dispatch2 } = useContext(UserContext);
  const [distance, setDistance] = useState("");
  const [storedata, setStoredata] = useState(store);
  const [refresh, setRefresh] = useState((refresh) => refresh + 1);

  const [heart, setHeart] = useState(false);
  const [heartsu, setHeartSu] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const lat1 = user.latitude;
      const lon1 = user.longitude;
      const lat2 = store.STORELATITUDE;
      const lon2 = store.STORELONGITUDE;
      const dist = distanceFunc(lat1, lon1, lat2, lon2);
      setDistance(parseInt(dist));

      // const STORE_ID = store.STORE_ID;
      // const reviews = await get_review({ STORE_ID });
      // setReviewitems(reviews);
    }
    fetchData();
  }, []);

  useLayoutEffect(()=>{
    const USER_ID  = user.uid;
    setHeartSu(storedata.HEARTUSER.length);

    console.log("storedata.HEARTUSER", storedata.HEARTUSER, user );

    const FindIndex = storedata.HEARTUSER.findIndex(x=>x == USER_ID);
    
    let heart = false;
    if(FindIndex != -1){
      console.log("heart가 포함되어 있다");
      heart = true;
      setHeart(heart);
    }else{
      heart = false;
      setHeart(heart);
    }

    setRefresh((refresh) => refresh +1);

  }, [])



  const _handlePrev = () => {
    prevcallback();
  };

  const _handleHeart = async () => {
    // heart 처리
    const USER_ID = user.uid;

    const shopdata = storedata;

    console.log("Heart", storedata.HEARTUSER, USER_ID);

    if ( ArrayIncludeData(storedata.HEARTUSER, USER_ID) == true) {
      alert("찜처리 해제하였습니다");
      const update = await updateheartoffstore({ shopdata, USER_ID });

      const FindIndex = storedata.HEARTUSER.findIndex(x=>x == USER_ID);
      storedata.HEARTUSER.splice(FindIndex, 1);  

      console.log("storedata.HEARTUSER", storedata.HEARTUSER);

      
      clickcallback(update);
    } else {
      alert("찜처리 하였습니다");
      const update = await updateheartonstore({ shopdata, USER_ID });
      storedata.HEARTUSER.push(USER_ID);

      console.log("storedata.HEARTUSER", storedata.HEARTUSER);
      
      clickcallback(update);
    }


    async function FetchData() {
      const STORE_ID = storedata.STORE_ID;
      let FindIndex = user.premiumshoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

      if(FindIndex != -1){
        user.premiumshoplist[FindIndex].checks = storedata.checks;
        user.premiumshoplist[FindIndex].reviewdata = storedata.reviewdata;
        user.premiumshoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;

        user["premiumshoplist"] = user.premiumshoplist;

        console.log("Storedata", storedata);
      }


      FindIndex = user.goldshoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

      if(FindIndex != -1){
        user.goldshoplist[FindIndex].checks = storedata.checks;
        user.goldshoplist[FindIndex].reviewdata = storedata.reviewdata;
        user.goldshoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;

        
        user["goldshoplist"] = user.goldshoplist;


        console.log("Storedata", storedata);
      }


      FindIndex = user.silvershoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

      if(FindIndex != -1){
        user.silvershoplist[FindIndex].checks = storedata.checks;
        user.silvershoplist[FindIndex].reviewdata = storedata.reviewdata;
        user.silvershoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;

              
        user["silvershoplist"] = user.silvershoplist;

        console.log("Storedata", storedata);
      }



      dispatch2(user);


      
      setStoredata(storedata);
      setRefresh((refresh) => refresh +1);
     
      setHeartSu(storedata.HEARTUSER.length);


    }

    FetchData();


  };

  useEffect(() => {
    const handleHeader = () => {
      if (window.scrollY > 40 && window.scrollY < 50) {
      } else if (window.scrollY > 220) {

        if (document.getElementById("gate")) {
            document.getElementById("gate").style.width = "100%";
            document.getElementById("gate").style.margin = "0px";
            document.getElementById("gate").style.height = "90px";
        }

        if (document.getElementById("info")) {
          document.getElementById("info").style.display = "none";
        }
        if (document.getElementById("prev")) {
          document.getElementById("prev").style.display = "flex";
        }


   
      } else {
        if (document.getElementById("gate")) {
            document.getElementById("gate").style.width = "95%";
            document.getElementById("gate").style.margin = "2.5%";
            document.getElementById("gate").style.height = "90px";
        }
        if (document.getElementById("info")) {
          document.getElementById("info").style.display = "flex";
        }
    
        if (document.getElementById("prev")) {
          document.getElementById("prev").style.display = "none";
        }
    
      }
    };

    window.addEventListener("scroll", handleHeader);

    return () => {
      window.removeEventListener("scroll", handleHeader);
    };
  }, []);



  return (
    <Container style={containerStyle}>
      <Box id="gate">
        <div style={{ display: "flex", flexDirection: "row", paddingLeft: 15 }}>
          <Prev id="prev" onClick={_handlePrev}>
            <Image
              source={imageDB.prev}
              containerStyle={{ width: "20px", height: "22px", paddingTop: 3 }}
            />
          </Prev>
          <Label
            content={storedata.STORENAME}
            fontweight={700}
            containerStyle={{
              paddingLeft: 10,
              fontSize: 20,
              height: 27,
              display: "flex",
              alignItems: "center",
            }}
            callback={() => {}}
          />
        </div>

        <div id="info" style={{ marginTop: 5, height: 20 }}>
          <Text
            value={storedata.STOREDESC}
            color={"#000"}
            size={13}
            containerStyle={{ paddingLeft: 10, heidht: 20 }}
          />
        </div>

        <ProductInfoView id="infoview">
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
                size={12}
                value={distance + "km"}
                containerStyle={{
                  justifyContent: "flex-start",
                }}
                Radius={false}
              />
            </div>
          </ProductRegion>

          <Text value={"|"} containerStyle={{ width: "10px" }} />
          <ProductRegion>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={imageDB.Address}
                containerStyle={{
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
                Radius={false}
              />
              <Text
                size={12}
                value={KeywordAddress(storedata.STOREADDR)}
                containerStyle={{
                  justifyContent: "flex-start",
                }}
                Radius={false}
              />
            </div>
          </ProductRegion>

          <Text value={"|"} containerStyle={{ width: "10px" }} />

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

          <Text value={"|"} containerStyle={{ width: "10px" }} />

          <ProductHeartview onClick={_handleHeart}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            {ArrayIncludeData(storedata.HEARTUSER, user.uid) == true ?(
                <Image
                  source={imageDB.hearton}
                  containerStyle={{
                    width: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  Radius={false}
                />
              ) : (
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
              <Text size={10} value={heartsu} />
            </div>
          </ProductHeartview>
        </ProductInfoView>
      </Box>
    </Container>
  );
};

export default Storegate;
