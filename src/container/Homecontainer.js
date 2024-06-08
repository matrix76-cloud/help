import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import {
  HashRouter,
  Route,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Swipe from "../common/Swipe";
import { get_banner1, get_banner2 } from "../service/BannerService";
import ImageButton from "../common/ImageButton";
import { imageDB } from "../utility/imageData";
import Text from "../common/Text";
import styled from "styled-components";
import Categoryfilter from "../components/Categoryfilter";
import Switch from "../common/Switch";
import Themafilter from "../components/Themafilter";
import Label from "../common/Label";
import MoreButton from "../common/MoreButton";
import Halfshop from "../components/Halfshop";
import {
  get_storeallview,
  get_storeinfoForSTOREID,
  get_stores,
} from "../service/StoreService";
import Premiumshop from "../components/Premiumshop";
import Goldshop from "../components/Goldshop";
import Silvershop from "../components/Silvershop";
import Checkfilter from "../components/Checkfilter";
import Column from "../common/Column";
import Loading from "../common/Loading";
import CategorySubfilter from "../components/CategorySubfilter";
import InitAlert from "../common/InitAlert";
import { get_popup, update_popupcheck } from "../service/PopupService";
import StoreInfo from "../components/Storeinfo";
import { UserContext } from "../context/User";
import { get_userInfoForDevice, login } from "../service/UserService";
import {
  SearchAddress,
  convertSearchcategory,
  convertSearchtag,
  convertSearchthema,
  distanceFunc,
  useSleep,
} from "../utility/common";
import {
  PreferenceFilterArySearch,
  PriceFilterArySearch,
  TagFilterSearch,
  ThemaFilterArySearch,
  ThemaFilterSearch,
} from "../service/SearchService";
import Empty from "../common/Empty";
import Progress from "../common/Progress";
import { FiAlertCircle } from "react-icons/fi";
import UseScrollRestoration from "../components/UseScrollRestoration";
import Shop from "../components/Shop";
import AdvertiseModalEx from "../components/AdvertiseModalEx";
import moment from "moment";


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
`;
const Emptyline = styled.div`
  background-color: #ededed;
  height: 5px;
`;

const TrendingYScroll = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const TrendingXScroll = styled.div`
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const FilterResultSearch = styled.div`
  background-color: #ff4e19;
  padding: 5px 5px;
  border-radius: 3px;
  margin-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;
const FilterMainSearch = styled.div`
  background-color: #19a8ff;
  padding: 5px 5px;
  border-radius: 3px;
  margin-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const FilterResultText = styled.span`
  font-size: 11px;
  color: #fff;
  font-weight: 600;
  margin-left: 3px;
`;

const Homecontainer = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const scrollPositions = useRef({});

  const [render, setRender] = useState(1);
  
  const { user, dispatch2 } = useContext(UserContext);
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");

  const [advertiseclose, setAdvertiseclose] = useState(false);
  const [checkadvertiseclose, setCheckadvertiseclose] = useState(false);
  const [popupitem, setPopupitem] = useState({});

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [refreshpos, setRefreshpos] = useState(1);
  
  const [bannerimgs, setBannerimgs] = useState([]);
  const [banner2imgs, setBanner2imgs] = useState([]);
  const [switchcheck, setSwitchcheck] = useState(false);
  const [storeviewitems, setStoreviewitems] = useState([]);
  const [storerecentitems, setStorerecentitems] = useState([]);
  const [premium, setPremium] = useState(false);
  const [premiumshops, setPremiumshops] = useState([]);
  const [gold, setGold] = useState(false);
  const [goldshops, setGoldshops] = useState([]);
  const [silver, setSilver] = useState(false);
  const [silvershops, setSilvershops] = useState([]);

  const [ypos, setYpos] = useState(0);

  const [shopcount, setShopcount] = useState(0);

  const [themafiltervalue, setThemafiltervalue] = useState([]);
  const [preferencefiltervalue, setPreferencefiltervalue] = useState([]);
  const [pricefiltervalue, setPricefiltervalue] = useState([]);

  const [filterinitialize, setFilterinitialize] = useState(false);
  const [ref, setRef] = useState(null);

  const [searching, setSearching] = useState(false);

  const [searchcategory, setSearchcategory] = useState("");
  const [searchthema, setSearchThema] = useState("");

  const [scrollY, setScrollY] = useState(0);

  const [advertise, setAdvertise] = useState(true);

  const Switchcallback = (data) => {
    setSwitchcheck(data);

    setRefresh((refresh) => refresh + 1);
  };

  useEffect(()=>{



  },[refresh])



  function getAllRefresh(){
    setLoading(true);

  }



  // 로그인 상태 여부 : 디바이스 정보에 따라 움직인다
  // 현재 위치 경도를 구하자
  // 회원 상태
  // 찜한 목록
  // 내가 쓴 댓글

  
  useLayoutEffect(() => {
    //   setLoading(true);

    const now = moment();

    let time = moment(now).subtract(1, "days").unix();

    let time2 = moment(now).unix();

    const popupdate = window.localStorage.getItem("popup");

    if (popupdate /1000 >= time && popupdate /1000 < time2 ) {
      setAdvertise(false);
    }else{
      setAdvertise(true);
    }



    console.log("popupdate", popupdate);

    let banner1 = [];
    banner1.push(imageDB.sample);
    banner1.push(imageDB.sample2);
    banner1.push(imageDB.sample3);

    setBannerimgs(banner1);

    let banner2 = [];
    banner2.push(imageDB.banner1);
    banner2.push(imageDB.banner2);
    setBanner2imgs(banner2);




    user.storelist.sort(function (a, b) {
      // 오름차순
      return parseFloat(a.dist) < parseFloat(b.dist)
        ? -1
        : parseFloat(a.dist) > parseFloat(b.dist)
        ? 1
        : 0;
    });

     
    setStoreviewitems(user.storelist);

    console.log("user ", user);

    user.premiumshoplist.sort(function (a, b) {
      // 오름차순
      return parseFloat(a.dist) < parseFloat(b.dist)
        ? -1
        : parseFloat(a.dist) > parseFloat(b.dist)
        ? 1
        : 0;
    });



    setPremiumshops(user.premiumshoplist);

    user.goldshoplist.sort(function (a, b) {
      // 오름차순
      return parseFloat(a.dist) < parseFloat(b.dist)
        ? -1
        : parseFloat(a.dist) > parseFloat(b.dist)
        ? 1
        : 0;
    });

    setGoldshops(user.goldshoplist);

    user.silvershoplist.sort(function (a, b) {
      // 오름차순
      return parseFloat(a.dist) < parseFloat(b.dist)
        ? -1
        : parseFloat(a.dist) > parseFloat(b.dist)
        ? 1
        : 0;
    });


    setSilvershops(user.silvershoplist);
    setShopcount(
      user.premiumshoplist.length +
      user.goldshoplist.length +
      user.silvershoplist.length
    );

  console.log("useLayoutEffect", user);
  setThemafiltervalue(themafiltervalue);
  setPreferencefiltervalue(preferencefiltervalue);
  setPricefiltervalue(pricefiltervalue);


  setRefresh((refresh) => refresh + 1);

  }, [user]);

  useEffect(() => {
 
  setPremiumshops(premiumshops);
  setGoldshops(goldshops);
  setSilvershops(silvershops);
  setShopcount(shopcount);


  setThemafiltervalue(themafiltervalue);
  setPreferencefiltervalue(preferencefiltervalue);
  setPricefiltervalue(pricefiltervalue);



  }, [refresh]);


  


  const StoreViewFunc = (stores) => {
    let premiumshoplist = [],
      goldshoplist = [],
      silvershoplist = [];
    stores.map((data) => {
      const lat1 = user.latitude;
      const lon1 = user.longitude;
      const lat2 = data.STORELATITUDE;
      const lon2 = data.STORELONGITUDE;
      const dist = distanceFunc(lat1, lon1, lat2, lon2);

      // console.log("dist", dist, user.distance);
      let policydistance = 0;

      if (user.distance == "") {
        policydistance = 10;
      } else {
        policydistance = user.distance;
      }
      if (dist <= policydistance) {
        if (data.STORELEVEL.indexOf("premium") != -1) {
          premiumshoplist.push(data);
        }
        if (data.STORELEVEL.indexOf("gold") != -1) {
          goldshoplist.push(data);
        }
        if (data.STORELEVEL.indexOf("silver") != -1) {
          silvershoplist.push(data);
        }
      }
    });

    setPremiumshops(premiumshoplist);
    setGoldshops(goldshoplist);
    setSilvershops(silvershoplist);





    setShopcount(
      premiumshoplist.length + goldshoplist.length + silvershoplist.length
    );

    setRefresh((refresh) => refresh + 1);
  };

  function preventDefault(e) {
    e.preventDefault();
  }

  async function stopView(uniqueId) {
    setAdvertiseclose(true);

    const DEVICEID = uniqueId;
    await update_popupcheck({ DEVICEID });
  }

  const Filtersearch = async (dataitems) => {

    let resultitems = dataitems;
    const themaary = themafiltervalue;
    const preferenceary = preferencefiltervalue;
    const priceary = pricefiltervalue;

    
    let items = [];
    items = await ThemaFilterArySearch({ resultitems, themaary });



    resultitems = items;
    items = await PreferenceFilterArySearch({ resultitems, preferenceary });
    resultitems = items;

    items = await PriceFilterArySearch({ resultitems, priceary });


    StoreViewFunc(items);

   _scrollTo("searchresult", 0);
    await useSleep(500);

    setSearching(false);
  };
  const Filterinitialsearch = async (dataitems) => {
    setSearching(true);
    let resultitems = dataitems;

    StoreViewFunc(resultitems);

    await useSleep(500);

    setSearching(false);
  };

  const homeinitcallback = async (data) => {
    // console.log("init callback", storeviewitems);

    setSearchThema("");
    setSearchcategory("");
    setThemafiltervalue([]);
    setPreferencefiltervalue([]);
    setPricefiltervalue([]);
    const filteer = await Filterinitialsearch(storeviewitems);
  };

  const homethemacallback = (data) => {
    setThemafiltervalue(data);
    Filtersearch(storeviewitems);
  };

  const homepreferencecallback = (data) => {
    setPreferencefiltervalue(data);
    Filtersearch(storeviewitems);
  };
  const homepricecallback = (data) => {
    setPricefiltervalue(data);

    // console.log("homepricecallback", data, pricefiltervalue);

    Filtersearch(storeviewitems);
  };

  const categoryfiltercallback = (data) => {
    const tag = data;
    setSearchThema("");
    setSearchcategory(tag);

    // console.log("category filter", tag);
    const resultitems = storeviewitems;
    let items = TagFilterSearch({ resultitems, tag });
    // console.log("categoryfilter search", items);
    Filtersearch(items);
  };
  const themafiltercallback = (data) => {
    const thema = data;
    setSearchcategory("");
    setSearchThema(data);
    // console.log("thema filter", thema);
    // console.log("thema", thema);
    const resultitems = storeviewitems;
    let items = ThemaFilterSearch({ resultitems, thema });
    // console.log("themafilter search", items);
    Filtersearch(items);
  };

  async function stopView(uniqueId) {
    setAdvertiseclose(true);

    const DEVICEID = uniqueId;

    // console.log("close view", DEVICEID);

    await update_popupcheck({ DEVICEID });
  }

  function _scrollTo(selector, yOffset = 0) {
    var elementPosition = document.getElementById(selector).offsetTop +20;

    window.scrollTo({
      top: elementPosition, //add your necessary value
      behavior: "smooth", //Smooth transition to roll
    });
  }

    

  
  return (
    <>

    {
      advertise == true && 
        <AdvertiseModalEx/>
    }
    {loading == true ? (<Loading containerStyle={{ marginTop: 200 }} />) :
      <div>
        <Swipe
          delaytime={5000}
          images={bannerimgs}
          height={160}
          containerStyle={{ marginTop: 40 }}
        />

        <Row>
          <Label content={"찾는 마사지샵이 있나요?"} />
          <Switch
            checkstatus={true}
            button1={"카테고리별"}
            button2={"테마별"}
            Switchcallback={Switchcallback}
            containerStyle={{ display: "flex", justifyContent: "flex-end" }}
          />
          {switchcheck == false ? (
            <Categoryfilter callback={categoryfiltercallback} />
          ) : (
            <Themafilter callback={themafiltercallback} />
          )}
        </Row>
        <Emptyline />
        <CategorySubfilter />
        <Emptyline />

        {storerecentitems.length > 0 && (
          <>
            <Row>
              <Label content={"최근 본 업체"} />
              <MoreButton buttonText={"전체보기"} />
            </Row>
            <TrendingYScroll className="TrendingYScroll">
              {storerecentitems.map((data, index) => (
                <Halfshop
                  key={index}
                  shopdata={data}
                  containerStyle={{ padding: "5px" }}
                />
              ))}
            </TrendingYScroll>
          </>
        )}

        <Swipe
          delaytime={7000}
          images={banner2imgs}
          height={100}
          containerStyle={{ marginBottom: 10 }}
        />

        <Checkfilter
          homeinitcallback={homeinitcallback}
          homethemacallback={homethemacallback}
          homepreferencecallback={homepreferencecallback}
          homepricecallback={homepricecallback}
        />
        <Row2>
          <div id="searchresult"></div>
          <Label content={"검색결과"} />
          <Text
            size={12}
            value={"총" + shopcount + "개"}
            containerStyle={{ marginLeft: 10 }}
          />
        </Row2>

        {(searchcategory != "" ||
          searchthema != "" ||
          themafiltervalue.length > 0 ||
          pricefiltervalue.length > 0 ||
          preferencefiltervalue.length > 0) && (
          <Row
            style={{
              background: "#f9f9f9",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div style={{ marginBottom: 5 }}>{"검색조건"}</div>
            {searchcategory != "" && (
              <FilterMainSearch>
                <FilterResultText>
                  {convertSearchcategory(searchcategory)}
                </FilterResultText>
              </FilterMainSearch>
            )}
            {searchthema != "" && (
              <FilterMainSearch>
                <FilterResultText>
                  {convertSearchthema(searchthema)}
                </FilterResultText>
              </FilterMainSearch>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 2,
              }}
            >
              {themafiltervalue.map((data, index) => (
                <FilterResultSearch>
                  <FiAlertCircle size={12} color={"#fff"} />
                  <FilterResultText>{data}</FilterResultText>
                </FilterResultSearch>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 2,
              }}
            >
              {pricefiltervalue.map((data, index) => (
                <FilterResultSearch>
                  <FiAlertCircle size={12} color={"#fff"} />
                  <FilterResultText>{data}</FilterResultText>
                </FilterResultSearch>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 2,
              }}
            >
              {preferencefiltervalue.map((data, index) => (
                <FilterResultSearch>
                  <FiAlertCircle size={12} color={"#fff"} />
                  <FilterResultText>{data}</FilterResultText>
                </FilterResultSearch>
              ))}
            </div>
          </Row>
        )}

        {shopcount == 0 && (
          <Empty
            emptydata={"해당조건 과 일치한 매장이 없습니다"}
            containerStyle={{ margin: "50px 0px" }}
          />
        )}


            <Shop
              // scrollY={scrollY}
              label = {true}
              premiumshop={premiumshops}
              goldshop={goldshops}
              silvershop ={silvershops}
              allshop={[]}
            />

        <StoreInfo height={170} containerStyle={{ marginBottom: "20px" }} />
      </div>
    }
    </>
  );
};

export default React.memo(Homecontainer);
