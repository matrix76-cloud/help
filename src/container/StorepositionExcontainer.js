
import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import { get_reviewForUser } from '../service/ReviewService';
import { get_heartstore, get_heartstores, get_stores } from '../service/StoreService';
import Label from '../common/Label';
import { ArrayIncludeData } from '../utility/common';
import Premiumshop from '../components/Premiumshop__';
import Goldshop from '../components/Goldshop';
import Silvershop from '../components/Silvershop';

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
const StorepostionExcontainer = ({containerStyle}) => {


  const {state} = useLocation();

  const [positionmap, setPositionmap] 
  = useState('https://mapsite-30.web.app/#/Marone/map?latitude='+state.store.STORELATITUDE+'&longitude='+state.store.STORELONGITUDE+'&drag='+true);





  return (
    <Container style={containerStyle}>
   
         <iframe  
          id ="map"
          border="0"
          style={{borderStyle:"none", width:"100%", height:"700px"}}
          src={positionmap}/>

    </Container>
  );
}

export default StorepostionExcontainer;
