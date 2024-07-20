
import React,{useState, useEffect, Fragment, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import "./Map.css"
import Storemap from '../components/Storemap';
import { BusanRegionData, ChungbukRegionData, ChungnamRegionData, DaegernRegionData, DaeguRegionData, GangwonRegionData, IncheonRegionData, JejuRegionData, JernbukRegionData, JernnamRegionData, KwanjuRegionData, KyungbukRegionData, KyungkiRegionData, KyungnamRegionData, RegionData, SejongRegionData, SeoulRegionData, UlsanRegionData } from '../utility/regionDefine';
import { UserContext } from '../context/User';


const Container = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
  margin-top:10px;
`
const DataView = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content1View = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentItem1View = styled.div`
  height: 30px;
  width: 80px;
  background-color: ${({ select }) => (select == true ? "#000" : "#ededed")};
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3px;
  display: flex;
`;
const ContentItem1ViewText = styled.span`
  color: ${({ select }) => (select == true ? "#fff" : "#000")};
  font-size: 12px;
`;

const Content2View = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const ContentItem2View = styled.div`
  height: 30px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.3px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ededed;
`;
const ContentHightItem = styled.div`
  height: 15px;
  width: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3px;
  margin-right: 20px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  background-color: #ff4e19;
  border-radius: 10px;
`;
const ContentHightItemText = styled.span`
  color: #fff;
  font-size: 10px;
  font-weight: 700;
`;

const ContentItem2ViewText = styled.span`
  color: #000;
  font-size: 12px;
  padding-left: 20px;
`;
const RegionView = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const RegionFilterView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  background-color: #fff;
  width: 100%;
  border-bottom : 1px solid #ededed;
  margin-bottom:10px;
`;
const RegionFilterButtonOn = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: #f2f3f4;
  width: 50%;
  border-bottom : 1px solid #000;
`;
const RegionFilterButtonOnText = styled.span`
  font-size: 14px;
  font-family: ${({ theme }) => theme.SEMIBOLD};
  color: #000;
`;
const RegionFilterButton = styled.div`
  display: flex;
  height: 40px;
  border-bottom: 1px solid #ededed;
  justify-content: center;
  align-items: center;
  width: 50%;
`;
const RegionFilterButtonText = styled.span`
  font-size: 14px;
  color: #989898;
  font-family: ${({ theme }) => theme.SEMIBOLD};
`;


const MapView = styled.div`
  display : ${({ show }) => (show == true ? "flex" : "none")};
  margin-top:50px;
`;

const Region = ({ containerStyle, type, callback, index }) => {
  const navigation = useNavigate();

  const { user, dispatch2 } = useContext(UserContext);

  console.log("user", user);
  useEffect(() => {

  }, []);

  const _handleSelect1 = (data) => {
    allSelectFree();
    const FindIndex = regionvalue.findIndex((x) => x.name == data.name);
    regionvalue[FindIndex].select = true;
    setRegionvalue(regionvalue);
    setSelectregion(data.name);
  };


  const _handleSelect2 = (data1, data2) => {

    callback(data1, data2, index);
  };

  const allSelectFree = () => {
    regionvalue.map((data) => {
      data.select = false;
    });
  };


  const MapView = styled.div`
    width: 100%;
    height: 100vh;
    overflow: inherit !important;
  `;

  const [regionvalue, setRegionvalue] = useState(RegionData);
  const [seoulregionvalue, setSeoulregionvalue] = useState(SeoulRegionData);
  const [kyungkiregionvalue, setKyungkiregionvalue] =
    useState(KyungkiRegionData);
  const [incheonregionvalue, setIncheonregionvalue] =
    useState(IncheonRegionData);
  const [gangwoncheonregionvalue, setGangwonregionvalue] =
    useState(GangwonRegionData);
  const [daeguregionvalue, setDaeguregionvalue] = useState(DaeguRegionData);
  const [daegernregionvalue, setDaegernregionvalue] =
    useState(DaegernRegionData);
  const [kwanjuregionvalue, setKwangjuregionvalue] = useState(KwanjuRegionData);
  const [ulsanregionvalue, setUlsanregionvalue] = useState(UlsanRegionData);
  const [busanregionvalue, setBusanregionvalue] = useState(BusanRegionData);
  const [sejongregionvalue, setSejongregionvalue] = useState(SejongRegionData);
  const [jejuregionvalue, setJejuregionvalue] = useState(JejuRegionData);
  const [chungbukregionvalue, setChungbukregionvalue] =
    useState(ChungbukRegionData);
  const [chungnamregionvalue, setChungnamregionvalue] =
    useState(ChungnamRegionData);
  const [kyungbukregionvalue, setKyungbukregionvalue] =
    useState(KyungbukRegionData);
  const [kyungnamregionvalue, setKyunnamregionvalue] =
    useState(KyungnamRegionData);
  const [jernbukregionvalue, setJernbukregionvalue] =
    useState(JernbukRegionData);
  const [jernnamregionvalue, setJernnamregionvalue] =
    useState(JernnamRegionData);

  const [latitude, setLatitude] = useState(user.latitude);
  const [longitude, setLongitude] = useState(user.longitude);

  const [selectregion, setSelectregion] = useState("서울");

  const [regiontype, setRegiontype] = useState(0);

  const [refresh, setRefresh] = useState(1);

  const _handleregion = () => {
    setRegiontype(0);
  };
  const _handlestore = () => {
    setRegiontype(1);
  };
  const _handlestation = () => {
    setRegiontype(2);
  };
  const _handlemap = () => {
    setRegiontype(3);
  };

  useEffect(() => {
    allSelectFree();

    let region = regionvalue;
    setRegionvalue(region);
    // window.scrollTo(0, 0);
      
  }, [refresh]);

  useEffect(() => {
    if (type == "map") {
      console.log("map type .....");
      setRegiontype(3);
    }
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   return () => {};
  // }, []);

  return (
    <Container style={containerStyle}>
        <Fragment>
          <DataView>
            <Content1View>
              {regionvalue.map((data, index) => (
                <ContentItem1View
                  onClick={() => {
                    _handleSelect1(data);
                  }}
                  key={index}
                  select={data.select}
                >
                  <ContentItem1ViewText select={data.select}>
                    {data.name}
                  </ContentItem1ViewText>
                </ContentItem1View>
              ))}
            </Content1View>
            <Content2View>
              {
                <>  
                  {selectregion == "서울" &&
                    seoulregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("서울", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
  
                  {selectregion == "경기" &&
                    kyungkiregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("경기", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
        
                  {selectregion == "인천" &&
                    incheonregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("인천", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
      
                  {selectregion == "강원" &&
                    gangwoncheonregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("강원", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
       
                  {selectregion == "대구" &&
                    daeguregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("대구", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
      
                  {selectregion == "대전" &&
                    daegernregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("대전", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
  
                  {selectregion == "광주" &&
                    kwanjuregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("광주", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
        
                  {selectregion == "울산" &&
                    ulsanregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("울산", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
   
                  {selectregion == "부산" &&
                    busanregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("부산", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
            
                  {selectregion == "세종" &&
                    sejongregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("세종", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
      
                  {selectregion == "제주" &&
                    jejuregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("제주", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
      
                  {selectregion == "충북" &&
                    chungbukregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("충북", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
           
                  {selectregion == "충남" &&
                    chungnamregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("충남", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
                
                  {selectregion == "경북" &&
                    kyungbukregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("경북", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
     
                  {selectregion == "경남" &&
                    kyungnamregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("경남", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }

              {
                <>
             
                  {selectregion == "전북" &&
                    jernbukregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("전북", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
              {
                <>
           
                  {selectregion == "전남" &&
                    jernnamregionvalue.map((data, index) => (
                      <ContentItem2View
                        onClick={() => {
                          _handleSelect2("전남", data);
                        }}
                        key={index}
                      >
                        <ContentItem2ViewText>{data}</ContentItem2ViewText>
                      </ContentItem2View>
                    ))}
                </>
              }
            </Content2View>
          </DataView>
        </Fragment>
    </Container>
  );
};

export default Region;

