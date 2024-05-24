import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';
import Image from '../common/Image';
import Label from '../common/Label';
import MoreButton from '../common/MoreButton';
import { get_storeallview, get_storeinfoForSTOREID, get_stores } from '../service/StoreService';
import Halfshop from '../components/Halfshop';
import ImageLeftButton from '../common/ImageLeftButton';
import Empty from '../common/Empty';
import Button from '../common/Button';
import { BusanRegionData, ChungbukRegionData, ChungnamRegionData, DaegernRegionData, DaeguRegionData, GangwonRegionData, IncheonRegionData, JejuRegionData, JernbukRegionData, JernnamRegionData, KwanjuRegionData, KyungbukRegionData, KyungkiRegionData, KyungnamRegionData, RegionData, SejongRegionData, SeoulRegionData, UlsanRegionData } from '../utility/regionDefine';
import Loading from '../common/Loading';
import { useSleep } from '../utility/common';
import Text from '../common/Text';
import { UserContext } from '../context/User';
import { get_review } from '../service/ReviewService';
import { get_checkuser } from '../service/CheckService';


const Container = styled.div`
  margin-top:50px;
`

const SearchView = styled.div`
    width :90%;
    height :50px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:5%;
`
const ContentView = styled.div`
    display: flex;
    padding:20px;
    flex-direction:column;
`

const MainTextView = styled.div`
    flex-direction : row;
    display: flex;
    justify-content:space-between;
    margin-top:50px;
`
const TrendingScroll = styled.div`
    padding-left:10px;
    margin-bottom :10px;
    height :160px;
    display: flex;
`

const EmptyResult = styled.div`
    display: flex;
    justifyContent:center;
    alignItems:center; 
    height:50px  
`
const TrendingYScroll = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x : scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
`

const searchItems = ['서울', '마사지', '신도림', '휴마사지' ,'최저가', '여성마사지', '용인'
,'오산', '신대방'];

const Searchcontainer = ({containerStyle}) => {
  const navigation = useNavigate();

  const { user, dispatch2 } = useContext(UserContext);
  
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(1);
  const [searchprocess, setSearchprocess] = useState(1);
  const [textsearch, setTextsearch] = useState(true);
  const [storeviewitems, setStoreviewitems] = useState([]);
  
  const [recentviewitems, setRecentviewitems] = useState([]);
  const [load, setLoad]= useState(false);


  const [regionvalue, setRegionvalue] = useState(RegionData);
  const [seoulregionvalue, setSeoulregionvalue] = useState(SeoulRegionData);
  const [kyungkiregionvalue, setKyungkiregionvalue] = useState(KyungkiRegionData);
  const [incheonregionvalue, setIncheonregionvalue] = useState(IncheonRegionData);
  const [gangwoncheonregionvalue, setGangwonregionvalue] = useState(GangwonRegionData);
  const [daeguregionvalue, setDaeguregionvalue] = useState(DaeguRegionData);
  const [daegernregionvalue, setDaegernregionvalue] = useState(DaegernRegionData);
  const [kwanjuregionvalue, setKwangjuregionvalue] = useState(KwanjuRegionData);
  const [ulsanregionvalue, setUlsanregionvalue] = useState(UlsanRegionData);
  const [busanregionvalue, setBusanregionvalue] = useState(BusanRegionData);
  const [sejongregionvalue, setSejongregionvalue] = useState(SejongRegionData);
  const [jejuregionvalue, setJejuregionvalue] = useState(JejuRegionData);
  const [chungbukregionvalue, setChungbukregionvalue] = useState(ChungbukRegionData);
  const [chungnamregionvalue, setChungnamregionvalue] = useState(ChungnamRegionData);
  const [kyungbukregionvalue, setKyungbukregionvalue] = useState(KyungbukRegionData);
  const [kyungnamregionvalue, setKyunnamregionvalue] = useState(KyungnamRegionData);
  const [jernbukregionvalue, setJernbukregionvalue] = useState(JernbukRegionData);
  const [jernnamregionvalue, setJernnamregionvalue] = useState(JernnamRegionData);

  const [resultitems, setResultitems] = useState([]);
  const [resultitems2, setResultitems2] = useState([]);


  const _handleSelect2 = (data1, data2)=>{
    // navigation("/Myregion",{state:{region1:data1, region2:data2}});
    navigate("/myregion",{state:{region0 : "", region1:data1, region2:data2}});
  }

  const SearchRegion = async(text)=>{

    let searchItem = [];
    let Finds = regionvalue.filter(x=>x.name.indexOf(text) != -1)
 
    Finds.map((data, index)=>{
      searchItem.push({region1 : data.name, region2 : "", search:data.name});
    })
    Finds = seoulregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "서울", region2 :data, search:data});
    })

    Finds = kyungkiregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "경기", region2 :data, search:data});
    })

    Finds = incheonregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "인천", region2 :data, search:data});
    })

    Finds = gangwoncheonregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "강원", region2 :data, search:data});
    })

    Finds = daeguregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "대구", region2 :data, search:data});
    })

    Finds = daegernregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "대전", region2 :data, search:data});
    })

    Finds = kwanjuregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "광주", region2 :data, search:data});
    })

    Finds = ulsanregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "울산", region2 :data, search:data});
    })

    Finds = busanregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "부산", region2 :data, search:data});
    })

    Finds = sejongregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "세종", region2 :data, search:data});
    })

    Finds = jejuregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "제주", region2 :data, search:data});
    })

    Finds = chungbukregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "충북", region2 :data, search:data});
    })

    Finds = chungnamregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "충남", region2 :data, search:data});
    })

    Finds = kyungbukregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "경북", region2 :data, search:data});
    })

    Finds = kyungnamregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "경남", region2 :data, search:data});
    })

    Finds = jernbukregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "전북", region2 :data, search:data});
    })

    Finds = jernnamregionvalue.filter(x=>x.indexOf(text) != -1)
    
    Finds.map((data, index)=>{
      searchItem.push({region1 : "전남", region2 :data, search:data});
    })


    setResultitems(searchItem);

    return searchItem;

  }

  const SearchStore = async(text)=>{
    let searchItem = [];
    let Finds = user.storelist.filter(x=>x.STORENAME.indexOf(text) != -1);
    Finds.map((data)=>{
      searchItem.push(data);
    })

    console.log("searchItem", searchItem,user.storelist);
    
    setResultitems2(searchItem);
  }
  const _handleStore = async(STORE) =>{
    navigate("/store",{state:{STORE:STORE}});
  }

  const SearchFunc = async (keyword) => {
    
    console.log("search msg", keyword);

    if (keyword == "") {
      setResultitems([]);
      setResultitems2([]);
      return;
    }
    // await useSleep(1000);
    SearchRegion(keyword);
    SearchStore(keyword);
    // setRefresh(refresh => refresh +1);
    setSearchprocess((searchprocess) => searchprocess +1);

  }

    useEffect(() => {
      setSearch(search);

      if (search != "") {
      } else {
        setResultitems([]);
        setResultitems2([]);
      }
    }, [setSearchprocess]);
  
  const navigate = useNavigate();
  useEffect(() => {
    async function FetchData() {
      const deviceid = user.deviceid;
      const recentstoresTmp = user.storeviewlist;

      const storeviewitemsTmp = user.storelist;


      console.log("storeview", user.storelist);

      setStoreviewitems(user.storelist);

      let rectentstoresTmp2 = [];

      recentstoresTmp.map(async(data)=>{


        const STORE_ID = data.STORE_ID;
        const reviewdata = await get_review({ STORE_ID });
  
        data.STORE["reviewdata"] =reviewdata;
        const USER_ID = data.STORE.USER_ID;
        const checks = await get_checkuser({ USER_ID });
        data.STORE["checks"] =checks;


        console.log("recentstoresTmp", data);
        rectentstoresTmp2.push(data);

        setRecentviewitems(rectentstoresTmp2);

        setRefresh((refresh) => refresh + 1);

      })
      
      
    }
    FetchData();

  }, [])

  useEffect(() => {
    
    setStoreviewitems(storeviewitems);
    setRecentviewitems(recentviewitems);
    
    setSearch(search);
    setResultitems(resultitems);
    setResultitems2(resultitems2);

  }, [refresh])





  const _handleSearchComplete = async(e) =>{
   
  
  }
  const _handleSearch = async (e) => {
    
    console.log("typing", e.target.value);
    
    setSearch(e.target.value);
    SearchFunc(e.target.value);

  }


  return (
    <Container style={containerStyle}>
      <SearchView>
        <div>
          <Image
            source={imageDB.search}
            containerStyle={{ width: "30px" }}
            Radius={false}
          />
        </div>
        <input
          type="text"
          style={{ fontSize: 14,border: "1px solid #e9e9e9",borderRadius: 0 }}
          placeholder={"지역 및 업체명을 검색해 주세요"}
          onSubmitEditing={_handleSearchComplete}
          onKeyDown={_handleSearchComplete}
          onChange={(e) => {
            setSearch(e);
            _handleSearch(e);
            // setSearchprocess((searchprocess) => searchprocess + 1);
          }}
        />
      </SearchView>

      <ContentView>
        <MainTextView style={{ marginTop: 10 }}>
          <Label content={"최근본 업체"} fontweight={400} />
          <MoreButton buttonText={"전체보기"} />
        </MainTextView>

        <TrendingYScroll>
          {recentviewitems.map((data, index) => (
            <Halfshop
              key={index}
              shopdata={data}
              containerStyle={{ padding: "10px 5px" }}
            />
          ))}
        </TrendingYScroll>

        {search != "" && (
          <MainTextView>
            <Label content={"지역"} fontweight={400} />
          </MainTextView>
        )}

        {resultitems.map((data, index) => (
          <div
            onClick={() => {
              _handleSelect2(data.region1, data.region2);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15,
              paddingBottom: "10px",
              borderBottom: "1px solid #ededed",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={imageDB.bottom_location}
                containerStyle={{ width: 20, height: 20 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 20,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Text value={data.search} size={14} color={"#ff0000"} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                {data.region2 != "" ? (
                  <>
                    <Text value={data.region1} size={13} />
                    {"  >  "}
                    <Text value={data.region2} size={13} />
                  </>
                ) : (
                  <Text value={data.region1} size={13} />
                )}
              </div>
            </div>
          </div>
        ))}

        {search != "" && (
          <MainTextView>
            <Label content={"매장"} fontweight={400} />
          </MainTextView>
        )}

        {resultitems2.map((data, index) => (
          <div
            onClick={() => {
              _handleStore(data);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15,
              paddingBottom: "10px",
              borderBottom: "1px solid #ededed",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={imageDB.bottom_location}
                containerStyle={{ width: 20, height: 20 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 20,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Text value={data.STORENAME} size={14} color={"#ff0000"} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <Text value={data.STOREADDR} size={13} />
              </div>
            </div>
          </div>
        ))}
      </ContentView>
    </Container>
  );
}

export default Searchcontainer;



          {
            /* <MainTextView>
                  <Label content={'최근검색어'} fontweight={400}/>
              </MainTextView>

              <Row style={{marginTop:20}}>
                {
                  searchItems.map((data, index)=>(
              
                    <ImageLeftButton  buttontext={data} round={false} 
                    containerStyle={{margin:"5px"}}
                    source={imageDB.close} imgwidth={12} />
                  ))
                }
              </Row>
              <div style={{display:"flex",flexDirection:"row", justifyContent:"flex-end"}}>
                <Button buttonText ={'최근검색어 전체삭제'} containerStyle={{backgroundColor : "#d8d5d5",
              fontSize:14,
                color :'#000', border :'1px solid #d8d5d5', width:"130px", height:"30px", borderRadius:5}}/>
              </div> */
          }