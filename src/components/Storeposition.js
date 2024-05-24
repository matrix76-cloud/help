import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import Storemap from './Storemap';
import { theme } from '../theme/theme';

const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: flex-start;
  padding:20px;

`


const Storeposition = ({containerStyle, store, ref}) => {

  const navigate = useNavigate();

  const _handlemapview = () =>{
    navigate("/storepositionex", {state:{store:store}});
  }

  const [positionmap, setPositionmap] 
  = useState('https://mapsite-30.web.app/#/Marone/map?latitude='+store.STORELATITUDE+'&longitude='+store.STORELONGITUDE+'&drag='+false);

  useEffect(()=>{
    async function fetchData(){
		}
		fetchData();

    console.log("position", positionmap);
  }, [])



  return (
    <Container style={containerStyle}>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
            <Text value={'매장위치'} containerStyle={{fontWeight:600}} size={14}  />

            <div onClick={_handlemapview}>
              <Text value={'자세히보기'} color ={theme.grey} containerStyle={{fontWeight:400, textDecoration: "underline"}} size={14} />
            </div>
          </div>

         <iframe  
          id ="map"
          border="0"
          style={{borderStyle:"none", width:"100%", height:"250px", marginTop:20, zIndex:-1}}
          src={positionmap}/>

    </Container>
  );
}

export default Storeposition;
