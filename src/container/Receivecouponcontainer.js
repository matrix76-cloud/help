import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import CouponeItem from '../components/CouponeItem';
import { get_coupone } from '../service/CouponeService';
import Loading from '../common/Loading';
import { useSleep } from '../utility/common';

const Container = styled.div`
  margin-top:60px;
`

const Receivecouponcontainer = ({containerStyle}) => {

  const [couponeitems, setCouponeitems] = useState([]);

  const {user, dispatch2} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
   useEffect(()=>{
     async function FetchData() {
       setLoading(true);
       const USER_ID = user.uid;
       const couponeitems = await get_coupone({ USER_ID });
       setCouponeitems(couponeitems);
       await useSleep(300);
       setLoading(false);
		}
		FetchData();
  }, [])



  return (
    <Container style={containerStyle}>
      {
        loading == true ? (<Loading containerStyle={{ marginTop: 300 }} />) : (<>
          {
          couponeitems.map((data, index)=>(
            <CouponeItem store ={false} couponeitem={data} index={index} />
          ))
        }
      </>)

      }
  
    </Container>
  );
}

export default Receivecouponcontainer;
