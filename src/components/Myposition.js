import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import Storemap from './Storemap';
import { theme } from '../theme/theme';
import { UserContext } from '../context/User';

const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: flex-start;
  padding:20px;

`


const Myposition = ({containerStyle, store, ref}) => {

  const navigate = useNavigate();

  const {user, dispatch2} = useContext(UserContext);

  const _handlemapview = () =>{
    navigate("/storepositionex", {state:{store:store}});
  }

  const [positionmap, setPositionmap] 
  = useState('https://mapsite-30.web.app/#/Marone/map?latitude='+user.latitude+'&longitude='+user.longitude+'&drag='+false);

  useEffect(()=>{
    async function fetchData(){
		}
		fetchData();

    console.log("position", positionmap);
  }, [])



  return (
    <Container style={containerStyle}>
         <iframe  
          id ="map"
          border="0"
          style={{borderStyle:"none", width:"100%", height:"250px", marginTop:20, zIndex:-1}}
          src={positionmap}/>

    </Container>
  );
}

export default Myposition;
