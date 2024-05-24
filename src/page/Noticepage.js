
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import PrevLayout from '../screen/Layout/PrevLayout';
import Noticecontainer from '../container/Noticecontainer';
import Badusercontainer from '../container/Badusercontainer';

const Container = styled.div`

`

const Noticepage = ({containerStyle}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])



  return (
      <PrevLayout menu={false} bottom={false} header={true} headername={'공지사항'}>
        <Noticecontainer/>
      </PrevLayout>

  );
}

export default Noticepage;
