import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import CouponeItem from '../components/CouponeItem';
import { get_coupone, get_storecoupone } from '../service/CouponeService';
import Loading from '../common/Loading';
import Loginloadingcontainer from './Loginloadingcontainer';

const Container = styled.div`
  margin-top:60px;
`

const Storecouponcontainer = ({containerStyle, STORE_ID}) => {

  const [couponeitems, setCouponeitems] = useState([]);

  const {user, dispatch2} = useContext(UserContext);
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
      const USER_ID = user.uid;
      const couponeitems = await get_storecoupone({STORE_ID});
      setCouponeitems(couponeitems);
		}
		fetchData();
  }, [])

  const couponecallback = async() =>{

    setLoad(true);

    async function fetchData(){
      const USER_ID = user.uid;
      const couponeitems = await get_storecoupone({STORE_ID});
      setCouponeitems(couponeitems);

      setLoad(false);
		}
		fetchData();
  }



  return (
    <Container style={containerStyle}>

      {
        load == true ? (<Loginloadingcontainer />):(<>
        {
            couponeitems.map((data, index)=>(
              <CouponeItem store ={true} couponeitem={data} index={index} callback={couponecallback} />
            ))
        }
        </>)
      
      }
   
    </Container>
  );
}

export default Storecouponcontainer;
