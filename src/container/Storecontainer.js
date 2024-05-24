import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";

import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
  unstable_HistoryRouter,
} from "react-router-dom";
import styled from "styled-components";
import Label from "../common/Label";
import { imageDB } from "../utility/imageData";
import Image from "../common/Image";
import Text from "../common/Text";
import { theme } from "../theme/theme";
import { useSleep } from "../utility/common";
import Loading from "../common/Loading";
import {
  get_storeinfoForSTOREID,
  get_storeviewcheck,
  regist_storeview,
} from "../service/StoreService";
import Storegate from "../components/Storegate";
import Storemain from "../components/Storemain";
import Storeintroduce from "../components/Storeintroduce";
import Storeevent from "../components/Storeevent";
import Storefee from "../components/Storefee";
import Storethema from "../components/Storethema";
import Storecheck from "../components/Storecheck";
import Storeguide from "../components/Storeguide";
import Storeposition from "../components/Storeposition";
import Storeowner from "../components/Storeowner";
import Storereview from "../components/Storereview";
import Storebutton from "../components/Storebutton";
import Storetopbutton from "../components/Storetopbutton";
import Storeimageaccessory from "../components/Storeimageaccessory";
import { UserContext } from "../context/User";


const Container = styled.div`
  height: 100%;
  margin-bottom: 70px;

`;
const FilterContainer = styled.div`
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #000;
  position: sticky;
  top: 50px;
  padding: 0px 10px;
`;
const TrendingXScroll = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: row;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow-x: auto;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StoreTypeName = styled.div`
  display: flex;
  margin-right: 10px;
  width: max-content;
  height: 40px;
  font-weight: 600;
  border-bottom: ${({ contenttype, type }) =>
    contenttype === type ? "3px solid #000" : "null"};
`;

const StoreTypeText = styled.a`
  font-size: 15px;
  justify-content: center;
  color: #000;
  display: flex;
  align-items: center;
`;

const EmptyRow = styled.div`
  background-color: #f7f7f7;
  height: 5px;
`;

const Storecontainer = ({ containerStyle, STORE, REFRESH }) => {
  const { user, dispatch2 } = useContext(UserContext);

  const [refresh, setRefresh] = useState(1);


  const navigation = useNavigate();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(STORE);
  const [contenttype, setContenttype] = useState("");

  const handleIntroduce = () => {};
  const handleEvent = () => {};
  const handlePrice = () => {};
  const handleGuide = () => {};
  const handleReview = () => {};
  const handleCheck = () => {};
  const handlePosition = () => {};
  const handleThema = () => {};
  const handleOwner = () => {};




  const topcallback = () => {
    window.scrollTo(0, 0);
  };
  const prevcallback = () => {
      navigation(-1);

  };
  const homecallback = () => {

    navigation("/home");

  };

  const heartcallback = (type) => {



  };

  useEffect(() => {
    setStore(store);


  },[refresh])

  useLayoutEffect(() => {


    // 최근 본 뷰를 넣기위해 데이타베이스에 넣고 로컬 스토리지에 값을 넣자

    //1. 데이타 베이스에 넣자


   getstoreview().then((result) => {
     // 포함되어 있지 않다면 데이타 베이스에 포함 시키고
     if (result == 0) {
       const USER_SESSION = user.uid;

       registstoreview().then((result) => {
         let storeviewlist = user.storeviewlist;
         storeviewlist.push(store);
         user["storeviewlist"] = storeviewlist;

         dispatch2(user);
       });
     }
   });



    window.scrollTo(0,0);
     return () => {
    };
  },[])


  const getstoreview = async () => {
    let storeviewlist = [];
    const deviceid = user.deviceid;
    const STORE_ID = STORE.STORE_ID;
    storeviewlist = await get_storeviewcheck({ STORE_ID, deviceid });

    return new Promise((resolve, reject) => {

      resolve(storeviewlist.length);
    });
  };

  const registstoreview = async () => {
    const deviceid = user.deviceid;

    const storeaddview = await regist_storeview({ STORE, deviceid });
    return new Promise((resolve, reject) => {
      resolve(0);
    });
  };

  async function _scrollTo(selector, yOffset = 0) {
    var elementPosition = document.getElementById(selector).offsetTop;

    window.scrollTo({
      top: elementPosition - 120, //add your necessary value
      behavior: "smooth", //Smooth transition to roll
    });
  }

  return (
    <Container style={containerStyle}>
      <div>
        <Storeimageaccessory
          store={store}
          prevcallback={prevcallback}
          homecallback={homecallback}
          clickcallback={heartcallback}
        />
        <Image
          source={store.STOREIMAGEARY[0]}
          Radius={false}
          imgWidth={"100%"}
          imgHeight={"240px"}
        />
        <Storegate
          store={store}
          prevcallback={homecallback}
          clickcallback={heartcallback}
        />

        <Storemain store={store} />
        <FilterContainer>
          <TrendingXScroll horizontal showsHorizontalScrollIndicator={false}>
            <Row>
              <StoreTypeName
                contenttype={contenttype}
                type={"owner"}
                onClick={() => {
                  handleOwner();
                  setContenttype("owner");
                  _scrollTo("owner", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"owner"}>
                  {"사장님말씀"}
                </StoreTypeText>
              </StoreTypeName>
              <StoreTypeName
                contenttype={contenttype}
                type={"introduce"}
                onClick={() => {
                  handleIntroduce();
                  setContenttype("introduce");
                  _scrollTo("introduce", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"introduce"}>
                  {"매장소개"}
                </StoreTypeText>
              </StoreTypeName>
              <StoreTypeName
                contenttype={contenttype}
                type={"event"}
                onClick={() => {
                  handleEvent();
                  setContenttype("event");
                  _scrollTo("event", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"event"}>
                  {"이벤트"}
                </StoreTypeText>
              </StoreTypeName>

              <StoreTypeName
                contenttype={contenttype}
                type={"price"}
                onClick={() => {
                  handlePrice();
                  setContenttype("price");
                  _scrollTo("price", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"price"}>
                  {"요금"}
                </StoreTypeText>
              </StoreTypeName>
              <StoreTypeName
                contenttype={contenttype}
                type={"guide"}
                onClick={() => {
                  handleGuide();
                  setContenttype("guide");
                  _scrollTo("guide", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"guide"}>
                  {"이용안내"}
                </StoreTypeText>
              </StoreTypeName>
              <StoreTypeName
                contenttype={contenttype}
                type={"position"}
                onClick={() => {
                  handlePosition();
                  setContenttype("position");
                  _scrollTo("position", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"position"}>
                  {"매장위치"}
                </StoreTypeText>
              </StoreTypeName>
              <StoreTypeName
                contenttype={contenttype}
                type={"thema"}
                onClick={() => {
                  handleThema();
                  setContenttype("thema");
                  _scrollTo("thema", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"thema"}>
                  {"시설테마"}
                </StoreTypeText>
              </StoreTypeName>
              <StoreTypeName
                contenttype={contenttype}
                type={"check"}
                onClick={() => {
                  handleCheck();
                  setContenttype("check");
                  _scrollTo("check", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"check"}>
                  {"관리사출근부"}
                </StoreTypeText>
              </StoreTypeName>
              <StoreTypeName
                contenttype={contenttype}
                type={"review"}
                onClick={() => {
                  handleReview();
                  setContenttype("review");
                  _scrollTo("review", 0);
                }}
              >
                <StoreTypeText contenttype={contenttype} type={"review"}>
                  {"후기"}
                </StoreTypeText>
              </StoreTypeName>

              <StoreTypeName
                contenttype={contenttype}
                type={"  "}
                activeOpacity={0.8}
              >
                <StoreTypeText contenttype={contenttype} type={""}>
                </StoreTypeText>
              </StoreTypeName>
            </Row>
          </TrendingXScroll>
        </FilterContainer>

        <div id="owner"></div>
        <Storeowner store={store} />
        <EmptyRow />

        <div id="introduce"></div>
        <Storeintroduce store={store} />
        <EmptyRow />

        <div id="event"></div>
        <Storeevent store={store} customer = {true} />
        <EmptyRow />

        <div id="price"></div>
        <Storefee store={store} />
        <EmptyRow />

        <div id="guide"></div>
        <Storeguide store={store} />
        <EmptyRow />

        <div id="position"></div>
        <Storeposition store={store} />
        <EmptyRow />

        <div id="thema"></div>
        <Storethema store={store} />
        <EmptyRow />

        <div id="check"></div>
        <Storecheck store={store} />
        <EmptyRow />

        <div id="review"></div>
        <Storereview store={store} />

        <Storebutton store={store} />

        <Storetopbutton callback={topcallback} />
      </div>
    </Container>
  );
};

export default Storecontainer;
