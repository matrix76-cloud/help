
import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import Reviewcontainer from '../container/Reviewcontainer';
import DetailLayout from '../screen/Layout/DetailLayout';
import PrevLayout from '../screen/Layout/PrevLayout';
import ReviewAllcontainer from '../container/ReviewAllcontainer';

const Container = styled.div`

`

const ReviewAllpage = ({ containerStyle }) => {
  const { state } = useLocation();

  return (
    <PrevLayout
      menu={false}
      bottom={false}
      header={true}
      headername={"리뷰보기"}
    >
      <ReviewAllcontainer REVIEWITEMS={state.REVIEWITEMS} />
    </PrevLayout>
  );
};

export default ReviewAllpage;
