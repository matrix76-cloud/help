import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Receivecouponcontainer from '../container/Receivecouponcontainer';
import PrevLayout from '../screen/Layout/PrevLayout';
import MyReviewcontainer from '../container/Myreviewcontainer';

const Container = styled.div`

`

const Myreviewpage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
    <PrevLayout menu ={false} bottom ={false} header={true} headername={'내가쓴 댓글'}>
      <MyReviewcontainer/>
    </PrevLayout>
  );
}

export default Myreviewpage;
