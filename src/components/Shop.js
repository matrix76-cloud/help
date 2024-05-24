 import React, { useState, useEffect, Fragment, useContext, useLayoutEffect } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
  useNavigation,
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
import { get_checkuser } from "../service/CheckService";
import Label from "../common/Label";


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
`;

const Container = styled.div`
  margin-bottom: 15px;
  margin: 10px 2.5%;
  box-shadow: #f2f2f2 1px 1px 3px 3px;
`;

const SilverContainer = styled.div`
  margin-bottom: 15px;
  margin: 10px 2.5%;
  box-shadow: #f2f2f2 1px 1px 3px 3px;
  display: flex;
`;

const ProductContentView = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e0ddda;
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
  zIndex:10
`;

const ProductNameView = styled.div`
  flex-direction: row;
  height: 25px;
  display: flex;
  margin-top: 5px;
  padding-left: 5px;
  display: flex;
`;

const ProductDescView = styled.div`
  flex-direction: row;
  display: flex;
  padding-left: 5px;
  height: 25px;
`;

const ProductPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 5px;
`;
const ProductInfoView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 30px;
  margin-top: 5px;
`;
const ProductOptionView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 50px;
  margin-top: 5px;
  position: absolute;
  left: 70px;
`;

const ProductSubPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const TagView = styled.div`
  position: absolute;
  z-index: 2;
  justify-content: flex-start;
  align-items: flex-start;
  left: 10px;
  height: 100px;
  flex-wrap: wrap;
  flex-direction: column;
  display: flex;
`;
const TagView2 = styled.div`
  background-color: ${({ bgcolor }) => bgcolor};
  height: 30px;
  margin-right: 5px;
  border-radius: 5px;
  width: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  display: flex;
`;
const TagViewText = styled.span`
  color: #fff;
  font-family: Pretendard-Bold;
  font-size: 12px;
`;
const ProductTagView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 10px;
`;
const ProductTag = styled.div`
  background-color: #6d6d6dcc;
  height: 25px;
  padding: 0px 5px;
  margin-right: 3px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 5px;
  margin-bottom: 2px;
`;
const ProductTagText = styled.span`
  font-size: 9.5px;
  font-family: Pretendard-Bold;
  color: ${({ color }) => color};
`;
const ProductTagText2 = styled.span`
  font-size: 14px;
  font-family: Pretendard-Bold;
  color: ${({ color }) => color};
`;

const ProductPlusTag = styled.div`
  height: 25px;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  display: flex;
`;
const ProductHeartTag = styled.div`
  position: absolute;
  right: 30px;
  top: 5px;
  z-index: 10;
`;
const GeneralChatoption = styled.div`
  padding: 6px;
  font-size: 12px;
  background: #b418ec;
  display: flex;
  color: #fff;
  border-radius: 5px;
  margin-right: 5px;
`;

const GroupChatoption = styled.div`
  padding: 6px;
  font-size: 12px;
  background: #b09b06;
  display: flex;
  color: #fff;
  border-radius: 5px;
  margin-right: 5px;
`;
const Checkoption = styled.div`
  padding: 6px;
  font-size: 12px;
  background: #1850ec;
  display: flex;
  color: #fff;
  border-radius: 5px;
  margin-right: 5px;
`;

const CloseView = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 95%;
  background: #0000009e;
`;
const CloseViewText = styled.span`
  color: #9f9d9d;
  font-family: ${({ theme }) => theme.REGULAR};
  font-size: 18px;
`;

const GoldProductContentView = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0px 2.5%;
`;

const GoldTagView = styled.div`
  position: absolute;
  width: 97%;
  z-index: 2;
  justify-content: flex-start;
  align-items: flex-start;
  left: 10px;
  height: 100px;
  flex-wrap: wrap;
  flex-direction: column;
  display: flex;
`;

const GoldTagView2 = styled.div`
  background-color: ${({ bgcolor }) => bgcolor};
  height: 30px;
  margin-right: 5px;
  border-radius: 5px;
  width: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  display: flex;
`;

const GoldProductOptionView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 50px;
  margin-top: 5px;
  position: absolute;
  left: 70px;
`;

const GoldGeneralChatoption = styled.div`
  padding: 6px;
  font-size: 12px;
  background: #b418ec;
  display: flex;
  color: #fff;
  border-radius: 5px;
  margin-right: 5px;
`;

const GoldGroupChatoption = styled.div`
  padding: 6px;
  font-size: 12px;
  background: #b09b06;
  display: flex;
  color: #fff;
  border-radius: 5px;
  margin-right: 5px;
`;
const GoldCheckoption = styled.div`
  padding: 6px;
  font-size: 12px;
  background: #1850ec;
  display: flex;
  color: #fff;
  border-radius: 5px;
  margin-right: 5px;
`;

const GoldProductNameView = styled.div`
  flex-direction: row;
  height: 25px;
  display: flex;
  margin-top: 5px;
  padding-left: 5px;
  display: flex;
`;

const GoldProductDescView = styled.div`
  flex-direction: row;
  display: flex;
  padding-left: 5px;
  height: 25px;
`;

const GoldProductInfoView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 30px;
  margin-top: 5px;
`;

const GoldProductPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 5px;
`;

const GoldProductSubPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const GoldProductRegion = styled.div`
  display: flex;
`;
const GoldProductReview = styled.div`
  display: flex;
`;
const GoldProductHeartview = styled.div`
  display: flex;
`;

const GoldProductTagView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 10px;
`;
const GoldProductTag = styled.div`
  background-color: #f59401c9;
  height: 25px;
  padding: 0px 3px;
  margin-right: 3px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 5px;
  margin-bottom: 2px;
`;
const GoldProductTagText = styled.span`
  font-size: 9.5px;
  font-family: Pretendard-Regular;
  color: ${({ color }) => color};
`;
const GoldProductTagText2 = styled.span`
  font-size: 14px;
  font-family: Pretendard-Regular;
  color: ${({ color }) => color};
`;

const GoldProductPlusTag = styled.div`
  height: 25px;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  display: flex;
`;
const GoldCloseView = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 95%;
  background: #0000009e;
`;
const GoldCloseViewText = styled.span`
  color: #9f9d9d;
  font-family: ${({ theme }) => theme.REGULAR};
  font-size: 18px;
`;




const SilverProductContentView = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-left:8px;
`;

const SilverProductRegion = styled.div`
  display: flex;
`;
const SilverProductReview = styled.div`
  display: flex;
`;
const SilverProductHeartview = styled.div`
  display: flex;
`;

const SilverProductNameView = styled.div`
  flex-direction: row;
  height: 25px;
  display: flex;
  margin-top: 5px;

  display: flex;
`;

const SilverProductDescView = styled.div`
  flex-direction: row;
  display: flex;

  height: 25px;
  flex-wrap: nowrap;
  width: 160px;
  text-align: left;
`;

const SilverProductInfoView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 30px;
  margin-top: 5px;
`;

const SilverProductPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 15px;
  margin-right:10px;
`;

const SilverProductSubPriceView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
  margin-right:5px;
`;

const SilverProductHeartTag = styled.div`
  position: absolute;
  left: 125px;
  z-index: 2;
`;


const SilverCloseView = styled.div`
  position: absolute;
  width: 140px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background: #0000009e;
  border-radius: 5px;
`;

const SilverCloseViewText = styled.span`
  color: #9f9d9d;
  font-family: ${({ theme }) => theme.REGULAR};
  font-size: 12px;
`;


const Shop = ({ allshop, premiumshop, goldshop, silvershop, label }) => {
  const navigate = useNavigate();
  const { user, dispatch2 } = useContext(UserContext);
  const [enable, setEnable] = useState(true);
  const [refresh, setRefresh] = useState(1);
  const [reviewdata, setReviewdata] = useState({});
  const [checks, setChecks] = useState([]);

  const [heart, setHeart] = useState(false);
  const [heartsu, setHeartSu] = useState(0);

  const [premiumshopdata, setPremiumshopdata] = useState([]);




  useEffect(() => {
 //   setPremiumshopdata(premiumshopdata);

    
  },[refresh])

  const _handleHeart = async (storedata, type) => {
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
      const FindIndex = storedata.HEARTUSER.findIndex(x=>x == USER_ID);
      storedata.HEARTUSER.splice(FindIndex, 1);  
    } else {
     const update = await updateheartonstore({ shopdata, USER_ID });
      alert("찜처리 하였습니다");
      storedata.HEARTUSER.push(USER_ID);

    }


    async function FetchData() {
      const STORE_ID = storedata.STORE_ID;
      let FindIndex = user.premiumshoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

      if(FindIndex != -1){
        user.premiumshoplist[FindIndex].checks = storedata.checks;
        user.premiumshoplist[FindIndex].reviewdata = storedata.reviewdata;
        user.premiumshoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;
        user["premiumshoplist"] = user.premiumshoplist;

        setPremiumshopdata(user.premiumshoplist);
        
      }


      FindIndex = user.goldshoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

      if(FindIndex != -1){
        user.goldshoplist[FindIndex].checks = storedata.checks;
        user.goldshoplist[FindIndex].reviewdata = storedata.reviewdata;
        user.goldshoplist[FindIndex].HEARTUSER = storedata.HEARTUSER; 
        user["goldshoplist"] = user.goldshoplist;
      }


      FindIndex = user.silvershoplist.findIndex(x => x.STORE_ID = storedata.STORE_ID);

      if(FindIndex != -1){
        user.silvershoplist[FindIndex].checks = storedata.checks;
        user.silvershoplist[FindIndex].reviewdata = storedata.reviewdata;
        user.silvershoplist[FindIndex].HEARTUSER = storedata.HEARTUSER;

              
        user["silvershoplist"] = user.silvershoplist;


      }
      dispatch2(user);
      setRefresh((refresh) => refresh + 1);
    }
    FetchData();
  };
  const _handleStore = (storedata) => {
 
    console.log("user", user);
    navigate("/store", { state: { STORE: storedata, REFRESH : true } });
  };

  function Distance(storedata) {
    const lat1 = user.latitude;
    const lon1 = user.longitude;
    const lat2 = storedata.STORELATITUDE;
    const lon2 = storedata.STORELONGITUDE;
    const dist = distanceFunc(lat1, lon1, lat2, lon2);
    return parseInt(dist);
  }

  function Enable(storedata) {
    return StartTimeCurrentTimeDiff(
      storedata.STORESTARTTIME,
      storedata.STOREENDTIME
    );
  }


  return (
    <>


      {allshop.map((storedata, index) => (
        <Container>
          <TagView>
            {storedata.STOREFILTER.map((data, index) => (
              <>
                {index < 2 && (
                  <TagView2 bgcolor={"#00000099"} key={index}>
                    {data == "korea" && <TagViewText>한국</TagViewText>}
                    {data == "china" && <TagViewText>중국</TagViewText>}
                    {data == "tileland" && <TagViewText>태국</TagViewText>}
                    {data == "oneshop" && <TagViewText>1인샵</TagViewText>}
                    {data == "wacksing" && <TagViewText>왁싱</TagViewText>}
                    {data == "meridian" && <TagViewText>경락</TagViewText>}
                    {data == "sports" && <TagViewText>스포츠</TagViewText>}
                    {data == "aroma" && <TagViewText>아로마</TagViewText>}
                    {data == "swedish" && <TagViewText>스웨디시</TagViewText>}
                    {data == "foot" && <TagViewText>발마사지</TagViewText>}
                  </TagView2>
                )}
              </>
            ))}
          </TagView>

          {(storedata.STORECHAT == true ||
            storedata.STOREGROUPCHAT == true ||
            storedata.checks.length > 0) && (
            <ProductOptionView>
              {storedata.STORECHAT == true && (
                <GeneralChatoption>일반 체팅</GeneralChatoption>
              )}
              {storedata.STOREGROUPCHAT == true && (
                <GroupChatoption>그룹 체팅</GroupChatoption>
              )}
              {storedata.checks.length > 0 && (
                <Checkoption>관리사 출근부</Checkoption>
              )}
            </ProductOptionView>
          )}

          {Enable(storedata) == false ? (
            <>
              <CloseView
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
                <CloseViewText>
                  영업시간은 {storedata.STORESTARTTIME}부터입니다
                </CloseViewText>
              </CloseView>
            </>
          ) : null}

          <div style={{ backgroundColor: "#E0DDDA" }}>
            <img
              onClick={() => {
                _handleStore(storedata);
              }}
              src={storedata.STOREIMAGEARY[0]}
              style={{ width: "100%", height: "200px" }}
            ></img>
          </div>

          <ProductContentView>
            <ProductNameView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text
                size={16}
                value={storedata.STORENAME}
                containerStyle={{ fontWeight: 700 }}
              />
            </ProductNameView>
            <ProductDescView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text size={14} value={storedata.STOREDESC} color={"#000"} />
            </ProductDescView>

            <ProductInfoView>
              <ProductRegion
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
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
                    value={Distance(storedata) + "km"}
                    containerStyle={{
                      justifyContent: "flex-start",
                    }}
                    Radius={false}
                  />
                </div>
              </ProductRegion>

              <Text value={"|"} containerStyle={{ width: "10px" }} />
              <ProductRegion
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
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

              <ProductReview
                onClick={() => {
                  _handleStore(storedata);
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

              <ProductHeartview
                onClick={() => _handleHeart(storedata, "premium")}
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
                  <Text size={10} value={storedata.HEARTUSER.length} />
                </div>
              </ProductHeartview>
            </ProductInfoView>

            <ProductPriceView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text size={14} value={storedata.STOREREPRESENTIVEPRICENAME} />
            </ProductPriceView>
            <ProductSubPriceView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
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
                value={
                  CommaFormatted(storedata.STOREREPRESENTIVESALEPRICE) + "원"
                }
                containerStyle={{ fontWeight: "700" }}
              />
            </ProductSubPriceView>
            <ProductTagView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              {storedata.STORETHEMAARY.map((data, index = 0) => (
                <Fragment key={index}>
                  {data == "four" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#40대 관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}

                  {data == "car" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#주차가능"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "shower" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#샤워가능"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "oneshop" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#1인샵"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "two" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#20대 관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "three" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#30대 관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "couple" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#커플환영"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "group" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#단체환영"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "allhour" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#24시간"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "male" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#남자관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "female" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#여자관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                </Fragment>
              ))}
              {storedata.STORETHEMAARY.length >= 5 && (
                <ProductPlusTag>
                  <ProductTagText2>
                    {"+"}
                    {storedata.STORETHEMAARY.length - 4}
                  </ProductTagText2>
                </ProductPlusTag>
              )}
            </ProductTagView>
          </ProductContentView>
        </Container>
      ))}

      {(premiumshop.length > 0 && label == true )&& (
        <div>
          <Row>
            <Label content={"프리미엄 제휴 업소"} />
          </Row>
        </div>
      )}


      {premiumshop.map((storedata, index) => (
        <Container>
          <TagView>
            {storedata.STOREFILTER.map((data, index) => (
              <>
                {index < 2 && (
                  <TagView2 bgcolor={"#00000099"} key={index}>
                    {data == "korea" && <TagViewText>한국</TagViewText>}
                    {data == "china" && <TagViewText>중국</TagViewText>}
                    {data == "tileland" && <TagViewText>태국</TagViewText>}
                    {data == "oneshop" && <TagViewText>1인샵</TagViewText>}
                    {data == "wacksing" && <TagViewText>왁싱</TagViewText>}
                    {data == "meridian" && <TagViewText>경락</TagViewText>}
                    {data == "sports" && <TagViewText>스포츠</TagViewText>}
                    {data == "aroma" && <TagViewText>아로마</TagViewText>}
                    {data == "swedish" && <TagViewText>스웨디시</TagViewText>}
                    {data == "foot" && <TagViewText>발마사지</TagViewText>}
                  </TagView2>
                )}
              </>
            ))}
          </TagView>

          {(storedata.STORECHAT == true ||
            storedata.STOREGROUPCHAT == true ||
            storedata.checks.length > 0) && (
            <ProductOptionView>
              {storedata.STORECHAT == true && (
                <GeneralChatoption>일반 체팅</GeneralChatoption>
              )}
              {storedata.STOREGROUPCHAT == true && (
                <GroupChatoption>그룹 체팅</GroupChatoption>
              )}
              {storedata.checks.length > 0 && (
                <Checkoption>관리사 출근부</Checkoption>
              )}
            </ProductOptionView>
          )}

          {Enable(storedata) == false ? (
            <>
              <CloseView
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
                <CloseViewText>
                  영업시간은 {storedata.STORESTARTTIME}부터입니다
                </CloseViewText>
              </CloseView>
            </>
          ) : null}

          <div style={{ backgroundColor: "#E0DDDA" }}>
            <img
              onClick={() => {
                _handleStore(storedata);
              }}
              src={storedata.STOREIMAGEARY[0]}
              style={{ width: "100%", height: "200px" }}
            ></img>
          </div>

          <ProductContentView>
            <ProductNameView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text
                size={16}
                value={storedata.STORENAME}
                containerStyle={{ fontWeight: 700 }}
              />
            </ProductNameView>
            <ProductDescView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text size={14} value={storedata.STOREDESC} color={"#000"} />
            </ProductDescView>

            <ProductInfoView>
              <ProductRegion
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
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
                    value={Distance(storedata) + "km"}
                    containerStyle={{
                      justifyContent: "flex-start",
                    }}
                    Radius={false}
                  />
                </div>
              </ProductRegion>

              <Text value={"|"} containerStyle={{ width: "10px" }} />
              <ProductRegion
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
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

              <ProductReview
                onClick={() => {
                  _handleStore(storedata);
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

              <ProductHeartview
                onClick={() => _handleHeart(storedata, "premium")}
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
                  <Text size={10} value={storedata.HEARTUSER.length} />
                </div>
              </ProductHeartview>
            </ProductInfoView>

            <ProductPriceView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text size={14} value={storedata.STOREREPRESENTIVEPRICENAME} />
            </ProductPriceView>
            <ProductSubPriceView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
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
                value={
                  CommaFormatted(storedata.STOREREPRESENTIVESALEPRICE) + "원"
                }
                containerStyle={{ fontWeight: "700" }}
              />
            </ProductSubPriceView>
            <ProductTagView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              {storedata.STORETHEMAARY.map((data, index = 0) => (
                <Fragment key={index}>
                  {data == "four" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#40대 관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}

                  {data == "car" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#주차가능"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "shower" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#샤워가능"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "oneshop" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#1인샵"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "two" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#20대 관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "three" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#30대 관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "couple" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#커플환영"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "group" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#단체환영"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "allhour" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#24시간"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "male" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#남자관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                  {data == "female" && index < 5 && (
                    <ProductTag key={index} color={theme.main}>
                      <ProductTagText color={theme.white}>
                        {"#여자관리사"}
                      </ProductTagText>
                    </ProductTag>
                  )}
                </Fragment>
              ))}
              {storedata.STORETHEMAARY.length >= 5 && (
                <ProductPlusTag>
                  <ProductTagText2>
                    {"+"}
                    {storedata.STORETHEMAARY.length - 4}
                  </ProductTagText2>
                </ProductPlusTag>
              )}
            </ProductTagView>
          </ProductContentView>
        </Container>
      ))}

      {(goldshop.length > 0 && label == true) && (
        <div>
          <Row>
            <Label content={"골드 제휴 업소"} />
          </Row>
        </div>
      )}

      {goldshop.map((storedata, index) => (
        <Container>
          <GoldTagView>
            {storedata.STOREFILTER.map((data, index) => (
              <>
                {index < 2 && (
                  <GoldTagView2 bgcolor={"#00000099"} key={index}>
                    {data == "korea" && <TagViewText>한국</TagViewText>}
                    {data == "china" && <TagViewText>중국</TagViewText>}
                    {data == "tileland" && <TagViewText>태국</TagViewText>}
                    {data == "oneshop" && <TagViewText>1인샵</TagViewText>}
                    {data == "wacksing" && <TagViewText>왁싱</TagViewText>}
                    {data == "meridian" && <TagViewText>경락</TagViewText>}
                    {data == "sports" && <TagViewText>스포츠</TagViewText>}
                    {data == "aroma" && <TagViewText>아로마</TagViewText>}
                    {data == "swedish" && <TagViewText>스웨디시</TagViewText>}
                    {data == "foot" && <TagViewText>발마사지</TagViewText>}
                  </GoldTagView2>
                )}
              </>
            ))}
          </GoldTagView>

          {(storedata.STORECHAT == true ||
            storedata.STOREGROUPCHAT == true ||
            storedata.checks.length > 0) && (
            <GoldProductOptionView>
              {storedata.STORECHAT == true && (
                <GoldGeneralChatoption>일반 체팅</GoldGeneralChatoption>
              )}
              {storedata.STOREGROUPCHAT == true && (
                <GoldGroupChatoption>그룹 체팅</GoldGroupChatoption>
              )}
              {storedata.checks.length > 0 && (
                <GoldCheckoption>관리사 출근부</GoldCheckoption>
              )}
            </GoldProductOptionView>
          )}

          {Enable(storedata) == false ? (
            <>
              <CloseView
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
                <CloseViewText>
                  영업시간은 {storedata.STORESTARTTIME}부터입니다
                </CloseViewText>
              </CloseView>
            </>
          ) : null}

          <div style={{ backgroundColor: "#E0DDDA" }}>
            <img
              onClick={() => {
                _handleStore(storedata);
              }}
              src={storedata.STOREIMAGEARY[0]}
              style={{ width: "100%", height: "200px" }}
            ></img>
          </div>

          <GoldProductContentView>
            <GoldProductNameView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text
                size={16}
                value={storedata.STORENAME}
                containerStyle={{ fontWeight: 700 }}
              />
            </GoldProductNameView>
            <GoldProductDescView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text size={14} value={storedata.STOREDESC} color={"#000"} />
            </GoldProductDescView>

            <GoldProductInfoView>
              <GoldProductRegion
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
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
                    value={Distance(storedata) + "km"}
                    containerStyle={{
                      justifyContent: "flex-start",
                    }}
                    Radius={false}
                  />
                </div>
              </GoldProductRegion>

              <Text value={"|"} containerStyle={{ width: "10px" }} />
              <GoldProductRegion
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
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
              </GoldProductRegion>

              <Text value={"|"} containerStyle={{ width: "10px" }} />

              <GoldProductReview
                onClick={() => {
                  _handleStore(storedata);
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
              </GoldProductReview>

              <Text value={"|"} containerStyle={{ width: "10px" }} />

              <GoldProductHeartview
                onClick={() => _handleHeart(storedata, "gold")}
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
                  <Text size={10} value={storedata.HEARTUSER.length} />
                </div>
              </GoldProductHeartview>
            </GoldProductInfoView>

            <GoldProductPriceView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              <Text size={14} value={storedata.STOREREPRESENTIVEPRICENAME} />
            </GoldProductPriceView>
            <GoldProductSubPriceView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
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
                value={
                  CommaFormatted(storedata.STOREREPRESENTIVESALEPRICE) + "원"
                }
                containerStyle={{ fontWeight: "700" }}
              />
            </GoldProductSubPriceView>
            <GoldProductTagView
              onClick={() => {
                _handleStore(storedata);
              }}
            >
              {storedata.STORETHEMAARY.map((data, index = 0) => (
                <Fragment key={index}>
                  {data == "four" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#40대 관리사"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}

                  {data == "car" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#주차가능"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "shower" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#샤워가능"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "oneshop" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#1인샵"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "two" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#20대 관리사"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "three" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#30대 관리사"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "couple" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#커플환영"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "group" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#단체환영"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "allhour" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#24시간"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "male" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#남자관리사"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                  {data == "female" && index < 5 && (
                    <GoldProductTag key={index} color={theme.main}>
                      <GoldProductTagText color={theme.white}>
                        {"#여자관리사"}
                      </GoldProductTagText>
                    </GoldProductTag>
                  )}
                </Fragment>
              ))}
              {storedata.STORETHEMAARY.length >= 5 && (
                <GoldProductPlusTag>
                  <GoldProductTagText2>
                    {"+"}
                    {storedata.STORETHEMAARY.length - 4}
                  </GoldProductTagText2>
                </GoldProductPlusTag>
              )}
            </GoldProductTagView>
          </GoldProductContentView>
        </Container>
      ))}

      {(silvershop.length > 0 && label == true) && (
        <div>
          <Row>
            <Label content={"실버 제휴 업소"} />
          </Row>
        </div>
      )} 
      {silvershop.map((storedata, index) => (
        <SilverContainer>
          {Enable(storedata) == false ? (
            <>
              <SilverCloseView
                onClick={() => {
                  _handleStore(storedata);
                }}
              >
                <SilverCloseViewText>
                  영업시간은 {storedata.STORESTARTTIME}부터입니다
                </SilverCloseViewText>
              </SilverCloseView>
            </>
          ) : null}

          <img
            onClick={() => {
              _handleStore(storedata);
            }}
            src={storedata.STOREIMAGEARY[0]}
            style={{ width: "140px", height: "150px" }}
          ></img>
          <SilverProductContentView
            onClick={() => {
              _handleStore(storedata);
            }}
          >
            <SilverProductNameView>
              <Text
                size={16}
                value={storedata.STORENAME}
                containerStyle={{ fontWeight: 700 }}
              />
            </SilverProductNameView>
            <SilverProductDescView>
              <Text size={12} value={storedata.STOREDESC} color={theme.grey} />
            </SilverProductDescView>
            <SilverProductInfoView>
              <SilverProductRegion>
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
                      Distance(storedata) +
                      "km · " +
                      KeywordAddress(storedata.STOREADDR)
                    }
                    containerStyle={{
                      width: "140px",
                      justifyContent: "flex-start",
                    }}
                    Radius={false}
                  />
                </div>
              </SilverProductRegion>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <SilverProductReview>
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
                </SilverProductReview>
                <SilverProductHeartview
                  onClick={(event) => {
                    event.stopPropagation();
                    _handleHeart(storedata, "silver");
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
                    {ArrayIncludeData(storedata.HEARTUSER, user.uid) ==
                      true && (
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

                    {ArrayIncludeData(storedata.HEARTUSER, user.uid) ==
                      false && (
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
                        storedata.HEARTUSER == undefined
                          ? 0
                          : storedata.HEARTUSER.length
                      }
                    />
                  </div>
                </SilverProductHeartview>
              </div>
            </SilverProductInfoView>
            <SilverProductPriceView>
              <Text size={14} value={storedata.STOREREPRESENTIVEPRICENAME} />
            </SilverProductPriceView>
            <SilverProductSubPriceView>
              <Text
                size={13}
                value={storedata.STOREREPRESENTIVERATIO + "%"}
                color={theme.main}
                containerStyle={{ fontWeight: 700, width: "30px" }}
              />
              <Text
                size={13}
                value={CommaFormatted(storedata.STOREREPRESENTIVEPRICE) + "원"}
                color={theme.grey}
                containerStyle={{
                  textDecorationLine: "line-through",
                  width: "70px",
                }}
              />
              <Text
                size={13}
                value={
                  CommaFormatted(storedata.STOREREPRESENTIVESALEPRICE) + "원"
                }
                containerStyle={{ fontWeight: "700" }}
              />
            </SilverProductSubPriceView>
          </SilverProductContentView>
        </SilverContainer>
      ))}
    </>
  );
};

export default Shop;
