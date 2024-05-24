
import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import Text from '../common/Text';
import { theme } from '../theme/theme';
import { ReviewContent } from '../utility/reviewDefine';
import GuideLabel from '../components/GuildeLable';
import { MaroneContent } from '../utility/maroneDefine';
import Button from '../common/Button';
import { add_review } from '../service/ReviewService';
import { UserContext } from '../context/User';
import ReviewItem from '../components/ReviewItem';

const Container = styled.div`
  margin-top:30px;
  padding: 30px 25px;
`


const Col = styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
  width :90%;
  padding : 0px 5%;


`

const Row = styled.div`
  display : flex;
  flex-direction : row;
  justify-content: center;
  align-items: center;
  padding :0px 10px;

`



const ReviewAllcontainer = ({ containerStyle, REVIEWITEMS }) => {
  const { user, dispatch2 } = useContext(UserContext);

  console.log("REVIEWITEMS", REVIEWITEMS);
  const USER = user.uid;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container style={containerStyle}>
      {REVIEWITEMS.map((data, index) => (
        <ReviewItem
          data={data}
          myreview={true}
          index={index}
          storeinreview={true}
        />
      ))}
    </Container>
  );
};

export default ReviewAllcontainer;
