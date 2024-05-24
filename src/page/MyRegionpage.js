import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import MyRegioncontainer from '../container/MyRegioncontainer';
import Layout from '../screen/Layout/HomeLayout';
import DetailLayout from '../screen/Layout/DetailLayout';
import MyRegionLayout from '../screen/Layout/MyRegionLayout';

const Container = styled.div`

`

const MyRegionpage = ({containerStyle}) => {

  const {state} = useLocation();



  const [headername, setHeaderName] = useState(state.region1 + " " + state.region2);

  const navigate = useNavigate();


  return (

    <>
    {state.region1 != ''  ? (
      <MyRegionLayout menu ={true} bottom ={false} header={true} headerdetail={true} headername={headername}>
        <MyRegioncontainer region0={state.region0} region1={state.region1} region2={state.region2}/>
      </MyRegionLayout>
    ) :(
      <MyRegionLayout menu ={true} bottom ={false} header={true} headerdetail={true} headername={'내주변'}>
        <MyRegioncontainer region0={state.region0}  region1={state.region1} region2={state.region2}/>
      </MyRegionLayout>
    )}
    
    </>

  );
}

export default MyRegionpage;
