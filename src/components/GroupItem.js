import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { TiGroup } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";

const Container = styled.div`
  min-width: 80px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  flex-direction:column;
`
const Groupname = styled.div`
  font-size:10px;
  margin-top:5px;
`
const GroupPlusIcon = styled.div`
  position: relative;

  border-radius: 30px;
`


const GroupItem = ({containerStyle, groupimgsrc, groupname}) => {
  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
    {
      groupimgsrc == 'primary' &&   <TiGroup size={35} color ={'#ff4e19'} />
    }

    {
      groupimgsrc != 'primary' &&   <img src={groupimgsrc} style={{width:70, height:70, borderRadius:15}} />
    }
 
    <Groupname>
      {groupname.slice(0, 10)}
      {groupname.length > 10 ? "..." : null}
    </Groupname>



    </Container>
  );
}

export default GroupItem;
