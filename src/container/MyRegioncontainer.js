import React,{useState, useEffect, useContext, useLayoutEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Checkfilter from '../components/Checkfilter';
import { get_stores } from '../service/StoreService';
import Premiumshop from '../components/Premiumshop';
import Loading from '../common/Loading';
import Empty from '../common/Empty';
import { PreferenceFilterArySearch, PriceFilterArySearch, ThemaFilterArySearch } from '../service/SearchService';
import Label from '../common/Label';
import Goldshop from '../components/Goldshop';
import Silvershop from '../components/Silvershop';
import { distanceFunc, getAddressCoords } from '../utility/common';
import { UserContext } from '../context/User';
import { FiAlertCircle } from "react-icons/fi";
import Shop from '../components/Shop';

const Container = styled.div`
  margin-top:80px;

`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    flex-wrap: wrap;
`

const TrendingXScroll = styled.div`
    display: flex;
    flex-direction: column;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`
const FilterSearchText = styled.span`
  font-size:12px;
  color: #ff4e19;
  font-weight: 600;
`
const FilterResultSearch = styled.div`
  background-color: #ff4e19;
  padding         : 5px 5px;
  border-radius   : 3px;
  margin-right    : 3px;
  display         : flex;
  justify-content : center;
  align-items     : center;
  margin-bottom   : 5px;
`
const FilterMainSearch = styled.div`
  background-color: #19a8ff;
  padding         : 5px 5px;
  border-radius   : 3px;
  margin-right    : 3px;
  display         : flex;
  justify-content : center;
  align-items     : center;
  margin-bottom   : 5px;
  margin-top      : 5px;
`

const FilterResultText = styled.span`
  font-size  : 11px;
  color      : #fff;
  font-weight: 600;
  margin-left: 3px;
`


const { kakao } = window;
const MyRegioncontainer = ({containerStyle,region0, region1, region2}) => {

  console.log("region1========", region1);

  const {user, dispatch2} = useContext(UserContext);

  const [storeitems, setStoreitems] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [themafiltervalue, setThemafiltervalue] = useState([]);
  const [preferencefiltervalue, setPreferencefiltervalue] = useState([]);
  const [pricefiltervalue, setPricefiltervalue] = useState([]);

  const [premiumshops, setPremiumshops] = useState([]);
  const [goldshops, setGoldshops] = useState([]);
  const [silvershops, setSilvershops] = useState([]);
  const [shopcount, setShopcount] = useState(0);
  const [storeviewitems, setStoreviewitems] = useState([]);

  const [loading, setLoading] = useState(false);
  var geocoder = new kakao.maps.services.Geocoder();

  const navigate = useNavigate();


  const FilterSetPremiumshops = (shops) => {

    let shops_ = [];
    shops.map((data, index) => {
      console.log("data", data);

      if (data.STOREADDR.indexOf(region2) != -1) {
        shops_.push(data);
      }
    })

    setPremiumshops(shops_);
  }
  const FilterSetGoldshops = (shops) => {
    let shops_ = [];
    shops.map((data, index) => {
      console.log("data", data);

      if (data.STOREADDR.indexOf(region2) != -1) {
        shops_.push(data);
      }
    });

    setGoldshops(shops_);
  };
  const FilterSetSilvershops = (shops) => {

    let shops_ = [];
    shops.map((data, index) => {
      console.log("data", data);

      if (data.STOREADDR.indexOf(region2) != -1) {
        shops_.push(data);
      }

      
    });
    setSilvershops(shops_);
  };

  const FilterSetStoreviewitems = (shops) => {
    let shops_ = [];
    shops.map((data, index) => {
      console.log("data", data);

      if (data.STOREADDR.indexOf(region2) != -1) {
        shops_.push(data);
      }
    });
    setStoreviewitems(shops_);
  };


  useLayoutEffect(() => {

    console.log("user", user.storelist);
   
    setStoreviewitems(user.storelist);

    
    setPremiumshops(user.premiumshoplist);
    setGoldshops(user.goldshoplist);
    setSilvershops(user.silvershoplist);
    setShopcount(
      user.premiumshoplist.length +
      user.goldshoplist.length +
      user.silvershoplist.length
    );


  }, []);
  
  const getAddressCoords = (address) => {
    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].x, result[0].y);
          resolve(coords);
        } else {
          reject(status);
        }
      });
    });
  };

  const StoreViewFunc = (stores) =>{
    let premiumshoplist = [], goldshoplist = [], silvershoplist = [];
    let address =  region1 +  " " + region2;

    let lat1 = "";
    let lon1 = "";

    console.log("address", address);

    if(address != ''){
      getAddressCoords(address).then((result)=>{

        console.log("address coords", result);

        lat1 = result.La;
        lon1 = result.Ma;

        stores.map((data)=>{

          const lat2 = data.STORELATITUDE;
          const lon2 = data.STORELONGITUDE;
    
          const dist= distanceFunc(lat1, lon1,lat2, lon2);
          console.log("position", lat1, lon1, lat2, lon2,user.distance,dist);

          let policydistance = 0;

          if(user.distance == ''){
            policydistance = 10;
          }else{
            policydistance = user.distance;
          }

          if(dist <= policydistance){
    
            if(data.STORELEVEL.indexOf('premium') != -1){
              premiumshoplist.push(data);
            }
            if(data.STORELEVEL.indexOf('gold') != -1 ){
              goldshoplist.push(data);
            }
            if(data.STORELEVEL.indexOf('silver') != -1 ){
              silvershoplist.push(data);
            }
    
          }
    
     
        })
    
        setPremiumshops(premiumshoplist);
        setGoldshops(goldshoplist);
        setSilvershops(silvershoplist);
    
        console.log("premiumshoplist", premiumshoplist);
        console.log("goldshoplist", goldshoplist);
        console.log("silvershoplist", silvershoplist);
    
        setShopcount(premiumshoplist.length + goldshoplist.length + silvershoplist.length);
    
        setRefresh(refresh => refresh +1);
      })
    }
  }




  const filtersearch = async(dataitems)=>{
    console.log("resultitems", dataitems);
    let resultitems = dataitems;
    const themaary = themafiltervalue;
    const preferenceary = preferencefiltervalue;
    const priceary = pricefiltervalue;
    let items = [];
    items = await ThemaFilterArySearch({resultitems, themaary});
    resultitems = items;
    items = await PreferenceFilterArySearch({resultitems, preferenceary});
    resultitems = items;
    items = await PriceFilterArySearch({resultitems, priceary});

    StoreViewFunc(items);
  }

  const homeinitcallback= async (data)=>{
    console.log("init callback",storeviewitems);
    setThemafiltervalue([]);
    setPreferencefiltervalue([]);
    setPricefiltervalue([]);
    const filteer = await Filterinitialsearch(storeviewitems);

  }


  const Filterinitialsearch = async(dataitems)=>{


    // setSearching(true);
    let resultitems = dataitems;


    StoreViewFunc(resultitems);


    // setSearching(false);

    
  }
  const homethemacallback = (data)=>{
    setThemafiltervalue(data);
    filtersearch(storeviewitems);
  }

  const homepreferencecallback =(data)=>{
    setPreferencefiltervalue(data);
    filtersearch(storeviewitems);
  }
  const homepricecallback = (data)=>{
    setPricefiltervalue(data);
    filtersearch(storeviewitems);
  }



  return (
    <Container style={containerStyle}>
      <Checkfilter
        homeinitcallback={homeinitcallback}
        homethemacallback={homethemacallback}
        homepreferencecallback={homepreferencecallback}
        homepricecallback={homepricecallback}
        containerStyle={{ position: "fixed", background: "white" }}
      />
      <>
        {(themafiltervalue.length > 0 ||
          pricefiltervalue.length > 0 ||
          preferencefiltervalue.length > 0) && (
          <Row
            style={{
              background: "#f9f9f9",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div style={{ marginBottom: 10 }}>{"검색조건"}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
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
            containerStyle={{ margin: "300px 0px" }}
          />
        )}

          <Shop
            premiumshop={[]}
            goldshop={[]}
            silvershop ={[]}
            allshop ={storeviewitems}
            />

        <div style={{ height: 80 }}></div>
      </>
    </Container>
  );
}

export default MyRegioncontainer;
