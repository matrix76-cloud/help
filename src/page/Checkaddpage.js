

import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import Checkadmincontainer from '../container/Checkadmincontainer';
import PrevLayout from '../screen/Layout/PrevLayout';
import Checkaddcontainer from '../container/Checkaddcontainer';

const Container = styled.div`

`

const Checkaddpage = ({containerStyle}) => {

  const navigate = useNavigate();

  const { state } = useLocation();

  console.log("state", state);

  const [header, setHeader] = useState('');

  useEffect(() => {
     
    if (state.TYPE == 'ADD') {
      setHeader("관리사 등록");
    } else {
      setHeader("관리사 수정");    
    }

    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu={false} bottom={false} header={true} headername={header}
    >
      <Checkaddcontainer type={state.TYPE} item={state.DATA} />
    </PrevLayout>
  );
}

export default Checkaddpage;
