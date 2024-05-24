import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Image from "../common/Image";
import { imageDB } from "../utility/imageData";

import ThemaModalEx from "./ThemaModalEx";
import { setRef } from "@mui/material";
import PreferenceModalEx from "./PreferenceModalEx";
import PriceModalEx from "./PriceModalEx";
import CouponModalEx from "./CouponeModalEx";



const TRANSPARENT = 'transparent';

const Container = styled.div`
    flex-wrap : wrap;
    flex-direction : row;
    z-index :4;
    background-color : #fff;
    justify-content: center;
    align-items:center;
    display:flex;
    position:sticky;
    top:30px;
    width:100%;
    padding-bottom:5px;
    padding-top:10px;
    

 
`

const FilterButtonView = styled.div`
    border  :${({enable}) => enable == true ? (null): ('1px solid #DFE0E2')};
    border-radius : 5px;
    margin-right :3px;
    justify-content: center;
    align-items : center;
    padding :2px 6px;
    display : flex;
    height:22px;
    flex-direction : row;
    width :${({enable}) => enable == true ? ('60px') : ('50px')};
    background-color :${({enable}) => enable == true ? ('#44a3fe') : ('#fff')};

`
const FilterButtonView2 = styled.div`
    border  :${({enable}) => enable == true ? (null): ('1px solid #DFE0E2')};
    border-radius : 5px;
    margin-right :3px;
    justify-content: center;
    align-items : center;
    padding :2px 6px;
    display : flex;
    flex-direction : row;
    height:22px;
    width :${({enable}) => enable == true ? ('80px') : ('70px')};
    background-color :${({enable}) => enable == true ? ('#44a3fe') : ('#fff')};

`


const FilterButtonText = styled.div`

    color :${({enable}) => enable == true ? ('#FFF') : ('#5F5F5F')};
    font-family : Pretendard-Regular;
    font-size :12px;
    justify-content:center;
    align-items:center;
    display:flex;
`

const Empty = styled.div`
  background-color : #ededed;
  height:10px;
`

const FilterButtonOnText = styled.span`

    font-family : ${({theme}) =>theme.REGULAR};
    font-size :12px;
    color : #fff;
`


const TrendingXScroll = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x : scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  padding : 0px 10px;


`

const Checkfilter  = ({containerStyle,homeinitcallback, homethemacallback, homepreferencecallback, homepricecallback,init})=>{

    const [themastatus, setThemastatus] = useState(false);
    const [preferencestatus, setPreferencestatus] = useState(false);
    const [pricestatus, setPricestatus] = useState(false);
    const [couponstatus, setCouponstatus] = useState(false);

    
    const [themaarytype, setThemaarytype] = useState([]);
    const [preferencearytype, setPreferencearytype] = useState([]);
    const [pricearytype, setPricearytype] = useState([]);
    const [couponarytype, setCouponarytype] = useState([]);

    const [refresh, setRefresh] = useState(1);

    const _handleInit = () =>{
        setThemaarytype([]);
        setPreferencearytype([]);
        setPricearytype([]);
        setCouponarytype([]);
        homeinitcallback();
    }

    const _handleThema = () =>{

        console.log("Themastatus", themastatus);
        setThemastatus(!themastatus);
        setRefresh(refresh => refresh +1);
        
    }

    const themacallback = (data) =>{
        setThemastatus(!themastatus);
        homethemacallback(data);
        setThemaarytype(data);
        console.log("themacallback", data);
    }

    const _handlePreference = () =>{

        setPreferencestatus(!preferencestatus);
        setRefresh(refresh => refresh +1);
    }

    const preferencecallback = (data) =>{
        setPreferencestatus(!preferencestatus);
        homepreferencecallback(data);
        setPreferencearytype(data);
    }

 

    const _handlePrice =() =>{
        setPricestatus(!pricestatus);
        // setThemastatus(!themastatus);
        setRefresh(refresh => refresh +1);
    };

    const pricecallback = (data) =>{
        setPricestatus(!pricestatus);
        homepricecallback(data);
        setPricearytype(data);
    }

    const _handleCoupon = () =>{
        setCouponstatus(!couponstatus);
        setRefresh(refresh => refresh +1);
    }

    const couponecallback = (data) =>{
        setCouponstatus(!couponstatus);
        setCouponarytype(data);
    }

    useEffect(()=>{

 

    },[])

    return(
        <Container style={containerStyle}>


            {
                themastatus == true ? ( <ThemaModalEx callback={themacallback} data={themaarytype}></ThemaModalEx>):(null)
            } 

            {
                preferencestatus == true ? ( <PreferenceModalEx callback={preferencecallback} data={preferencearytype}></PreferenceModalEx>):(null)
            } 

            {
                pricestatus == true ? ( <PriceModalEx callback={pricecallback} data={pricearytype}></PriceModalEx>):(null)
            } 

            {
                couponstatus == true ? ( <CouponModalEx callback={couponecallback} data={couponarytype}></CouponModalEx>):(null)
            } 

            <TrendingXScroll className="TrendingXScroll" horizontal showsHorizontalScrollIndicator={false}>

      
      

            <FilterButtonView onClick={_handleInit} >
                {/* <Image source ={imageDB.refresh} containerStyle={{width:"15px", display:"flex"}}/> */}
                <FilterButtonText>초기화</FilterButtonText>
            </FilterButtonView>

            <FilterButtonView enable={themaarytype.length > 0  ? true : false} onClick={_handleThema}>
                <FilterButtonText enable={themaarytype.length > 0  ? true : false}>테마
                {
                    themaarytype.length > 0 ?(<FilterButtonOnText style={{paddingLeft:10}}>{''}+{themaarytype.length} </FilterButtonOnText>) : (null)          
                }
                </FilterButtonText>
            </FilterButtonView>


            <FilterButtonView enable={preferencearytype.length > 0  ? true : false} onClick={_handlePreference}>
                <FilterButtonText enable={preferencearytype.length > 0  ? true : false}>취향
                {
                    preferencearytype.length > 0 ?(<FilterButtonOnText style={{paddingLeft:10}}>{''}+{preferencearytype.length} </FilterButtonOnText>) : (null)          
                }
                </FilterButtonText>
            </FilterButtonView>

            <FilterButtonView enable={pricearytype.length > 0  ? true : false} onClick={_handlePrice}>
                <FilterButtonText enable={pricearytype.length > 0  ? true : false}>가격
                {
                    pricearytype.length > 0 ?(<FilterButtonOnText style={{paddingLeft:10}}>{''}+{pricearytype.length} </FilterButtonOnText>) : (null)          
                }
                </FilterButtonText>
            </FilterButtonView>

            <FilterButtonView enable={couponarytype.length > 0  ? true : false} onClick={_handleCoupon}>
                <FilterButtonText enable={couponarytype.length > 0  ? true : false}>쿠폰
                {
                    couponarytype.length > 0 ?(<FilterButtonOnText style={{paddingLeft:10}}>{''}+{couponarytype.length} </FilterButtonOnText>) : (null)          
                }
                </FilterButtonText>
            </FilterButtonView>




            <div style={{flex :1, width:50}}></div>

            </TrendingXScroll>
       
        </Container>
    );
}



Checkfilter.propTypes = {
    containerStyle : PropTypes.object,
}

export default Checkfilter;
