
import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import { get_reviewForUser } from '../service/ReviewService';
import { get_heartstore, get_heartstores, get_stores } from '../service/StoreService';
import Label from '../common/Label';
import { ArrayIncludeData } from '../utility/common';
import Premiumshop from '../components/Premiumshop__';
import Goldshop from '../components/Goldshop';
import Silvershop from '../components/Silvershop';
import Empty from '../common/Empty';

const Container = styled.div`
  margin-top:60px;
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
const Maincouponcontainer = ({containerStyle}) => {

  const{user, dispath2} = useContext(UserContext);

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
  
   
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
   
  
      <Empty emptydata={'선착순 쿠폰 매장이 없습니다'} />



    </Container>
  );
}

export default Maincouponcontainer;
