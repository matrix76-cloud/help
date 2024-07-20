import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import CouponeItem from '../components/CouponeItem';
import { get_coupone } from '../service/CouponeService';
import { delete_review, get_reviewForUser, update_review } from '../service/ReviewService';
import ReviewItem from '../components/ReviewItem';
import { get_storeinfoForSTOREID } from '../service/StoreService';
import Loading from '../common/Loading';
import { useSleep } from '../utility/common';
import Loginloadingcontainer from './Loginloadingcontainer';

const Container = styled.div`
  margin-top:60px;
`

const MyReviewcontainer = ({containerStyle}) => {

  const [reviewitems, setReviewitems] = useState([]);

  const {user, dispatch2} = useContext(UserContext);
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const navigate = useNavigate();
   useEffect(()=>{
    async function FetchData(){
      const USER_ID = user.uid;
      const reviewitems = await get_reviewForUser({USER_ID});
      setReviewitems(reviewitems);

      await useSleep(300);
      setLoad(true);
		}
		FetchData();
  }, [])
  const deletecallback = async(REVIEW_ID) => {
 
    const deletereview = delete_review({ REVIEW_ID });
    
    async function FetchData() {
      const USER_ID = user.uid;
      const reviewitems = await get_reviewForUser({USER_ID});
      setReviewitems(reviewitems);

      await useSleep(300);
      setLoad(true);
		}
		FetchData();

  }


  const updatecallback = async(CONTENTS,REVIEW_ID) => {

    const updatereview = await update_review({CONTENTS, REVIEW_ID})

    async function FetchData() {
      const USER_ID = user.uid;
      const reviewitems = await get_reviewForUser({USER_ID});
      setReviewitems(reviewitems);
      await useSleep(300);
      setRefresh(refresh => refresh + 1);
		}
		FetchData();

  }

  useEffect(() => {
     setReviewitems(reviewitems);
  }, [refresh])


  return (
    <Container style={containerStyle}>
      {
        load == false ? <Loginloadingcontainer /> : <>
        {
          reviewitems.map((data, index)=>(
                    
            <ReviewItem data={data} myreview={true} index={index} deletecallback={deletecallback} 
              updatecallback= {updatecallback}  storeinreview={false}
            />
          ))
        }
        </>
      }
  
   
    </Container>
  );
}

export default MyReviewcontainer;
