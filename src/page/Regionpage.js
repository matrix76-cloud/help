import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import Layout from '../screen/Layout/HomeLayout';
import Regioncontainer from '../container/Region';
import DetailLayout from '../screen/Layout/DetailLayout';
import RegionLayout from '../screen/Layout/RegionLayout';

const Container = styled.div`

`

const Regionpage = ({containerStyle}) => {

  const {state} = useLocation();

  return (
    <RegionLayout menu ={true} bottom ={false} header={true} headerdetail={true} headername={'지역'}>
      {
        state == undefined  ?( <Regioncontainer type={0}/>):( <Regioncontainer type={state.type}/>)
      }
     
    </RegionLayout>
  );
}

export default Regionpage;
