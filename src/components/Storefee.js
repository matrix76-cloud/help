import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { CommaFormatted } from '../utility/common';
import { Fragment } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: flex-start;
  padding:20px;
`


const StoreFeeView = styled.div`
    flex-direction : column;
  
`

const StoreFeeTypeView = styled.div`
    margin: 10px;
    display:flex;
    width :100%;

`
const StoreFeeTypeText = styled.span`
    color :#FF4E19;
    font-size :16px;
    font-family : ${({theme}) =>theme.BOLD};
    letter-spacing:-1px;
    font-weight:900;
`
const StoreFeeSubTypeText = styled.span`
    color :#989898;
    font-size :18px;
    font-family : ${({theme}) =>theme.REGULAR};
`

const StoreDetailFeeTypeView = styled.div`
    border-radius : 15px;
   
`

const StoreDetailFreeTypeText1 = styled.span`
    color : #000;
    font-size :14px;
    font-family : ${({theme}) =>theme.SEMIBOLD};
`

const StoreDetailSubName = styled.span`
    color : #000;
    font-size :14px;
    padding-left:20px;
    font-family : ${({theme}) =>theme.REGULAR};
`

const StoreDetailFreeTypeText2 = styled.span`
    color : #5F5F5F;
    font-size :14px;
    padding-top:5px;
    font-family : ${({theme}) =>theme.REGULAR};
`

const StoreDetailFeeTypeView2 = styled.div`
    display:flex;

    flex-direction:column;
    padding: 5px 15px;

`

const StoreDetailFeeType2View2 = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    height:30px;
    justify-content:space-between;

`
const StoreDetailFreeType2Text2 = styled.span`
    color : #5F5F5F;
    font-size :14px;
    font-family : ${({theme}) =>theme.REGULAR};
`

const ProductSalePriceTypeText = styled.span`
    font-size:14px; 
    color :#FF6B3E;
    font-family : ${({ theme }) => theme.BOLD};
    font-weight:900;
`

const ProductSalePriceText = styled.span`
  font-size: 16px;
  font-family: ${({ theme }) => theme.BOLD};
  font-weight: 900;
`;

const ProductRegularPriceTypeText = styled.span`
    font-size:14px; 
    color :#BABABA;
    text-decoration :line-through;
 
`


const Storefee = ({containerStyle,store}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
      <Text value={"요금"} containerStyle={{ fontWeight: 600 }} size={14} />

      {store.STOREFEEARY.map((data, index) => (
        <Fragment key={index}>
          <StoreFeeView
            style={{
              backgroundColor: "#f0f0f0",
              margin: "10px 0px",
              paddingBottom: 10,
              width: "100%",
            }}
          >
            <StoreFeeTypeView>
              <StoreFeeTypeText>{data.pricename}</StoreFeeTypeText>
            </StoreFeeTypeView>
            {data.plusitems.map((item, keyindex = 0) => (
              <StoreDetailFeeTypeView key={keyindex}>
                <Fragment>
                  {keyindex > 0 && (
                    <>
                      {item.detailname ==
                        data.plusitems[keyindex - 1].detailname &&
                      item.detaildesc ==
                        data.plusitems[keyindex - 1].detaildesc ? null : (
                        <StoreDetailFeeTypeView2>
                          <div
                            style={{
                              display: "flex",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              flexDirection: "column",
                            }}
                          >
                            <StoreDetailFreeTypeText1>
                              {item.detailname}
                            </StoreDetailFreeTypeText1>
                            <StoreDetailFreeTypeText2>
                              {item.detaildesc}
                            </StoreDetailFreeTypeText2>
                          </div>
                        </StoreDetailFeeTypeView2>
                      )}
                    </>
                  )}

                  {keyindex == 0 && (
                    <StoreDetailFeeTypeView2>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <StoreDetailFreeTypeText1>
                          {item.detailname}
                        </StoreDetailFreeTypeText1>
                        <StoreDetailFreeTypeText2>
                          {item.detaildesc}
                        </StoreDetailFreeTypeText2>
                      </div>
                    </StoreDetailFeeTypeView2>
                  )}

                  <StoreDetailFeeType2View2>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.detailsubname != "" && (
                        <div>
                          <StoreDetailSubName>
                            {item.detailsubname}
                          </StoreDetailSubName>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                      }}
                    >
                      <div>
                        <ProductSalePriceTypeText>
                          {item.detailratio}%
                        </ProductSalePriceTypeText>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ProductRegularPriceTypeText>
                          {CommaFormatted(item.detailprice)}원
                        </ProductRegularPriceTypeText>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                      }}
                    >
                      <ProductSalePriceText>
                        {CommaFormatted(item.detailsaleprice)}원
                      </ProductSalePriceText>
                    </div>
                  </StoreDetailFeeType2View2>
                </Fragment>
              </StoreDetailFeeTypeView>
            ))}
          </StoreFeeView>
        </Fragment>
      ))}
    </Container>
  );
}

export default Storefee;
